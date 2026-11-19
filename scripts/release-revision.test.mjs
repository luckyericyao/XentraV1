import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

const gitRevision = "0123456789abcdef0123456789abcdef01234567";
const cwd = new URL("../", import.meta.url);

function responseHeaders(env) {
  return JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", `
    import config from "./next.config.ts";
    const routes = await config.headers();
    process.stdout.write(JSON.stringify(routes.find((route) => route.source === "/(.*)").headers));
  `], { cwd, env, encoding: "utf8" }));
}

function releaseHeader(env) {
  return responseHeaders(env).find(({ key }) => key === "X-Xentra-Revision");
}

test("a production Git build exposes its precise revision without replacing security headers", () => {
  const headers = responseHeaders({
    VERCEL_ENV: "production",
    VERCEL_GIT_COMMIT_SHA: gitRevision,
  });
  assert.deepEqual(headers.find(({ key }) => key === "X-Xentra-Revision"), {
    key: "X-Xentra-Revision",
    value: gitRevision,
  });
  assert.ok(headers.some(({ key }) => key === "Content-Security-Policy"));
});

test("local, preview, absent, and malformed revisions are not published", () => {
  for (const env of [
    {},
    { VERCEL_GIT_COMMIT_SHA: gitRevision },
    { VERCEL_ENV: "preview", VERCEL_GIT_COMMIT_SHA: gitRevision },
    { VERCEL_ENV: "production" },
    { VERCEL_ENV: "production", VERCEL_GIT_COMMIT_SHA: "short-revision" },
    { VERCEL_ENV: "production", VERCEL_GIT_COMMIT_SHA: `${gitRevision}\n` },
  ]) {
    assert.equal(releaseHeader(env), undefined);
  }
});
