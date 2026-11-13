import { randomUUID } from "node:crypto";
import { mkdir, readdir, rename, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { localCheckEnvironment, runNode, withLocalServer } from "./local-check-process.mjs";
import { withCheckWorkspace } from "./local-check-workspace.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const reportDirectory = new URL("../artifacts/local-checks/", import.meta.url);
const environment = localCheckEnvironment();
const args = process.argv.slice(2);
if (args.some((arg) => arg !== "--fixtures")) {
  throw new Error("Usage: node scripts/check-local.mjs [--fixtures]");
}
const includeFixtures = args.includes("--fixtures");
const controller = new AbortController();
const abort = () => controller.abort();
process.once("SIGINT", abort);
process.once("SIGTERM", abort);
const report = {
  startedAt: new Date().toISOString(),
  configuration: "repository-defaults",
  buildLocation: "isolated-workspace",
  externalChecks: false,
  browserChecks: "not-run",
  fixtures: includeFixtures ? {} : "not-run",
  stages: [],
  passed: false,
};

async function stage(name, action) {
  console.log(`\n[local-check] ${name}`);
  const started = performance.now();
  try {
    const result = await action();
    report.stages.push({ name, passed: true, durationMs: Math.round(performance.now() - started) });
    return result;
  } catch (error) {
    report.stages.push({ name, passed: false, durationMs: Math.round(performance.now() - started) });
    throw error;
  }
}

const command = (cwd, args, label, env = environment) => runNode(args, {
  label, cwd, env, signal: controller.signal,
});

async function buildAndSmoke(cwd, env, { prefix = "", expected = {} } = {}) {
  await stage(`${prefix}build-and-types`, () => command(
    cwd, ["node_modules/next/dist/bin/next", "build"], "Build", env,
  ));
  return stage(`${prefix}production-smoke`, () => withLocalServer(
    (port) => ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "-p", String(port)],
    async ({ baseUrl }) => {
      const { stdout } = await command(cwd, ["scripts/site-smoke.mjs"], "Smoke", {
        ...env, ...expected, SMOKE_BASE_URL: baseUrl,
      });
      const count = Number(stdout.match(/^PASS (\d+) assertions/m)?.[1] || 0);
      if (!count) throw new Error("Smoke did not report completed assertions.");
      return count;
    },
    { cwd, env, signal: controller.signal },
  ));
}

async function checkFixtures(cwd) {
  const fixture = {
    NEXT_PUBLIC_SITE_URL: "https://group.release-fixture.test",
    VERCEL_URL: "temporary.release-fixture.test",
    XENTRA_AGENT_COACH_URL: "https://coach.release-fixture.test/product",
    XENTRA_LOCALHOST_URL: "https://travel.release-fixture.test/private",
    XENTRA_BIOAXIS_URL: "https://lab.release-fixture.test/sourcing",
    XENTRA_CONTACT_URL: "https://www.build-record.release-fixture.test:8443/portfolio/a&b",
    XENTRA_CONTACT_EMAIL: "partnerships+xentra@release-fixture.test",
  };
  const expected = {
    SMOKE_CANONICAL_URL: fixture.NEXT_PUBLIC_SITE_URL,
    SMOKE_AGENT_COACH_URL: fixture.XENTRA_AGENT_COACH_URL,
    SMOKE_LOCALHOST_URL: fixture.XENTRA_LOCALHOST_URL,
    SMOKE_BIOAXIS_URL: fixture.XENTRA_BIOAXIS_URL,
    SMOKE_CONTACT_URL: fixture.XENTRA_CONTACT_URL,
    SMOKE_CONTACT_EMAIL: fixture.XENTRA_CONTACT_EMAIL,
  };
  for (const [name, verified] of [["build-record", "0"], ["email-mode", "1"]]) {
    report.fixtures[name] = await buildAndSmoke(
      cwd,
      { ...environment, ...fixture, XENTRA_CONTACT_EMAIL_VERIFIED: verified },
      {
        prefix: `fixture-${name}-`,
        expected: { ...expected, SMOKE_CONTACT_EMAIL_VERIFIED: verified },
      },
    );
  }
}

try {
  await withCheckWorkspace(root, async (cwd) => {
    const tests = (await readdir(join(cwd, "scripts")))
      .filter((name) => name.endsWith(".test.mjs"))
      .sort()
      .map((name) => `scripts/${name}`);
    await stage("unit-tests", () => command(cwd, ["--test", ...tests], "Unit tests"));
    await stage("lint", () => command(cwd, ["node_modules/eslint/bin/eslint.js", "."], "Lint"));
    report.smokeAssertions = await buildAndSmoke(cwd, environment);
    if (includeFixtures) await checkFixtures(cwd);
  }, { signal: controller.signal });
  controller.signal.throwIfAborted();
  report.passed = true;
} catch (error) {
  console.error(`[local-check] ${controller.signal.aborted ? "Cancelled." : error.message}`);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  report.cancelled = controller.signal.aborted;
  await mkdir(reportDirectory, { recursive: true });
  const temporaryReport = new URL(`.report-${randomUUID()}.json`, reportDirectory);
  try {
    await writeFile(temporaryReport, `${JSON.stringify(report, null, 2)}\n`, { flag: "wx" });
    await rename(temporaryReport, new URL("latest.json", reportDirectory));
  } finally {
    await rm(temporaryReport, { force: true });
  }
  process.removeListener("SIGINT", abort);
  process.removeListener("SIGTERM", abort);
  console.log(`[local-check] ${report.passed ? "PASS" : "FAIL"}; report: artifacts/local-checks/latest.json`);
}
