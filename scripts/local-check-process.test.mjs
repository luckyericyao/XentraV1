import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";
import { localCheckEnvironment, runNode, withLocalServer } from "./local-check-process.mjs";

const quiet = { quiet: true };
const serverArguments = (port) => ["--input-type=module", "-e", `
  import { createServer } from 'node:http';
  createServer((request, response) => response.end('synthetic-local-check'))
    .listen(${port}, '127.0.0.1');
`];

function processExists(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if (error.code !== "ESRCH") throw error;
    return false;
  }
}

async function descendantFixture(t, exitCode, { inheritOutput = false, gracefulExitMs = null } = {}) {
  const root = new URL("../artifacts/local-process-tests/", import.meta.url);
  await mkdir(root, { recursive: true });
  const directory = await mkdtemp(new URL("child-", root));
  const marker = join(directory, "descendant.pid");
  t.after(async () => {
    const pid = Number(await readFile(marker, "utf8").catch(() => ""));
    if (pid && processExists(pid)) process.kill(pid, "SIGKILL");
    await rm(directory, { recursive: true, force: true });
  });
  const descendant = `
    const fs = require('node:fs');
    process.on('SIGTERM', () => {
      if (${JSON.stringify(gracefulExitMs)} !== null) setTimeout(() => process.exit(0), ${JSON.stringify(gracefulExitMs)});
    });
    fs.writeFileSync(process.argv[1], String(process.pid));
    setInterval(() => {}, 1000);
  `;
  const stdio = inheritOutput ? ["ignore", "inherit", "inherit"] : "ignore";
  const argumentsForParent = ["--input-type=module", "-e", `
    import { spawn } from 'node:child_process';
    import { existsSync } from 'node:fs';
    import { setTimeout as delay } from 'node:timers/promises';
    const descendant = spawn(process.execPath, ['-e', ${JSON.stringify(descendant)}, ${JSON.stringify(marker)}], { stdio: ${JSON.stringify(stdio)} });
    descendant.unref();
    while (!existsSync(${JSON.stringify(marker)})) await delay(10);
    console.log('synthetic-parent-finished');
    ${exitCode === null ? "setInterval(() => {}, 1000);" : `process.exitCode = ${exitCode};`}
  `];
  return {
    argumentsForParent,
    async pid() {
      const deadline = performance.now() + 5_000;
      while (performance.now() < deadline) {
        const pid = Number(await readFile(marker, "utf8").catch(() => ""));
        if (pid) return pid;
        await delay(10);
      }
      throw new Error("Synthetic descendant did not start.");
    },
  };
}

test("local check environment is isolated without mutating its source", () => {
  const source = {
    PATH: "/synthetic/bin", SMOKE_EXTERNAL: "1",
    NEXT_PUBLIC_SITE_URL: "https://example.test",
    XENTRA_CONTACT_EMAIL: "synthetic@example.test", XENTRA_PRIVATE: "synthetic-private",
    KEEP_SETTING: "keep",
  };
  const snapshot = { ...source };
  const environment = localCheckEnvironment(source);
  assert.deepEqual(source, snapshot);
  assert.equal(environment.SMOKE_EXTERNAL, "0");
  assert.equal(environment.NEXT_PUBLIC_SITE_URL, "");
  assert.equal(environment.XENTRA_CONTACT_EMAIL, "");
  assert.equal(environment.XENTRA_PRIVATE, undefined);
  assert.equal(environment.KEEP_SETTING, "keep");
  assert.equal(environment.NEXT_TELEMETRY_DISABLED, "1");
});

test("successful local commands report their own output", async () => {
  const result = await runNode(["-e", "console.log('synthetic-ready')"], quiet);
  assert.match(result.stdout, /synthetic-ready/);
});

test("a failed command cannot be reported as passed", async () => {
  await assert.rejects(runNode(["-e", "process.exit(7)"], quiet), /exit 7/);
});

test("Darwin EPERM during an empty owned group's teardown is not a build failure", {
  skip: process.platform !== "darwin",
}, async (t) => {
  const kill = process.kill.bind(process);
  let simulated = false;
  t.mock.method(process, "kill", (pid, signal) => {
    try {
      return kill(pid, signal);
    } catch (error) {
      if (pid < 0 && signal === 0 && error.code === "ESRCH") {
        simulated = true;
        throw Object.assign(new Error("synthetic group teardown"), { code: "EPERM" });
      }
      throw error;
    }
  });

  const result = await runNode(["-e", "console.log('synthetic-success')"], quiet);
  assert(simulated);
  assert.match(result.stdout, /synthetic-success/);
});

test("Darwin EPERM is not ignored while an owned group still has members", {
  skip: process.platform !== "darwin",
}, async (t) => {
  const fixture = await descendantFixture(t, 0);
  const kill = process.kill.bind(process);
  t.mock.method(process, "kill", (pid, signal) => {
    if (pid < 0 && signal === 0) {
      throw Object.assign(new Error("synthetic permission denial"), { code: "EPERM" });
    }
    return kill(pid, signal);
  });

  await assert.rejects(runNode(fixture.argumentsForParent, quiet), { code: "EPERM" });
  assert(processExists(await fixture.pid()));
});

