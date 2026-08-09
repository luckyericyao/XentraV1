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

const companyEvidenceUrls = [
  "https://agentcoach-three.vercel.app/#industries",
  "https://agentcoach-three.vercel.app/#waitlist",
  "https://agentcoach-three.vercel.app/#coaches",
  "https://localhostchinav1.vercel.app/journeys",
  "https://localhostchinav1.vercel.app/inquiry?type=traveler",
  "https://localhostchinav1.vercel.app/trust",
  "https://bioaxisv3.vercel.app/ready-supply",
  "https://bioaxisv3.vercel.app/equivalent-finder",
  "https://bioaxisv3.vercel.app/request-quote",
];

const companyEvidencePages = [
  {
    url: "https://agentcoach-three.vercel.app/",
    markers: ['id="industries"', 'id="waitlist"', 'id="coaches"'],
  },
  {
    url: "https://localhostchinav1.vercel.app/journeys",
    markers: ["A cultural atlas for the China you want to enter."],
  },
  {
    url: "https://localhostchinav1.vercel.app/inquiry?type=traveler",
    markers: ["Tell us how you want to enter China."],
  },
  {
    url: "https://localhostchinav1.vercel.app/trust",
    markers: ["A local-host network only works if it protects both sides."],
  },
  {
    url: "https://bioaxisv3.vercel.app/ready-supply",
    markers: ["Warehouse-backed consumables for faster lab procurement."],
  },
  {
    url: "https://bioaxisv3.vercel.app/equivalent-finder",
    markers: ["Find compatible alternatives for your current consumables"],
  },
  {
    url: "https://bioaxisv3.vercel.app/request-quote",
    markers: ["Start a sourcing request"],
  },
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

function assertAccessibleSurface(html, label) {
  assertIncludes(html, 'href="#top"', `${label} skip link`);
  assertIncludes(html, 'tabindex="-1"', `${label} main focus target`);
  assertIncludes(
    html,
    'aria-controls="mobile-navigation"',
    `${label} mobile navigation control`,
  );
  assertIncludes(html, 'aria-expanded="false"', `${label} mobile menu state`);
  assert(
    !/<img\b[^>]*\balt=""/.test(html),
    `${label}: empty image alt text`,
  );

  const externalLinks = [
    ...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g),
  ].map((match) => match[0]);
  for (const link of externalLinks) {
    assert(
      link.includes('rel="noopener noreferrer"'),
      `${label}: external link missing safe rel`,
    );
  }

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(
    (match) => match[1],
  );
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert(
    duplicateIds.length === 0,
    `${label}: duplicate ids ${duplicateIds.join(", ")}`,
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

function mailtoBodies(html) {
  return [...html.matchAll(/href="(mailto:[^"]+)"/g)].map((match) => {
    const href = match[1].replaceAll("&amp;", "&");
    return new URL(href).searchParams.get("body") || "";
  });
}

