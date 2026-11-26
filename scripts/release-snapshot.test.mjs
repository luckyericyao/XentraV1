import assert from "node:assert/strict";
import test from "node:test";
import { readReleaseSnapshot } from "./release-snapshot.mjs";

const current = "1".repeat(40);
const older = "2".repeat(40);
const page = (revision, status = 200) => ({
  headers: new Headers(revision ? { "x-xentra-revision": revision } : {}),
  response: { status },
});

test("every document must match in the same attempt, including 404 routes", async () => {
  const calls = [];
  const waits = [];
  const paths = ["/", "/zh/privacy", "/zh/missing"];
  const first = [page(current), page(older), page(current, 404)];
  const second = [page(older), page(current), page(current, 404)];
  const third = [page(current), page(current), page(current, 404)];
  const snapshots = [first, second, third];
  const result = await readReleaseSnapshot(paths, current, async (path, attempt) => {
    calls.push([path, attempt]);
    return snapshots[attempt - 1][paths.indexOf(path)];
  }, {
    attempts: 3,
    wait: async (milliseconds) => { waits.push(milliseconds); },
  });

  assert.deepEqual(calls, [1, 2, 3].flatMap((attempt) => paths.map((path) => [path, attempt])));
  assert.deepEqual(waits, [4000, 4000]);
  assert.deepEqual(result, third);
  assert.equal(result[2], third[2]);
});

test("a bounded wait names every remaining old, missing, or invalid revision", async () => {
  const paths = ["/", "/old", "/missing", "/invalid"];
  const pages = [page(current), page(older), page(null), page("not-a-sha")];
  const waits = [];
  await assert.rejects(readReleaseSnapshot(paths, current, async (path) => pages[paths.indexOf(path)], {
    attempts: 2,
    wait: async (milliseconds) => { waits.push(milliseconds); },
  }), {
    message: `Release ${current} not ready after 2 snapshot(s): /old: ${older}; /missing: missing; /invalid: invalid`,
  });
  assert.deepEqual(waits, [4000]);
});

test("a temporary route failure retries the whole release snapshot", async () => {
  const paths = ["/", "/zh"];
  const calls = [];
  const waits = [];
  const ready = [page(current), page(current)];
  const result = await readReleaseSnapshot(paths, current, (path, attempt) => {
    calls.push([path, attempt]);
    if (path === "/zh" && attempt === 1) throw new Error("temporary request failure");
    return attempt === 1 ? page(current) : ready[paths.indexOf(path)];
  }, {
    attempts: 2,
    wait: async (milliseconds) => { waits.push(milliseconds); },
  });

  assert.deepEqual(calls, [1, 2].flatMap((attempt) => paths.map((path) => [path, attempt])));
  assert.deepEqual(waits, [4000]);
  assert.deepEqual(result, ready);
  assert.equal(result[0], ready[0]);
});

test("an exhausted snapshot reports unavailable and stale routes together", async () => {
  const failure = new Error("transport diagnostics");
  const paths = ["/", "/zh", "/letter", "/zh/letter"];
  const waits = [];
  await assert.rejects(readReleaseSnapshot(paths, current, async (path) => {
    if (path === "/zh" || path === "/zh/letter") throw failure;
    return page(path === "/letter" ? older : current);
  }, {
    attempts: 2,
    wait: async (milliseconds) => { waits.push(milliseconds); },
  }), {
    message: `Release ${current} not ready after 2 snapshot(s): /zh: unavailable; /letter: ${older}; /zh/letter: unavailable`,
    cause: failure,
  });
  assert.deepEqual(waits, [4000]);
});