test("Darwin retries an EPERM probe while a terminated worker finishes exiting", {
  skip: process.platform !== "darwin",
}, async (t) => {
  const fixture = await descendantFixture(t, 0, { gracefulExitMs: 100 });
  const kill = process.kill.bind(process);
  let signalled = false;
  let denied = false;
  t.mock.method(process, "kill", (pid, signal) => {
    if (pid < 0 && signal === "SIGTERM") signalled = true;
    const result = kill(pid, signal);
    if (pid < 0 && signal === 0 && signalled) {
      denied = true;
      throw Object.assign(new Error("synthetic worker teardown"), { code: "EPERM" });
    }
    return result;
  });

  await runNode(fixture.argumentsForParent, quiet);
  assert(denied);
  assert.equal(processExists(await fixture.pid()), false);
});

test("a hanging command has a bounded lifetime", async () => {
  await assert.rejects(runNode(["-e", "setInterval(() => {}, 1000)"], {
    ...quiet, timeoutMs: 50,
  }), /timed out/);
});

test("cancellation terminates the owned command", async () => {
  const controller = new AbortController();
  const pending = runNode(["-e", "setInterval(() => {}, 1000)"], {
    ...quiet, signal: controller.signal,
  });
  controller.abort();
  await assert.rejects(pending, /cancelled/);
});

for (const code of [0, 7]) {
  test(`an exited command (exit ${code}) cannot leave its descendant running`, {
    skip: process.platform === "win32",
  }, async (t) => {
    const fixture = await descendantFixture(t, code);
    const pending = runNode(fixture.argumentsForParent, quiet);
    if (code) await assert.rejects(pending, /exit 7/);
    else await pending;
    assert.equal(processExists(await fixture.pid()), false);
  });
}

test("inherited output pipes do not turn a successful command into a timeout", {
  skip: process.platform === "win32",
}, async (t) => {
  const fixture = await descendantFixture(t, 0, { inheritOutput: true });
  const result = await runNode(fixture.argumentsForParent, { ...quiet, timeoutMs: 1_000 });
  assert.match(result.stdout, /synthetic-parent-finished/);
  assert.equal(processExists(await fixture.pid()), false);
});

test("cancellation also stops an owned descendant that ignores graceful shutdown", {
  skip: process.platform === "win32",
}, async (t) => {
  const fixture = await descendantFixture(t, null);
  const controller = new AbortController();
  const pending = assert.rejects(runNode(fixture.argumentsForParent, {
    ...quiet, signal: controller.signal,
  }), /cancelled/);
  const pid = await fixture.pid();
  controller.abort();
  await pending;
  assert.equal(processExists(pid), false);
});

test("the local server is stopped after successful inspection", async () => {
  let serverProcess;
  const result = await withLocalServer(serverArguments, async ({ baseUrl, child }) => {
    serverProcess = child;
    assert.equal(new URL(baseUrl).hostname, "127.0.0.1");
    return (await fetch(baseUrl)).text();
  });
  assert.equal(result, "synthetic-local-check");
  assert(serverProcess.exitCode !== null || serverProcess.signalCode !== null);
});

test("the local server is stopped when inspection fails", async () => {
  let serverProcess;
  await assert.rejects(withLocalServer(serverArguments, async ({ child }) => {
    serverProcess = child;
    throw new Error("synthetic-inspection-failure");
  }), /synthetic-inspection-failure/);
  assert(serverProcess.exitCode !== null || serverProcess.signalCode !== null);
});

test("an existing local listener is not reused or stopped", async () => {
  const existing = createServer((request, response) => response.end("existing-local-service"));
  await new Promise((resolve) => existing.listen(0, "127.0.0.1", resolve));
  const address = existing.address();
  try {
    await withLocalServer(serverArguments, async ({ baseUrl }) => {
      assert.notEqual(Number(new URL(baseUrl).port), address.port);
    });
    assert.equal(await (await fetch(`http://127.0.0.1:${address.port}`)).text(), "existing-local-service");
  } finally {
    await new Promise((resolve) => existing.close(resolve));
  }
});

test("server startup failures fail promptly rather than waiting for a healthy unrelated page", async () => {
  await assert.rejects(withLocalServer(() => ["-e", "process.exit(3)"], async () => {
    assert.fail("Inspection must not start");
  }), /exited before readiness/);
});

test("a server that ignores graceful shutdown is still cleaned up", async () => {
  let serverProcess;
  await withLocalServer((port) => ["--input-type=module", "-e", `
    import { createServer } from 'node:http';
    process.on('SIGTERM', () => {});
    createServer((request, response) => response.end('synthetic-ready'))
      .listen(${port}, '127.0.0.1');
  `], async ({ child }) => { serverProcess = child; });
  assert.equal(serverProcess.signalCode, "SIGKILL");
});
