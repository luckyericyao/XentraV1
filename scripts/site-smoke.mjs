const baseUrl = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:3101").replace(
  /\/+$/,
  "",
);
const canonicalUrl = (
  process.env.SMOKE_CANONICAL_URL || "https://xentra-v1.vercel.app"
).replace(/\/+$/, "");
const checkExternal = process.env.SMOKE_EXTERNAL === "1";
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS || 30_000);
const runId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
let assertionCount = 0;

const companyUrls = [
  "https://agentcoach-three.vercel.app/",
  "https://localhostchinav1.vercel.app/",
  "https://bioaxisv3.vercel.app/",
];

function assert(condition, message) {
  assertionCount += 1;
  if (!condition) {
    throw new Error(message);
  }
}

function requestUrl(pathname) {
  const url = new URL(pathname, `${baseUrl}/`);
  url.searchParams.set("_smoke", runId);
  return url;
}

async function get(pathname, options = {}) {
  const url = requestUrl(pathname);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
      redirect: "follow",
      signal: AbortSignal.timeout(timeoutMs),
    });
    const body = options.binary
      ? new Uint8Array(await response.arrayBuffer())
      : await response.text();

    return { body, headers: response.headers, response, url: response.url };
  } catch (error) {
    throw new Error(
      `${pathname}: request failed (${error instanceof Error ? error.message : String(error)})`,
    );
  }
}

function contentType(result) {
  return result.headers.get("content-type") || "";
}

function assertStatus(result, expected, label) {
  assert(
    result.response.status === expected,
    `${label}: expected ${expected}, received ${result.response.status}`,
  );
}

function assertIncludes(value, expected, label) {
  assert(value.includes(expected), `${label}: missing ${JSON.stringify(expected)}`);
}

function assertSecurityHeaders(result, label) {
  const required = {
    "cross-origin-opener-policy": "same-origin",
    "cross-origin-resource-policy": "same-origin",
    "permissions-policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "referrer-policy": "strict-origin-when-cross-origin",
    "x-content-type-options": "nosniff",
    "x-dns-prefetch-control": "off",
    "x-frame-options": "DENY",
    "x-permitted-cross-domain-policies": "none",
  };

  for (const [name, expected] of Object.entries(required)) {
    assert(
      result.headers.get(name) === expected,
      `${label}: unexpected ${name} header`,
    );
  }

  const policy = result.headers.get("content-security-policy") || "";
  for (const directive of [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "script-src-attr 'none'",
  ]) {
    assertIncludes(policy, directive, `${label} CSP`);
  }
  assert(
    !policy.includes("'unsafe-eval'"),
    `${label} CSP: unsafe-eval must not be enabled in production`,
  );
}

function extractStructuredData(html, label) {
  const match = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert(match, `${label}: missing JSON-LD`);

  try {
    return JSON.parse(match[1]);
  } catch (error) {
    throw new Error(`${label}: invalid JSON-LD (${error.message})`);
  }
}

function mailtoSubjects(html) {
  return [...html.matchAll(/href="(mailto:[^"]+)"/g)].map((match) => {
    const href = match[1].replaceAll("&amp;", "&");
    return new URL(href).searchParams.get("subject");
  });
}

function verifyPage(result, locale) {
  const isChinese = locale === "zh";
  const label = isChinese ? "Chinese homepage" : "English homepage";
  const expectedLang = isChinese ? "zh-CN" : "en";
  const canonicalPath = isChinese ? "/zh" : "/";
  const canonicalHref = isChinese ? `${canonicalUrl}/zh` : canonicalUrl;
  const portfolioTitle = isChinese
    ? "同一套方法，进入三个具体市场。"
    : "Three markets. One operating system.";
  const contactLabel = isChinese ? "选择合作方向" : "Choose a conversation";
  const contactSubjects = isChinese
    ? ["Xentra 垂直业务合作", "Xentra 行业专家合作", "Xentra 资本合作"]
    : [
        "Xentra operating company discussion",
        "Xentra domain partnership",
        "Xentra capital partnership",
      ];

  assertStatus(result, 200, label);
  assertIncludes(contentType(result), "text/html", `${label} content type`);
  assertIncludes(result.body, `<html lang="${expectedLang}"`, `${label} lang`);
  assertIncludes(result.body, portfolioTitle, `${label} portfolio`);
  assertIncludes(result.body, contactLabel, `${label} contact`);
  assertIncludes(
    result.body,
    isChinese ? "AI 原生运营集团" : "AI-native operating group",
    `${label} group positioning`,
  );
  assert(
    !result.body.includes("AI-enabled operating group"),
    `${label}: legacy AI-enabled positioning is still present`,
  );
  assertIncludes(
    result.body,
    `<link rel="canonical" href="${canonicalHref}"`,
    `${label} canonical`,
  );
  assertIncludes(
    result.body,
    `hrefLang="zh-CN" href="${canonicalUrl}/zh"`,
    `${label} Chinese alternate`,
  );
  assertIncludes(
    result.body,
    `hrefLang="en" href="${canonicalUrl}"`,
    `${label} English alternate`,
  );

  for (const companyUrl of companyUrls) {
    assertIncludes(result.body, companyUrl, `${label} company link`);
  }

  const subjects = mailtoSubjects(result.body);
  for (const subject of contactSubjects) {
    assert(subjects.includes(subject), `${label}: missing mailto subject ${subject}`);
  }

  const structuredData = extractStructuredData(result.body, label);
  const graph = structuredData["@graph"] || [];
  const organization = graph.find((item) => item["@type"] === "Organization");
  const webpage = graph.find((item) => item["@type"] === "WebPage");
  assert(organization?.name === "Xentra", `${label}: invalid organization data`);
  assert(
    organization?.subOrganization?.length === 3,
    `${label}: expected three sub-organizations`,
  );
  assert(
    organization?.contactPoint?.url === `${canonicalUrl}${canonicalPath}#contact`,
    `${label}: invalid contact point URL`,
  );
  assert(webpage?.inLanguage === expectedLang, `${label}: invalid page language`);

  assertSecurityHeaders(result, label);
  if (isChinese) {
    assert(
      result.headers.get("content-language") === "zh-CN",
      `${label}: missing Content-Language`,
    );
  }
}

