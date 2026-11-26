import assert from "node:assert/strict";
import test from "node:test";
import { inspectPublicDestinations, observePublicApiRevision } from "./public-destinations.mjs";

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

const rfqUrl = url("api/rfq");
const rfqPage = (body, options = {}, finalUrl = rfqUrl) => {
  const result = page(body, { type: "Application/JSON; charset=utf-8", ...options });
  Object.defineProperty(result.response, "url", { value: finalUrl });
  return result;
};

test("the API revision observation contains only the validated release field", async () => {
  const revision = "a".repeat(40);
  const report = await observePublicApiRevision(rfqUrl, async (requestedUrl) => {
    assert.equal(requestedUrl, rfqUrl);
    return rfqPage(JSON.stringify({ release: revision, internalDetails: "do not report" }));
  });
  assert.deepEqual(report, { status: "observed", revision });
});

test("missing API metadata is distinct from malformed or wrongly typed responses", async () => {
  for (const [result, status] of [
    [rfqPage("{}"), "missing"],
    [rfqPage("not JSON"), "invalid"],
    [rfqPage("null"), "invalid"],
    [rfqPage("[]"), "invalid"],
    [rfqPage('{"release":null}'), "invalid"],
    [rfqPage('{"release":"unverified"}'), "invalid"],
    [rfqPage(JSON.stringify({ release: ["a".repeat(40)] })), "invalid"],
    [rfqPage("{}", { type: "text/html" }), "invalid"],
  ]) {
    assert.deepEqual(await observePublicApiRevision(rfqUrl, async () => result), { status });
  }
});

test("network failures, HTTP errors and redirects cannot be reported as revisions", async () => {
  const body = JSON.stringify({ release: "a".repeat(40) });
  for (const read of [
    async () => { throw new Error("upstream diagnostics"); },
    async () => rfqPage(body, { status: 503 }),
    async () => rfqPage(body, { status: 302 }),
    async () => rfqPage(body, {}, url("somewhere-else")),
    async () => {
      const result = rfqPage(body);
      Object.defineProperty(result.response, "redirected", { value: true });
      return result;
    },
  ]) {
    assert.deepEqual(await observePublicApiRevision(rfqUrl, read), { status: "unavailable" });
  }
});
