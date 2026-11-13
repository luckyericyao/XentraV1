import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

const moduleUrl = new URL("../src/lib/public-config.ts", import.meta.url).href;

function loadConfig(environment = {}) {
  return spawnSync(process.execPath, [
    "--input-type=module",
    "--eval",
    `const config = await import(${JSON.stringify(moduleUrl)}); console.log(JSON.stringify(config));`,
  ], {
    cwd: new URL("..", import.meta.url),
    env: environment,
    encoding: "utf8",
    timeout: 5_000,
  });
}

test("defaults expose three company sites and a build record, not an inbox", () => {
  const result = loadConfig();
  assert.equal(result.status, 0, result.stderr);
  const config = JSON.parse(result.stdout);
  assert.equal(Object.keys(config.publicCompanyLinks).length, 3);
  assert.equal(config.publicContact.kind, "profile");
  assert.equal(config.publicContact.href, "https://github.com/luckyericyao/");
});

test("valid HTTPS paths are normalized without losing their base path", () => {
  const result = loadConfig({ XENTRA_AGENT_COACH_URL: "https://example.test/coach" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).publicCompanyLinks.agentCoach, "https://example.test/coach/");
});

test("current company overrides do not change recorded evidence sources", () => {
  const result = loadConfig({
    XENTRA_AGENT_COACH_URL: "https://coach.example.test/product",
    XENTRA_LOCALHOST_URL: "https://travel.example.test/private",
    XENTRA_BIOAXIS_URL: "https://lab.example.test/sourcing",
  });
  assert.equal(result.status, 0, result.stderr);
  const { publicCompanyLinks, recordedCompanyLinks } = JSON.parse(result.stdout);
  assert.notDeepEqual(publicCompanyLinks, recordedCompanyLinks);
  assert.deepEqual(recordedCompanyLinks, {
    agentCoach: "https://agentcoach-three.vercel.app/",
    localhost: "https://localhostchinav1.vercel.app/",
    bioaxis: "https://bioaxisv3.vercel.app/",
  });
});

test("the public build-record label preserves the configured path and port", () => {
  const result = loadConfig({
    XENTRA_CONTACT_URL: "https://www.build-record.example.test:8443/portfolio/a&b",
  });
  assert.equal(result.status, 0, result.stderr);
  const { publicContact } = JSON.parse(result.stdout);
  assert.equal(publicContact.kind, "profile");
  assert.equal(publicContact.href, "https://www.build-record.example.test:8443/portfolio/a&b/");
  assert.equal(publicContact.value, "build-record.example.test:8443/portfolio/a&b");
});

for (const [name, invalid] of [
  ["HTTP", "http://example.test/"],
  ["script scheme", "javascript:alert(1)"],
  ["query", "https://example.test/?tracking=1"],
  ["empty query", "https://example.test/?"],
  ["fragment", "https://example.test/#private"],
  ["empty fragment", "https://example.test/#"],
  ["credentials", "https://private-user:synthetic-password@example.test/"],
  ["username", "https://private-user@example.test/"],
  ["missing authority separator", "https:example.test"],
  ["extra authority slash", "https:///example.test"],
  ["backslash", "https://example.test/a\\b"],
  ["embedded whitespace", "https://example.test/private path"],
]) {
  test(`rejects unsafe public URL: ${name}`, () => {
    const result = loadConfig({ XENTRA_AGENT_COACH_URL: invalid });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /XENTRA_AGENT_COACH_URL/);
    assert.doesNotMatch(result.stderr, /synthetic-password|private-user/);
    assert.equal(result.stdout, "");
  });
}

test("the public build-record URL rejects credentials too", () => {
  const result = loadConfig({ XENTRA_CONTACT_URL: "https://owner:synthetic-password@example.test/" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /XENTRA_CONTACT_URL/);
  assert.doesNotMatch(result.stderr, /synthetic-password/);
});

test("an unverified address cannot publish a mailto link", () => {
  const result = loadConfig({ XENTRA_CONTACT_EMAIL: "unverified@example.test" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).publicContact.kind, "profile");
  assert.doesNotMatch(result.stdout, /unverified@example\.test|mailto:/);
});

test("a deliberately verified ordinary email remains supported", () => {
  const result = loadConfig({
    XENTRA_CONTACT_EMAIL: "partnerships+xentra@example.test",
    XENTRA_CONTACT_EMAIL_VERIFIED: "1",
  });
  assert.equal(result.status, 0, result.stderr);
  const contact = JSON.parse(result.stdout).publicContact;
  assert.equal(contact.kind, "email");
  assert.equal(contact.href, "mailto:partnerships+xentra@example.test");
  assert.equal(contact.opensNewWindow, false);
});

for (const email of [
  "",
  "not-an-address",
  "hello@example.test?subject=unexpected",
  "hello@example.test#unexpected",
  "hello%0D%0ABcc:other@example.test",
  "team@example.test,backup",
  "Xentra<hello@example.test>",
  "team..ops@example.test",
  "team@-example.test",
  "team@example..test",
  "https:partner@example.test",
  `${"a".repeat(65)}@example.test`,
]) {
  test("verification cannot bypass malformed or parameterized email rejection", () => {
    const result = loadConfig({
      XENTRA_CONTACT_EMAIL: email,
      XENTRA_CONTACT_EMAIL_VERIFIED: "1",
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /XENTRA_CONTACT_EMAIL/);
    assert.equal(result.stdout, "");
  });
}
