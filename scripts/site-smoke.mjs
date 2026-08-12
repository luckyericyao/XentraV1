const baseUrl = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:3101").replace(
  /\/+$/,
  "",
);
const canonicalUrl = (
  process.env.SMOKE_CANONICAL_URL || "https://xentra-v1.vercel.app"
).replace(/\/+$/, "");
const checkExternal = process.env.SMOKE_EXTERNAL === "1";
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS || 30_000);
const requestAttempts = Math.max(
  1,
  Number(process.env.SMOKE_REQUEST_ATTEMPTS || 3),
);
const runId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
let assertionCount = 0;

function configuredSmokeUrl(name, fallback) {
  const raw = process.env[name]?.trim() || fallback;
  const url = new URL(raw);

  if (url.protocol !== "https:" || url.search || url.hash) {
    throw new Error(`${name} must be an HTTPS URL without a query or hash.`);
  }

  return `${url.toString().replace(/\/+$/, "")}/`;
}

const smokeContactEmailVerified =
  process.env.SMOKE_CONTACT_EMAIL_VERIFIED === "1";
const smokeContactEmail = process.env.SMOKE_CONTACT_EMAIL?.trim();

if (smokeContactEmailVerified && !smokeContactEmail) {
  throw new Error(
    "SMOKE_CONTACT_EMAIL is required when SMOKE_CONTACT_EMAIL_VERIFIED=1.",
  );
}

if (
  smokeContactEmail &&
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(smokeContactEmail)
) {
  throw new Error("SMOKE_CONTACT_EMAIL must be a valid email address.");
}

const smokeContactProfileUrl = configuredSmokeUrl(
  "SMOKE_CONTACT_URL",
  "https://github.com/luckyericyao/",
);
const smokeContactHref = smokeContactEmailVerified
  ? `mailto:${smokeContactEmail}`
  : smokeContactProfileUrl;
const smokeContactValue = smokeContactEmailVerified
  ? smokeContactEmail
  : "github.com/luckyericyao";

const companyBaseUrls = {
  agentCoach: configuredSmokeUrl(
    "SMOKE_AGENT_COACH_URL",
    "https://agentcoach-three.vercel.app/",
  ),
  localhost: configuredSmokeUrl(
    "SMOKE_LOCALHOST_URL",
    "https://localhostchinav1.vercel.app/",
  ),
  bioaxis: configuredSmokeUrl(
    "SMOKE_BIOAXIS_URL",
    "https://bioaxisv3.vercel.app/",
  ),
};

const companyUrls = [
  companyBaseUrls.agentCoach,
  companyBaseUrls.localhost,
  companyBaseUrls.bioaxis,
];

const companyEvidenceUrls = [
  `${companyBaseUrls.agentCoach}#industries`,
  `${companyBaseUrls.agentCoach}#waitlist`,
  `${companyBaseUrls.agentCoach}#coaches`,
  `${companyBaseUrls.localhost}journeys`,
  `${companyBaseUrls.localhost}inquiry?type=traveler`,
  `${companyBaseUrls.localhost}trust`,
  `${companyBaseUrls.bioaxis}ready-supply`,
  `${companyBaseUrls.bioaxis}equivalent-finder`,
  `${companyBaseUrls.bioaxis}request-quote`,
];

