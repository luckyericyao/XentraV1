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
