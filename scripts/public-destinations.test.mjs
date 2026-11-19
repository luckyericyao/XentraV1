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

  assert.deepEqual(report, { checked: 2, assertions: 5, failures: [] });
});
