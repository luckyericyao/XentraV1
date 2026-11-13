import { execFileSync, spawn } from "node:child_process";
import { createServer } from "node:net";
import { delimiter, dirname } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

export function localCheckEnvironment(source = process.env) {
  const environment = { ...source };
  for (const key of Object.keys(environment)) {
    if (key.startsWith("XENTRA_") || key.startsWith("SMOKE_")) {
      delete environment[key];
    }
  }
  // Explicit empty values also prevent dotenv from importing deployment settings.
  for (const key of [
    "NEXT_PUBLIC_SITE_URL", "VERCEL_PROJECT_PRODUCTION_URL", "VERCEL_URL",
    "XENTRA_AGENT_COACH_URL", "XENTRA_LOCALHOST_URL", "XENTRA_BIOAXIS_URL",
    "XENTRA_CONTACT_URL", "XENTRA_CONTACT_EMAIL", "XENTRA_CONTACT_EMAIL_VERIFIED",
  ]) {
    environment[key] = "";
  }
  return {
    ...environment,
    PATH: `${dirname(process.execPath)}${delimiter}${source.PATH || ""}`,
    NODE_ENV: "production",
    NEXT_TELEMETRY_DISABLED: "1",
    SMOKE_EXTERNAL: "0",
  };
}

function isDarwinTeardown(child, error) {
  return error.code === "EPERM" && process.platform === "darwin" &&
    (child.exitCode !== null || child.signalCode !== null);
}

function groupIsGone(child, error) {
  if (error.code === "ESRCH") return true;
  if (!isDarwinTeardown(child, error)) return false;

  // Darwin can deny a group probe while its last member is disappearing.
  // A denial alone does not prove that any still-running process was stopped.
  try {
    const groups = execFileSync("/bin/ps", ["-ax", "-o", "pgid="], {
      encoding: "utf8", timeout: 1_000,
    });
    return !groups.trim().split(/\s+/).includes(String(child.pid));
  } catch {
    return false;
  }
}

function signalOwned(child, signal = "SIGTERM") {
  if (!child.pid) return;
  try {
    if (process.platform === "win32") child.kill(signal);
    else process.kill(-child.pid, signal);
  } catch (error) {
    if (!groupIsGone(child, error)) throw error;
  }
}

async function ownedIsRunning(child) {
  if (!child.pid) return false;
  if (process.platform === "win32") {
    return child.exitCode === null && child.signalCode === null;
  }
  const deadline = performance.now() + 500;
  for (;;) {
    try {
      process.kill(-child.pid, 0);
      return true;
    } catch (error) {
      if (groupIsGone(child, error)) return false;
      if (!isDarwinTeardown(child, error) || performance.now() >= deadline) throw error;
      await delay(25);
    }
  }
}

async function waitForOwnedExit(child, timeoutMs) {
  const deadline = performance.now() + timeoutMs;
  while (await ownedIsRunning(child)) {
    if (performance.now() >= deadline) return false;
    await delay(25);
  }
  return true;
}

function ownedNode(args, { cwd, env, quiet = false }) {
  const child = spawn(process.execPath, args, {
    cwd, env, detached: process.platform !== "win32", stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  child.stdout.on("data", (chunk) => {
    stdout = (stdout + chunk).slice(-64_000);
    if (!quiet) process.stdout.write(chunk);
  });
  child.stderr.on("data", (chunk) => {
    if (!quiet) process.stderr.write(chunk);
  });
  const exited = new Promise((resolve) => {
    child.once("error", (error) => resolve({ error }));
    child.once("exit", (code, signal) => resolve({ code, signal }));
  });
  const closed = new Promise((resolve) => child.once("close", resolve));
  const stop = async () => {
    if (await ownedIsRunning(child)) {
      // The group can outlive its leader when a command starts background workers.
      signalOwned(child);
      if (!await waitForOwnedExit(child, 2_000)) {
        signalOwned(child, "SIGKILL");
        if (!await waitForOwnedExit(child, 2_000)) {
          throw new Error("Owned local process group did not stop.");
        }
      }
    }
    await closed;
  };
  return { child, exited, stop, output: () => stdout };
}

export async function runNode(args, {
  label = "Local command", cwd, env, quiet = false, timeoutMs = 120_000, signal,
} = {}) {
  signal?.throwIfAborted();
  const owned = ownedNode(args, { cwd, env, quiet });
  let timedOut = false;
  let abortTimeout;
  const abort = () => {
    signalOwned(owned.child);
    abortTimeout = setTimeout(() => signalOwned(owned.child, "SIGKILL"), 2_000);
  };
  signal?.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(() => {
    timedOut = true;
    signalOwned(owned.child, "SIGKILL");
  }, timeoutMs);
  let result;
  try {
    // An inherited pipe can stay open after the leader exits; drain it after cleanup.
    result = await owned.exited;
  } finally {
    clearTimeout(timeout);
    clearTimeout(abortTimeout);
    signal?.removeEventListener("abort", abort);
    await owned.stop();
  }
  if (timedOut) throw new Error(`${label} timed out.`);
  if (signal?.aborted) throw new Error(`${label} cancelled.`);
  if (result.error) throw new Error(`${label} could not start.`);
  if (result.code !== 0) throw new Error(`${label} failed (exit ${result.code ?? result.signal}).`);
  return { stdout: owned.output() };
}

async function availablePort() {
  const server = createServer();
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

export async function withLocalServer(argumentsForPort, inspect, {
  cwd, env, signal, startupTimeoutMs = 30_000,
} = {}) {
  signal?.throwIfAborted();
  const port = await availablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const owned = ownedNode(argumentsForPort(port), { cwd, env, quiet: true });
  const abort = () => signalOwned(owned.child);
  signal?.addEventListener("abort", abort, { once: true });
  try {
    const deadline = performance.now() + startupTimeoutMs;
    let ready = false;
    while (performance.now() < deadline) {
      signal?.throwIfAborted();
      if (owned.child.exitCode !== null || owned.child.signalCode !== null) {
        throw new Error("Local server exited before readiness.");
      }
      try {
        const response = await fetch(baseUrl, { signal: AbortSignal.timeout(1_000) });
        await response.body?.cancel();
        ready = response.ok;
      } catch {
        // A listener may not be ready on the first request.
      }
      if (ready) break;
      await delay(100, undefined, { signal });
    }
    if (!ready) throw new Error("Local server readiness timed out.");
    return await inspect({ baseUrl, child: owned.child });
  } finally {
    signal?.removeEventListener("abort", abort);
    await owned.stop();
  }
}
