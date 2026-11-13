import assert from "node:assert/strict";
import test from "node:test";
import { inspectLocalNavigation } from "./local-navigation.mjs";

const origin = "http://127.0.0.1:3131";

test("checks same-page and cross-locale targets, not external business sites", () => {
  const checks = inspectLocalNavigation([
    { path: "/", html: '<main id="top"><a href="#top">Top</a><a href="/zh#companies">中文</a><a href="https://company.example/unknown">Company</a></main>' },
    { path: "/zh", html: '<section id="companies"></section>' },
  ], origin);
  assert.equal(checks.length, 2);
  assert(checks.every((check) => check.error === null));
});

test("a broken local anchor is a regression, even when its link text is present", () => {
  const checks = inspectLocalNavigation([
    { path: "/", html: '<a href="#company-removed">View company</a>' },
  ], origin);
  assert.equal(checks[0].error, "missing anchor target");
});

test("a missing route is distinguished from a missing section", () => {
  const checks = inspectLocalNavigation([
    { path: "/", html: '<a href="/missing#top">Missing</a>' },
  ], origin);
  assert.equal(checks[0].error, "missing local page");
});

test("fragments are decoded and malformed encodings fail without throwing", () => {
  const checks = inspectLocalNavigation([
    { path: "/", html: '<section id="业务"></section><a href="#%E4%B8%9A%E5%8A%A1">Business</a><a href="#%E0%A4%A">Invalid</a>' },
  ], origin);
  assert.equal(checks[0].error, null);
  assert.equal(checks[1].error, "invalid anchor encoding");
});

test("unsafe protocols cannot masquerade as external links", () => {
  const checks = inspectLocalNavigation([
    { path: "/", html: '<a href="javascript:alert(1)">Unsafe</a><a href="mailto:hello@example.test">Email</a>' },
  ], origin);
  assert.equal(checks.length, 1);
  assert.equal(checks[0].error, "unsupported link protocol");
});

test("data attributes do not masquerade as real anchors or destinations", () => {
  const checks = inspectLocalNavigation([
    { path: "/", html: '<section id="top" data-id="missing"></section><a href="#top" data-href="#missing">Top</a><a href="#missing">Broken</a>' },
  ], origin);
  assert.equal(checks[0].href, "#top");
  assert.equal(checks[0].error, null);
  assert.equal(checks[1].error, "missing anchor target");
});