const companyEvidencePages = [
  {
    url: companyBaseUrls.agentCoach,
    markers: ['id="industries"', 'id="waitlist"', 'id="coaches"'],
  },
  {
    url: `${companyBaseUrls.localhost}journeys`,
    markers: ["Choose a China that matches your attention."],
  },
  {
    url: `${companyBaseUrls.localhost}inquiry?type=traveler`,
    markers: ["Tell us how you want to enter China."],
  },
  {
    url: `${companyBaseUrls.localhost}trust`,
    markers: ["A local-host network only works if it protects both sides."],
  },
  {
    url: `${companyBaseUrls.bioaxis}ready-supply`,
    markers: ["Warehouse-backed consumables for faster lab procurement."],
  },
  {
    url: `${companyBaseUrls.bioaxis}equivalent-finder`,
    markers: ["Find compatible alternatives for your current consumables"],
  },
  {
    url: `${companyBaseUrls.bioaxis}request-quote`,
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
    const response = await fetchWithRetry(url, {
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

function isRetryableStatus(status) {
  return status === 408 || status === 429 || status >= 500;
}

async function fetchWithRetry(url, options = {}) {
  let lastError;

  for (let attempt = 1; attempt <= requestAttempts; attempt += 1) {
    try {
      const response = await fetch(url, options);

      if (!isRetryableStatus(response.status) || attempt === requestAttempts) {
        return response;
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    } catch (error) {
      lastError = error;

      if (attempt === requestAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }

  throw lastError || new Error(`Request failed: ${url}`);
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

function verifyPage(result, locale) {
  const isChinese = locale === "zh";
  const label = isChinese ? "Chinese homepage" : "English homepage";
  const expectedLang = isChinese ? "zh-CN" : "en";
  const canonicalPath = isChinese ? "/zh" : "/";
  const canonicalHref = isChinese ? `${canonicalUrl}/zh` : canonicalUrl;
  const portfolioTitle = isChinese
    ? "集团复用能力，业务承担结果。"
    : "Shared capabilities. Accountable operators.";
  const heroTitleMarkers = isChinese
    ? ["把复杂市场，", "做成可信系统。"]
    : ["Decision infrastructure for trust-heavy markets."];
  const pageTitle = isChinese
    ? "Xentra | 把复杂市场，做成可信系统"
    : "Xentra | AI-native operating group";
  const buildTitle = isChinese
    ? "我想建立的公司，规模越大，越值得信任。"
    : "I want to build companies that become more trusted as they grow.";
  const buildEyebrow = isChinese ? "创始人手记" : "From the Founder";
  const buildSignature = isChinese ? "Xentra 创始人" : "Founder, Xentra";
  const buildVoice = isChinese
    ? "Xentra 是我围绕这两种能力建立的一套长期运营方法"
    : "Xentra is the operating model I am building around both disciplines";
  const directionsTitle = isChinese
    ? "从难服务的市场开始。"
    : "The next company starts with a hard-to-serve market.";
  const companiesTitle = isChinese
    ? "不同市场，同一种底层问题。"
    : "Three markets. One operating thesis.";
  const companyPrinciples = isChinese
    ? ["问题先于技术", "证据先于声量", "交付先于规模"]
    : [
        "Problem before technology",
        "Evidence before reach",
        "Delivery before scale",
      ];
  const companyEntryLabel = isChinese ? "查看业务证据" : "View operating brief";
  const companyCopyMarkers = isChinese
    ? [
        "AI Agent Coach 从具体行业和任务出发",
        "匹配本地主理人，设计私人路线",
        "将产品清单、替代品、样品、文件和询价整理",
      ]
    : [];
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
    ? "核验于 2026.08.13"
    : "Checked 13 Aug 2026";
  const evidenceNote = isChinese
    ? "公开入口与截图按所示日期核验，不代表业绩承诺或第三方背书。"
    : "Public paths and screenshots are checked on the date shown; they are not performance claims or endorsements.";
  const contactLabel = isChinese ? "合作对象" : "Who we build with";
  const contactNote = isChinese
    ? "参与一家公司有三种方式：负责交付、提供判断，或支持长期建设。"
    : "Three ways to contribute to a vertical company: own delivery, sharpen judgment, or support patient formation.";
  const contactTrustNote = smokeContactEmailVerified
    ? isChinese
      ? "链接会打开邮件客户端，本页不会收集或提交信息。"
      : "This link opens your email client. Nothing is submitted on this site."
    : isChinese
      ? "合作引荐通过创始人公开档案直接对接。"
      : "Introductions are handled directly through the founder's verified public profile.";
  const contactCtaLabel = smokeContactEmailVerified
    ? isChinese
      ? "邮件联系 Xentra"
      : "Email Xentra"
    : isChinese
      ? "创始人公开档案"
      : "Founder profile";
  const chapterNavMarkers = isChinese
    ? ["返回集团架构", "下一家公司", "运营方法"]
    : ["Back to architecture", "Next company", "Operating model"];
  const heroLedgerMarkers = isChinese
    ? ["母公司方法", "垂直业务公司", "共用运营动作"]
    : ["parent operating thesis", "operating companies", "shared operating moves"];
  const privacyPath = isChinese ? "/zh/privacy" : "/privacy";
  assertStatus(result, 200, label);
  assertIncludes(contentType(result), "text/html", `${label} content type`);
  assertAccessibleSurface(result.body, label);
  assertIncludes(result.body, `<html lang="${expectedLang}"`, `${label} lang`);
  assertIncludes(result.body, `<title>${pageTitle}</title>`, `${label} metadata title`);
  for (const marker of heroTitleMarkers) {
    assertIncludes(result.body, marker, `${label} hero positioning`);
  }
  for (const marker of heroLedgerMarkers) {
    assertIncludes(result.body, marker, `${label} group register`);
  }
  assertIncludes(result.body, portfolioTitle, `${label} portfolio`);
  assertIncludes(result.body, buildTitle, `${label} build thesis`);
  assertIncludes(result.body, buildEyebrow, `${label} founder note label`);
  assertIncludes(result.body, buildSignature, `${label} founder note signature`);
  assertIncludes(result.body, buildVoice, `${label} founder note voice`);
  assertIncludes(result.body, directionsTitle, `${label} new directions`);
  assertIncludes(result.body, companiesTitle, `${label} company overview`);
  for (const principle of companyPrinciples) {
    assertIncludes(result.body, principle, `${label} operating principle`);
  }
  assertIncludes(result.body, companyEntryLabel, `${label} company entry`);
  for (const company of ["AI Agent Coach", "Localhost", "BioAxis"]) {
    const accessibleEntry = `aria-label="${companyEntryLabel}: ${company}"`;
    const entryCount = result.body.split(accessibleEntry).length - 1;
    assert(
      entryCount >= 2,
      `${label}: expected overview and architecture links for ${company}`,
    );
  }
  for (const marker of companyCopyMarkers) {
    assertIncludes(result.body, marker, `${label} native company copy`);
  }
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
  assertIncludes(result.body, evidenceNote, `${label} evidence scope`);
  assertIncludes(result.body, contactLabel, `${label} contact`);
  assertIncludes(result.body, contactNote, `${label} contact note`);
  assertIncludes(result.body, contactTrustNote, `${label} contact trust note`);
  assertIncludes(result.body, contactCtaLabel, `${label} contact CTA`);
  assertIncludes(result.body, smokeContactValue, `${label} contact value`);
  assertIncludes(
    result.body,
    `href="${smokeContactHref}"`,
    `${label} verified contact link`,
  );
  for (const marker of chapterNavMarkers) {
    assertIncludes(result.body, marker, `${label} chapter navigation`);
  }
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

  if (!smokeContactEmailVerified) {
    assert(
      !result.body.includes("contact@xentra.ai"),
      `${label}: unverified xentra.ai email is still published`,
    );
    assert(
      !result.body.includes("mailto:"),
      `${label}: unexpected email contact in public-profile mode`,
    );
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
    organization?.contactPoint?.url ===
      (smokeContactEmailVerified
        ? `${canonicalUrl}${canonicalPath}#contact`
        : smokeContactProfileUrl),
    `${label}: invalid contact point URL`,
  );
  if (smokeContactEmailVerified) {
    assert(
      organization?.contactPoint?.email === smokeContactEmail,
      `${label}: missing verified contact email`,
    );
  } else {
    assert(
      !("email" in (organization?.contactPoint || {})),
      `${label}: structured data exposes an unverified email`,
    );
    assert(
      organization?.sameAs?.includes(smokeContactProfileUrl),
      `${label}: missing verified owner profile`,
    );
  }
  assert(webpage?.inLanguage === expectedLang, `${label}: invalid page language`);
  assert(
    webpage?.dateModified === "2026-08-13",
    `${label}: missing structured-data review date`,
  );
  assert(
    webpage?.mainEntity?.["@id"] === `${canonicalUrl}/#organization`,
    `${label}: invalid structured-data main entity`,
  );

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
    ? "最近核验：2026.08.13"
    : "Last reviewed 13 Aug 2026";
  const contactSection = smokeContactEmailVerified
    ? isChinese
      ? "通过邮件联系"
      : "Contact by email"
    : isChinese
      ? "公开联系入口"
      : "Public contact";

  assertStatus(result, 200, label);
  assertIncludes(contentType(result), "text/html", `${label} content type`);
  assertIncludes(result.body, `<html lang="${expectedLang}"`, `${label} lang`);
  assertIncludes(result.body, title, `${label} title`);
  assertIncludes(result.body, evidence, `${label} data note`);
  assertIncludes(result.body, reviewedLabel, `${label} review date`);
  assertIncludes(result.body, contactSection, `${label} contact disclosure`);
  assertIncludes(result.body, smokeContactValue, `${label} contact value`);
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
  assertIncludes(
    result.body,
    `href="${smokeContactHref}"`,
    `${label} verified contact link`,
  );
  if (!smokeContactEmailVerified) {
    assert(
      !result.body.includes("contact@xentra.ai"),
      `${label}: unverified xentra.ai email is still published`,
    );
    assert(
      !result.body.includes("mailto:"),
      `${label}: unexpected email contact in public-profile mode`,
    );
  }
  for (const company of ["AI Agent Coach", "Localhost", "BioAxis"]) {
    assertIncludes(result.body, company, `${label} operating company disclosure`);
    assertIncludes(
      result.body,
      `${company} (${isChinese ? "在新窗口打开" : "opens in a new tab"})`,
      `${label} operating company external label`,
    );
  }
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
      const response = await fetchWithRetry(url, {
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

  if (!smokeContactEmailVerified) {
    try {
      const response = await fetchWithRetry(smokeContactProfileUrl, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
          "User-Agent": "Xentra-site-smoke",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
      });
      const body = await response.text();
      assert(
        response.ok,
        `Public contact URL failed: ${smokeContactProfileUrl} (${response.status})`,
      );
      assertIncludes(
        response.headers.get("content-type") || "",
        "text/html",
        `Public contact content type: ${smokeContactProfileUrl}`,
      );
      assertIncludes(
        body,
        "luckyericyao",
        `Public contact identity marker: ${smokeContactProfileUrl}`,
      );
    } catch (error) {
      throw new Error(
        `Public contact URL failed: ${smokeContactProfileUrl} (${error instanceof Error ? error.message : String(error)})`,
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
    "#not-found-main",
    "English 404 skip link",
  );
  assertIncludes(
    englishMissing.body,
    "not-found-main",
    "English 404 main target",
  );
  assertIncludes(
    englishMissing.body,
    'tabIndex\\":-1',
    "English 404 main focus target",
  );
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
  assertIncludes(
    chineseMissing.body,
    "#not-found-main",
    "Chinese 404 skip link",
  );
  assertIncludes(
    chineseMissing.body,
    "not-found-main",
    "Chinese 404 main target",
  );
  assertIncludes(
    chineseMissing.body,
    'tabIndex\\":-1',
    "Chinese 404 main focus target",
  );
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
  assertIncludes(
    sitemap.body,
    "<lastmod>2026-08-13T00:00:00.000Z</lastmod>",
    "Sitemap stable review date",
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
