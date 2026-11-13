import assert from "node:assert/strict";
import test from "node:test";
import { getSiteUrl } from "../src/lib/site-url.ts";

test("default identity does not follow a temporary deployment URL", () => {
  assert.equal(getSiteUrl({}), "https://xentra-v1.vercel.app");
  assert.equal(getSiteUrl({ VERCEL_URL: "temporary-preview.example.test" }), "https://xentra-v1.vercel.app");
});

test("explicit public origin takes precedence over the production alias", () => {
  assert.equal(getSiteUrl({
    NEXT_PUBLIC_SITE_URL: " https://Group.Example.test:443/ ",
    VERCEL_PROJECT_PRODUCTION_URL: "production.example.test",
    VERCEL_URL: "preview.example.test",
  }), "https://group.example.test");
});

test("deployment hostnames and empty explicit overrides remain supported", () => {
  assert.equal(getSiteUrl({
    NEXT_PUBLIC_SITE_URL: " ",
    VERCEL_PROJECT_PRODUCTION_URL: "production.example.test/",
  }), "https://production.example.test");
});

const invalidOrigins = [
  ["HTTP", "http://example.test"],
  ["script scheme", "javascript:alert(1)"],
  ["relative path", "/example.test"],
  ["base path", "https://example.test/group"],
  ["query", "https://example.test?tracking=1"],
  ["empty query", "https://example.test?"],
  ["fragment", "https://example.test/#section"],
  ["empty fragment", "https://example.test/#"],
  ["credentials", "https://owner:synthetic-password@example.test"],
  ["embedded whitespace", "https://exam\nple.test"],
];

for (const [label, value] of invalidOrigins) {
  test(`rejects ${label} without disclosing its input`, () => {
    assert.throws(() => getSiteUrl({
      NEXT_PUBLIC_SITE_URL: value,
      VERCEL_PROJECT_PRODUCTION_URL: "valid.example.test",
    }), (error) => {
      assert.match(error.message, /NEXT_PUBLIC_SITE_URL/);
      assert.doesNotMatch(error.message, /synthetic-password|owner|example\.test/);
      return true;
    });
  });
}

test("an invalid production origin is not silently replaced", () => {
  assert.throws(() => getSiteUrl({
    VERCEL_PROJECT_PRODUCTION_URL: "https://example.test/wrong-base",
  }), /VERCEL_PROJECT_PRODUCTION_URL/);
});