function verifyPage(result, locale) {
  const isChinese = locale === "zh";
  const label = isChinese ? "Chinese homepage" : "English homepage";
  const expectedLang = isChinese ? "zh-CN" : "en";
  const canonicalPath = isChinese ? "/zh" : "/";
  const canonicalHref = isChinese ? `${canonicalUrl}/zh` : canonicalUrl;
  const portfolioTitle = isChinese
    ? "集团复用能力，业务承担结果。"
    : "Shared capabilities. Accountable operators.";
  const buildTitle = isChinese
    ? "我们建立垂直运营公司。"
    : "Operating companies, not standalone tools.";
  const directionsTitle = isChinese
    ? "从难服务的市场开始。"
    : "The next company starts with a hard-to-serve market.";
  const groupCapabilities = isChinese
    ? ["选择市场", "建立判断产品", "设定验证标准", "搭建公司系统"]
    : [
        "Market selection",
        "Decision products",
        "Verification design",
        "Company systems",
      ];
  const publicEvidence = isChinese
    ? [
        "行业教练目录",
        "公开路线样本",
        "信任机制说明",
        "替代品匹配入口",
        "询价工作流",
      ]
    : [
        "Industry coach directory",
        "Route previews",
        "Published trust model",
        "Equivalent finder",
      "RFQ workflow",
    ];
  const evidenceVerifiedLabel = isChinese
    ? "核验于 2026.08.10"
    : "Checked 10 Aug 2026";
  const contactLabel = isChinese ? "选择合作方向" : "Choose a conversation";
  const contactNote = isChinese
    ? "点击任一方向，会打开一封预填邮件。"
    : "Each path opens a prefilled email brief.";
  const privacyPath = isChinese ? "/zh/privacy" : "/privacy";
  const contactSubjects = isChinese
    ? ["Xentra 垂直业务合作", "Xentra 行业专家合作", "Xentra 资本合作"]
    : [
        "Xentra operating company discussion",
        "Xentra domain partnership",
        "Xentra capital partnership",
      ];
  const contactBodyMarkers = isChinese
    ? [
        "你正在运营的业务：",
        "哪里最需要专业判断或现实验证：",
        "你关注的市场或方向：",
      ]
    : [
        "What you currently operate:",
        "Where judgment or execution breaks down:",
        "Markets or themes you back:",
      ];

  assertStatus(result, 200, label);
  assertIncludes(contentType(result), "text/html", `${label} content type`);
  assertAccessibleSurface(result.body, label);
  assertIncludes(result.body, `<html lang="${expectedLang}"`, `${label} lang`);
  assertIncludes(result.body, portfolioTitle, `${label} portfolio`);
  assertIncludes(result.body, buildTitle, `${label} build thesis`);
  assertIncludes(result.body, directionsTitle, `${label} new directions`);
  for (const capability of groupCapabilities) {
    assertIncludes(result.body, capability, `${label} group capability`);
  }
  for (const evidence of publicEvidence) {
    assertIncludes(result.body, evidence, `${label} public evidence`);
  }
  assertIncludes(
    result.body,
    evidenceVerifiedLabel,
    `${label} evidence verification date`,
  );
  assertIncludes(result.body, contactLabel, `${label} contact`);
  assertIncludes(result.body, contactNote, `${label} contact note`);
  assertIncludes(result.body, `href="${privacyPath}"`, `${label} privacy link`);
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

  for (const evidenceUrl of companyEvidenceUrls) {
    assertIncludes(result.body, evidenceUrl, `${label} evidence link`);
  }

  const subjects = mailtoSubjects(result.body);
  for (const subject of contactSubjects) {
    assert(subjects.includes(subject), `${label}: missing mailto subject ${subject}`);
  }
  const bodies = mailtoBodies(result.body);
  for (const marker of contactBodyMarkers) {
    assert(bodies.some((body) => body.includes(marker)), `${label}: missing mailto prompt ${marker}`);
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
  for (const subOrganization of organization?.subOrganization || []) {
    assert(
      subOrganization.parentOrganization?.["@id"] ===
        `${canonicalUrl}/#organization`,
      `${label}: invalid parent organization link`,
    );
  }
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

function verifyPrivacyPage(result, locale) {
  const isChinese = locale === "zh";
  const label = isChinese ? "Chinese privacy page" : "English privacy page";
  const expectedLang = isChinese ? "zh-CN" : "en";
  const privacyPath = isChinese ? "/zh/privacy" : "/privacy";
  const canonicalHref = `${canonicalUrl}${privacyPath}`;
  const title = isChinese ? "隐私说明。" : "Privacy, in plain terms.";
  const evidence = isChinese
    ? "本页没有嵌入式分析工具、广告像素或账号系统。"
    : "The page does not use embedded analytics, advertising pixels, or an account system.";
  const reviewedLabel = isChinese
    ? "最近核验：2026.08.10"
    : "Last reviewed 10 Aug 2026";

  assertStatus(result, 200, label);
  assertIncludes(contentType(result), "text/html", `${label} content type`);
  assertIncludes(result.body, `<html lang="${expectedLang}"`, `${label} lang`);
  assertIncludes(result.body, title, `${label} title`);
  assertIncludes(result.body, evidence, `${label} data note`);
  assertIncludes(result.body, reviewedLabel, `${label} review date`);
  assertIncludes(
    result.body,
    `<link rel="canonical" href="${canonicalHref}"`,
    `${label} canonical`,
  );
  assertIncludes(
    result.body,
    `hrefLang="zh-CN" href="${canonicalUrl}/zh/privacy"`,
    `${label} Chinese alternate`,
  );
  assertIncludes(
    result.body,
    `hrefLang="en" href="${canonicalUrl}/privacy"`,
    `${label} English alternate`,
  );
  assertIncludes(result.body, "mailto:contact@xentra.ai", `${label} contact`);
  assert(!result.body.includes("<form"), `${label}: unexpected form`);
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

  for (const { url, markers } of companyEvidencePages) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
      });
      const body = await response.text();
      assert(response.ok, `Evidence URL failed: ${url} (${response.status})`);
      assertIncludes(
        response.headers.get("content-type") || "",
        "text/html",
        `Evidence URL content type: ${url}`,
      );
      for (const marker of markers) {
        assertIncludes(body, marker, `Evidence URL marker: ${url}`);
      }
    } catch (error) {
      throw new Error(
        `Evidence URL failed: ${url} (${error instanceof Error ? error.message : String(error)})`,
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
    englishPrivacy,
    chinesePrivacy,
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
    get("/privacy"),
    get("/zh/privacy"),
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
  verifyPrivacyPage(englishPrivacy, "en");
  verifyPrivacyPage(chinesePrivacy, "zh");

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
  assertIncludes(
    sitemap.body,
    `<loc>${canonicalUrl}/privacy</loc>`,
    "English privacy sitemap URL",
  );
  assertIncludes(
    sitemap.body,
    `<loc>${canonicalUrl}/zh/privacy</loc>`,
    "Chinese privacy sitemap URL",
  );

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
