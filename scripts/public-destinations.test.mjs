import assert from "node:assert/strict";
import test from "node:test";
import { inspectPublicDestinations } from "./public-destinations.mjs";

const url = (path) => `https://portfolio.example.test/${path}`;
const page = (body, { status = 200, type = "text/html; charset=utf-8" } = {}) => ({
  response: new Response(body, { status, headers: { "content-type": type } }),
  body,
});

test("an early failure does not hide later HTTP, media type, or marker failures", async () => {
  const destinations = [
    { url: url("network-error") },
    { url: url("missing") },
    { url: url("wrong-type") },
    { url: url("changed"), markers: ["heading", "required link", "status note"] },
    { url: url("available"), markers: ["expected content"] },
  ];
  const visited = [];
  const report = await inspectPublicDestinations(destinations, async ({ url }) => {
    visited.push(url);
    switch (new URL(url).pathname) {
      case "/network-error": throw new Error("network unavailable");
      case "/missing": return page("not found", { status: 404 });
      case "/wrong-type": return page("{}", { type: "application/json" });
      case "/changed": return page("heading");
      default: return page("expected content");
    }
  });

  assert.deepEqual(visited, destinations.map(({ url }) => url));
  assert.equal(report.checked, destinations.length);
  assert.deepEqual(report.failures, [
    { url: url("network-error"), problems: ["network unavailable"] },
    { url: url("missing"), problems: ["HTTP 404"] },
    { url: url("wrong-type"), problems: ["expected an HTML response"] },
    { url: url("changed"), problems: ['missing "required link"', 'missing "status note"'] },
  ]);
});

test("available destinations retain status, content type, and marker assertions", async () => {
  const report = await inspectPublicDestinations([
    { url: url("workflow"), markers: ["expected content"] },
    { url: url("home") },
  ], async () => page("expected content", { type: "Text/HTML" }));

  assert.deepEqual(report, { checked: 2, assertions: 5, failures: [], revisionObservations: [] });
});

test("public revision observations separate mixed, missing, and invalid metadata without hiding failures", async () => {
  const known = "https://product.example.test";
  const header = "x-product-revision";
  const revisions = ["b".repeat(40), "a".repeat(40), null, "not printable as release evidence", "a".repeat(40)];
  const destinations = revisions.map((_, index) => ({
    url: `${index === 0 ? url(String(index)) : `${known}/${index}`}?probe=discard#ignore`,
    markers: ["required"],
  }));
  const report = await inspectPublicDestinations(destinations, async ({ url }) => {
    const index = Number(new URL(url).pathname.slice(1));
    const result = page(index === 0 ? "changed" : "required");
    Object.defineProperty(result.response, "url", { value: `${known}/${index}` });
    if (revisions[index] !== null) result.response.headers.set(header, revisions[index]);
    return result;
  }, { revisionHeaders: new Map([[known, header]]) });

  assert.deepEqual(report.revisionObservations, [{
    origin: known,
    revisions: [["a".repeat(40), ["/1", "/4"]], ["b".repeat(40), [url("0")]]],
    missing: ["/2"],
    invalid: ["/3"],
  }]);
  assert.deepEqual(report.failures, [{ url: destinations[0].url, problems: ['missing "required"'] }]);
});

test("a redirect away from a known origin cannot supply that site's revision", async () => {
  const known = "https://product.example.test";
  const result = page("available");
  Object.defineProperty(result.response, "url", { value: url("offsite") });
  result.response.headers.set("x-product-revision", "a".repeat(40));

  const report = await inspectPublicDestinations([{ url: `${known}/home` }], async () => result, {
    revisionHeaders: new Map([[known, "x-product-revision"]]),
  });
  assert.deepEqual(report.revisionObservations, []);
});