async function verifyExternalCompanies() {
  if (!checkExternal) {
    return;
  }

  for (const companyUrl of companyUrls) {
    try {
      const response = await fetch(companyUrl, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
      });
      assert(response.ok, `Company URL failed: ${companyUrl} (${response.status})`);
    } catch (error) {
      throw new Error(
        `Company URL failed: ${companyUrl} (${error instanceof Error ? error.message : String(error)})`,
      );
    }
  }
}

async function run() {
  const [
    english,
    chinese,
    englishMissing,
    chineseMissing,
    englishManifest,
    chineseManifest,
    englishSocial,
    chineseSocial,
    robots,
    sitemap,
    ...portfolioImages
  ] = await Promise.all([
    get("/"),
    get("/zh"),
    get("/smoke-missing-route"),
    get("/zh/smoke-missing-route"),
    get("/manifest.webmanifest"),
    get("/zh/manifest.webmanifest"),
    get("/opengraph-image", { binary: true }),
    get("/zh/opengraph-image", { binary: true }),
    get("/robots.txt"),
    get("/sitemap.xml"),
    get("/images/portfolio/ai-agent-coach.jpg", { binary: true }),
    get("/images/portfolio/localhost.jpg", { binary: true }),
    get("/images/portfolio/bioaxis.jpg", { binary: true }),
  ]);

  verifyPage(english, "en");
  verifyPage(chinese, "zh");

  assertStatus(englishMissing, 404, "English 404");
  assertIncludes(englishMissing.body, "Page not found", "English 404 copy");
  assertIncludes(
    englishMissing.body,
    "AI-native operating group",
    "English 404 positioning",
  );
  assert(
    !englishMissing.body.includes("AI-enabled operating group"),
    "English 404: legacy positioning is still present",
  );
  assertSecurityHeaders(englishMissing, "English 404");
  assertStatus(chineseMissing, 404, "Chinese 404");
  assertIncludes(chineseMissing.body, "页面不存在", "Chinese 404 copy");
  assert(
    chineseMissing.headers.get("content-language") === "zh-CN",
    "Chinese 404: missing Content-Language",
  );
  assertSecurityHeaders(chineseMissing, "Chinese 404");

  for (const [result, label, startUrl, positioning] of [
    [englishManifest, "English manifest", "/", "AI-native operating group"],
    [chineseManifest, "Chinese manifest", "/zh", "AI 原生运营集团"],
  ]) {
    assertStatus(result, 200, label);
    assertIncludes(
      contentType(result),
      "application/manifest+json",
      `${label} content type`,
    );
    const manifest = JSON.parse(result.body);
    assert(manifest.name === "Xentra", `${label}: invalid name`);
    assert(manifest.start_url === startUrl, `${label}: invalid start_url`);
    assertIncludes(manifest.description, positioning, `${label} positioning`);
  }

  for (const [result, label] of [
    [englishSocial, "English social image"],
    [chineseSocial, "Chinese social image"],
  ]) {
    assertStatus(result, 200, label);
    assertIncludes(contentType(result), "image/png", `${label} content type`);
    assert(result.body.byteLength > 1_000, `${label}: image body is too small`);
  }

  for (const [index, result] of portfolioImages.entries()) {
    const label = `Portfolio image ${index + 1}`;
    assertStatus(result, 200, label);
    assertIncludes(contentType(result), "image/jpeg", `${label} content type`);
    assert(result.body.byteLength > 50_000, `${label}: image body is too small`);
  }

  assertStatus(robots, 200, "Robots");
  assertIncludes(robots.body, "User-Agent: *", "Robots rules");
  assertIncludes(robots.body, `${canonicalUrl}/sitemap.xml`, "Robots sitemap");
  assertStatus(sitemap, 200, "Sitemap");
  assertIncludes(contentType(sitemap), "application/xml", "Sitemap content type");
  assertIncludes(sitemap.body, `<loc>${canonicalUrl}/</loc>`, "English sitemap URL");
  assertIncludes(sitemap.body, `<loc>${canonicalUrl}/zh</loc>`, "Chinese sitemap URL");

  await verifyExternalCompanies();
  console.log(
    `PASS ${assertionCount} assertions against ${baseUrl}${
      checkExternal ? " (including live company URLs)" : ""
    }`,
  );
}

run().catch((error) => {
  console.error(`FAIL ${error.message}`);
  process.exitCode = 1;
});
