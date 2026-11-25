import { inspectLocalNavigation } from "./local-navigation.mjs";
import { inspectPublicDestinations } from "./public-destinations.mjs";
import { readReleaseSnapshot } from "./release-snapshot.mjs";
import { readSmokeResponse } from "./smoke-response.mjs";
import {
  isPublicContactEmail,
  normalizePublicHttpsUrl,
  publicUrlLabel,
} from "../src/lib/public-address.mjs";

const baseUrl = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:3101").replace(
  /\/+$/,
  "",
);
const canonicalUrl = (
  process.env.SMOKE_CANONICAL_URL || "https://xentra-v1.vercel.app"
).replace(/\/+$/, "");
const checkExternal = process.env.SMOKE_EXTERNAL === "1";
const expectedRevision = process.env.SMOKE_RELEASE_SHA;
if (expectedRevision && !/^[0-9a-f]{40}$/.test(expectedRevision)) {
  throw new Error("SMOKE_RELEASE_SHA must be a full lowercase Git SHA.");
}
const releaseAttempts = Number(process.env.SMOKE_RELEASE_ATTEMPTS || 1);
if (!Number.isInteger(releaseAttempts) || releaseAttempts < 1 || releaseAttempts > 10) {
  throw new Error("SMOKE_RELEASE_ATTEMPTS must be an integer from 1 to 10.");
}
if (releaseAttempts > 1 && !expectedRevision) {
  throw new Error("Set SMOKE_RELEASE_SHA to wait for a release.");
}
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS || 30_000);
const requestAttempts = Math.max(
  1,
  Number(process.env.SMOKE_REQUEST_ATTEMPTS || 3),
);
const runId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
let assertionCount = 0;

function configuredSmokeUrl(name, fallback) {
  return normalizePublicHttpsUrl(process.env[name]?.trim() || fallback, name);
}

const smokeContactEmailVerified =
  process.env.SMOKE_CONTACT_EMAIL_VERIFIED === "1";
const smokeContactEmail = process.env.SMOKE_CONTACT_EMAIL?.trim();

if (smokeContactEmailVerified && !smokeContactEmail) {
  throw new Error(
    "SMOKE_CONTACT_EMAIL is required when SMOKE_CONTACT_EMAIL_VERIFIED=1.",
  );
}

if (smokeContactEmailVerified && !isPublicContactEmail(smokeContactEmail)) {
  throw new Error("SMOKE_CONTACT_EMAIL must be a single plain email address.");
}

const defaultContactProfileUrl = "https://github.com/luckyericyao/";
const smokeContactProfileUrl = configuredSmokeUrl(
  "SMOKE_CONTACT_URL",
  defaultContactProfileUrl,
);
const smokeContactHref = smokeContactEmailVerified
  ? `mailto:${smokeContactEmail}`
  : smokeContactProfileUrl;
const smokeContactValue = smokeContactEmailVerified
  ? smokeContactEmail
  : publicUrlLabel(smokeContactProfileUrl);

const recordedCompanyUrls = {
  agentCoach: "https://agentcoach-three.vercel.app/",
  localhost: "https://localhostchinav1.vercel.app/",
  bioaxis: "https://bioaxisv3.vercel.app/",
};
const portfolioSlugs = ["ai-agent-coach", "localhost", "bioaxis"];
const localhostProductSite = "https://localhostglobal.vercel.app/";

const companyBaseUrls = {
  agentCoach: configuredSmokeUrl(
    "SMOKE_AGENT_COACH_URL",
    recordedCompanyUrls.agentCoach,
  ),
  localhost: configuredSmokeUrl(
    "SMOKE_LOCALHOST_URL",
    localhostProductSite,
  ),
  bioaxis: configuredSmokeUrl(
    "SMOKE_BIOAXIS_URL",
    recordedCompanyUrls.bioaxis,
  ),
};

const companyUrls = [
  companyBaseUrls.agentCoach,
  companyBaseUrls.localhost,
  companyBaseUrls.bioaxis,
];

const companyEvidenceUrls = [
  `${recordedCompanyUrls.agentCoach}recipes`,
  `${recordedCompanyUrls.agentCoach}become-a-client`,
  `${recordedCompanyUrls.agentCoach}become-a-coach`,
  `${localhostProductSite}journeys`,
  `${localhostProductSite}inquiry?type=traveler`,
  `${localhostProductSite}trust`,
  `${recordedCompanyUrls.bioaxis}ready-supply`,
  `${recordedCompanyUrls.bioaxis}equivalent-finder`,
  `${recordedCompanyUrls.bioaxis}request-quote`,
];

const companyEvidencePages = [
  {
    url: `${recordedCompanyUrls.agentCoach}recipes`,
    markers: [
      "<title>Agent Recipes | AgentCoach</title>",
      'href="/recipes/samples/',
      "Illustrative previews.",
    ],
  },
  {
    url: `${recordedCompanyUrls.agentCoach}become-a-client`,
    markers: ["Use expert-built Agent Recipes to improve high-value work."],
  },
  {
    url: `${recordedCompanyUrls.agentCoach}become-a-coach`,
    markers: ["Turn your expertise into reusable Agent Recipes."],
  },
  {
    url: `${localhostProductSite}journeys`,
    redirect: "manual",
    markers: ["Four routes into China.", 'href="/china/shanxi"', 'href="/china/shaolin"', 'href="/china/huizhou"', 'href="/china/shanghai"'],
  },
  {
    url: `${localhostProductSite}inquiry?type=traveler`,
    redirect: "manual",
    markers: ['data-inquiry-form="true"', 'id="inquiry-short-note"'],
  },
  {
    url: `${localhostProductSite}trust`,
    redirect: "manual",
    markers: ["A local-host network only works if it protects both sides."],
  },
  {
    url: `${recordedCompanyUrls.bioaxis}ready-supply`,
    markers: [
      "Check current supply evidence before procurement.",
      "this is not a live inventory feed",
      'href="/request-quote?',
      "intent=availability-check",
    ],
  },
  {
    url: `${recordedCompanyUrls.bioaxis}equivalent-finder`,
    markers: [
      "Review consumable alternatives",
      "does not automatically return verified alternatives",
      'href="/request-quote?requestType=equivalent',
    ],
  },
  {
    url: `${recordedCompanyUrls.bioaxis}request-quote`,
    markers: ["Request sourcing", "Verification is required before submission.", "<form"],
  },
];

function assert(condition, message) {
  assertionCount += 1;
  if (!condition) {
    throw new Error(message);
  }
}

function requestUrl(pathname, cacheBust, cacheKey = runId) {
  const url = new URL(pathname, `${baseUrl}/`);
  if (cacheBust) url.searchParams.set("_smoke", cacheKey);
  return url;
}

async function get(pathname, options = {}) {
  const url = requestUrl(pathname, options.cacheBust !== false, options.cacheKey);

  try {
    const { response, body } = await readSmokeResponse(url, {
      attempts: requestAttempts,
      timeoutMs,
      binary: options.binary,
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", ...options.headers },
      redirect: "follow",
    });

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

function htmlEscape(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;",
  })[character]);
}

function assertHref(html, href, label) {
  assertIncludes(html, `href="${htmlEscape(href)}"`, label);
}

function assertContactSurface(html, label) {
  assertIncludes(html, htmlEscape(smokeContactValue), `${label} contact value`);
  assertHref(html, smokeContactHref, `${label} configured contact link`);
  if (!smokeContactEmailVerified) {
    assert(!html.includes("mailto:"), `${label}: unexpected email in public-profile mode`);
    assert(!html.includes("contact@xentra.ai"), `${label}: unverified xentra.ai address was published`);
    if (smokeContactEmail) {
      assert(!html.includes(htmlEscape(smokeContactEmail)), `${label}: unverified configured address was published`);
    }
  }
}

function assertSecurityHeaders(result, label) {
  if (expectedRevision) {
    assert(result.headers.get("x-xentra-revision") === expectedRevision,
      `${label}: public response does not match release ${expectedRevision}`);
  }

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
    ? "集团提供方法，业务承担结果。"
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
    ? "这份运营纪律能否在不同业务里长期成立"
    : "whether that discipline can hold across very different businesses";
  const directionsTitle = isChinese
    ? "从难服务的市场开始。"
    : "The next company starts with a hard-to-serve market.";
  const companiesTitle = isChinese
    ? "不同市场，同一套运营逻辑。"
    : "Different markets. One operating discipline.";
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
        "怎样让 AI 真正进入工作，而不是又一个很快被放弃的工具？",
        "谁能带我进入一个地方，而不是只带我去一串景点？",
        "哪个产品真正适合实验、可以交付，也经得起核对？",
      ]
    : [
        "How does AI become part of the work, not another tool people stop using?",
        "Who can help me enter a place without reducing it to a checklist?",
        "Which option will fit the experiment, arrive, and hold up?",
      ];
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
        "工作流示例",
        "客户说明",
        "教练说明",
        "公开路线样本",
        "信任机制说明",
        "供货情况核查",
        "替代品评估",
        "采购需求入口",
      ]
    : [
        "Workflow previews",
        "Client overview",
        "Coach overview",
        "Route previews",
        "Published trust model",
        "Availability check",
        "Equivalent review",
        "Sourcing request",
      ];
  const evidenceVerifiedLabel = isChinese
    ? "截图于 2026.08.13"
    : "Screenshots: 13 Aug 2026";
  const evidenceNote = isChinese
    ? "截图为历史记录。链接指向公开页面，不代表服务开放、业绩承诺或第三方背书。"
    : "Screenshots are historical. Product links point to public pages, not a guarantee of access, performance, or endorsement.";
  const contactLabel = isChinese ? "合作对象" : "Who we build with";
  const contactNote = isChinese
    ? "参与一家公司有三种方式：负责交付、提供判断，或支持长期建设。"
    : "Three ways to contribute to a vertical company: own delivery, sharpen judgment, or support patient formation.";
  const contactTrustNote = smokeContactEmailVerified
    ? isChinese
      ? "链接会打开邮件客户端，本页不会收集或提交信息。"
      : "This link opens your email client. Nothing is submitted on this site."
    : isChinese
      ? "该公开档案列出当前业务背后的代码仓库。本页暂不发布未经核验的私下联系渠道。"
      : "This verified public profile lists the repositories behind the current portfolio. No private contact channel is published on this site.";
  const contactCtaLabel = smokeContactEmailVerified
    ? isChinese
      ? "邮件联系 Xentra"
      : "Email Xentra"
    : isChinese
      ? "查看创始人构建记录"
      : "Review founder build record";
  const chapterNavMarkers = isChinese
    ? ["返回集团架构", "下一家公司", "运营方法"]
    : ["Back to architecture", "Next company", "Operating model"];
  const heroLedgerMarkers = isChinese
    ? ["垂直业务公司", "公开产品入口", "共用运营动作"]
    : ["operating companies", "public product paths", "shared operating moves"];
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
  assertIncludes(result.body, ">09<", `${label} public path count`);
  assertIncludes(result.body, portfolioTitle, `${label} portfolio`);
  assertIncludes(result.body, buildTitle, `${label} build thesis`);
  assertIncludes(result.body, buildEyebrow, `${label} founder note label`);
  assertIncludes(result.body, buildSignature, `${label} founder note signature`);
  assertIncludes(result.body, buildVoice, `${label} founder note voice`);
  assertIncludes(
    result.body,
    `href="${isChinese ? "/zh/letter" : "/letter"}"`,
    `${label} founder letter link`,
  );
  assertIncludes(
    result.body,
    isChinese ? "阅读创始人手记" : "Read the founder letter",
    `${label} founder letter label`,
  );
  assertIncludes(result.body, directionsTitle, `${label} new directions`);
  assertIncludes(result.body, '<details id="directions" data-reading-stop="true"', `${label} directions reading stop`);
  assertIncludes(result.body, 'id="directions-content" data-reading-content="true" tabindex="-1"',
    `${label} focusable native directions link`);
  assertIncludes(result.body, companiesTitle, `${label} company overview`);
  for (const principle of companyPrinciples) {
    assertIncludes(result.body, principle, `${label} operating principle`);
  }
  assertIncludes(result.body, companyEntryLabel, `${label} company entry`);
  for (const id of ["thesis", "companies", "portfolio", "model", "contact"]) {
    assertIncludes(
      result.body,
      `<section id="${id}" tabindex="-1"`,
      `${label} keyboard navigation target: ${id}`,
    );
  }
  assertIncludes(result.body, '<section id="build"', `${label} founder reading target`);
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
  for (const slug of portfolioSlugs) {
    assertIncludes(
      result.body,
      `<article id="${slug}-chapter" tabindex="-1"`,
      `${label} keyboard chapter target for ${slug}`,
    );
    assertIncludes(
      result.body,
      `data-company-decision="${slug}"`,
      `${label} overview decision question for ${slug}`,
    );
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
  assertIncludes(
    result.body.replaceAll("<!-- -->", ""),
    isChinese ? "09 公开产品入口" : "09 public product paths",
    `${label} aggregate evidence count`,
  );
  assertIncludes(result.body, evidenceNote, `${label} evidence scope`);
  assertIncludes(result.body, contactLabel, `${label} contact`);
  assertIncludes(result.body, contactNote, `${label} contact note`);
  assertIncludes(result.body, contactTrustNote, `${label} contact trust note`);
  assertIncludes(result.body, contactCtaLabel, `${label} contact CTA`);
  assertContactSurface(result.body, label);
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
  assertIncludes(result.body, `<meta property="og:url" content="${canonicalHref}"`, `${label} Open Graph identity`);
  assertIncludes(result.body, `<meta property="og:image" content="${canonicalUrl}${isChinese ? "/zh" : ""}/opengraph-image"`, `${label} Open Graph image origin`);
  assertIncludes(result.body, `<meta name="twitter:image" content="${canonicalUrl}${isChinese ? "/zh" : ""}/twitter-image"`, `${label} Twitter image origin`);
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
    assertHref(result.body, companyUrl, `${label} current company link`);
  }

  for (const source of Object.values(recordedCompanyUrls)) {
    assertHref(result.body, source, `${label} recorded screenshot source`);
  }
  for (const evidenceUrl of companyEvidenceUrls) {
    assertHref(result.body, evidenceUrl, `${label} recorded evidence link`);
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
  for (const [index, subOrganization] of organization.subOrganization.entries()) {
    assert(subOrganization.url === companyUrls[index], `${label}: invalid current company URL`);
    assert(
      subOrganization.parentOrganization?.["@id"] ===
        `${canonicalUrl}/#organization`,
      `${label}: invalid parent organization link`,
    );
  }
  assert(
    !("sameAs" in organization),
    `${label}: a public build record is not an official organization identity`,
  );
  if (smokeContactEmailVerified) {
    assert(
      organization?.contactPoint?.url ===
        `${canonicalUrl}${canonicalPath}#contact`,
      `${label}: invalid contact point URL`,
    );
    assert(
      organization?.contactPoint?.email === smokeContactEmail,
      `${label}: missing verified contact email`,
    );
  } else {
    assert(
      !("contactPoint" in (organization || {})),
      `${label}: structured data misrepresents a public profile as a contact point`,
    );
  }
  assert(webpage?.inLanguage === expectedLang, `${label}: invalid page language`);
  assert(
    webpage?.dateModified === "2026-11-24",
    `${label}: missing page-modification date`,
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
      ? "公开构建记录"
      : "Public build record";

  assertStatus(result, 200, label);
  assertIncludes(contentType(result), "text/html", `${label} content type`);
  assertIncludes(result.body, `<html lang="${expectedLang}"`, `${label} lang`);
  assertIncludes(result.body, title, `${label} title`);
  assertIncludes(result.body, evidence, `${label} data note`);
  assertIncludes(result.body, reviewedLabel, `${label} review date`);
  assertIncludes(result.body, contactSection, `${label} contact disclosure`);
  assertContactSurface(result.body, label);
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
  for (const url of companyUrls) {
    assertHref(result.body, url, `${label} operating company link`);
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

function verifyFounderLetter(result, locale) {
  const isChinese = locale === "zh";
  const label = isChinese ? "Chinese founder letter" : "English founder letter";
  const expectedLang = isChinese ? "zh-CN" : "en";
  const letterPath = isChinese ? "/zh/letter" : "/letter";
  const canonicalHref = `${canonicalUrl}${letterPath}`;
  const pageTitle = isChinese ? "创始人手记 | Xentra" : "Founder Letter | Xentra";
  const headline = isChinese
    ? "一家公司，应该在变大以后，更值得信任。"
    : "A company should become more trusted as it grows.";
  const deck = isChinese
    ? "规模往往让人与结果越来越远。我建立 Xentra，是想做相反的事"
    : "Scale often creates distance. I am building Xentra around the opposite discipline";
  const sectionTitles = isChinese
    ? [
        "判断不是多余成本。",
        "最后一公里，本来就是产品的一部分。",
        "母公司必须证明自己值得存在。",
      ]
    : [
        "Judgment is not friction.",
        "The last mile belongs inside the company.",
        "The center must earn its place.",
      ];
  const closing = isChinese
    ? "重要的不是让业务版图看起来整齐，而是让困难的决定更可信"
    : "The point is not to make the portfolio look coherent. It is to make difficult decisions more trustworthy";
  const proofTitle = isChinese
    ? "三个市场，同一个犹豫时刻。"
    : "Three markets. The same moment of doubt.";
  const proofBody = isChinese
    ? "我不是先做一个平台，再去寻找可以套用的市场"
    : "I did not begin with a platform and look for markets to fit it";
  const decisionQuestions = isChinese
    ? [
        "怎样让 AI 真正进入工作，而不是又一个很快被放弃的工具？",
        "谁能带我进入一个地方，而不是只带我去一串景点？",
        "哪个产品真正适合实验、可以交付，也经得起核对？",
      ]
    : [
        "How does AI become part of the work, not another tool people stop using?",
        "Who can help me enter a place without reducing it to a checklist?",
        "Which option will fit the experiment, arrive, and hold up?",
      ];
  const companiesHref = isChinese ? "/zh#companies" : "/#companies";
  const contactHref = isChinese ? "/zh#contact" : "/#contact";
  const privacyHref = isChinese ? "/zh/privacy" : "/privacy";

  assertStatus(result, 200, label);
  assertIncludes(contentType(result), "text/html", `${label} content type`);
  assertAccessibleSurface(result.body, label);
  assertIncludes(result.body, `<html lang="${expectedLang}"`, `${label} lang`);
  assertIncludes(result.body, `<title>${pageTitle}</title>`, `${label} metadata title`);
  assertIncludes(
    result.body,
    `aria-label="${headline}"`,
    `${label} accessible headline`,
  );
  assertIncludes(result.body, deck, `${label} editorial deck`);
  for (const sectionTitle of sectionTitles) {
    assertIncludes(result.body, sectionTitle, `${label} section thesis`);
  }
  for (const id of ["letter-judgment", "letter-delivery", "letter-group", "letter-proof-title", "letter-closing"]) {
    assertIncludes(result.body, `id="${id}" data-reading-stop="true" tabindex="-1"`,
      `${label} focusable translation anchor`);
  }
  for (const id of ["letter-judgment", "letter-delivery", "letter-group"]) {
    assertHref(result.body, `#${id}`, `${label} native contents link`);
  }
  assertIncludes(result.body, proofTitle, `${label} operating proof title`);
  assertIncludes(result.body, proofBody, `${label} operating proof body`);
  assertIncludes(result.body, isChinese ? "工作流示例" : "Workflow previews", `${label} recipe preview label`);
  for (const question of decisionQuestions) {
    assertIncludes(result.body, question, `${label} customer decision question`);
  }
  assertIncludes(
    result.body.replaceAll("<!-- -->", ""),
    isChinese ? "03 垂直业务" : "03 operating companies",
    `${label} operating company count`,
  );
  assertIncludes(
    result.body.replaceAll("<!-- -->", ""),
    isChinese ? "09 公开产品入口" : "09 public product paths",
    `${label} public product path count`,
  );
  for (const evidenceUrl of companyEvidenceUrls) {
    assertHref(result.body, evidenceUrl, `${label} recorded evidence link`);
  }
  assertIncludes(result.body, closing, `${label} closing conviction`);
  assertIncludes(result.body, `href="${companiesHref}"`, `${label} companies CTA`);
  assertIncludes(result.body, `href="${contactHref}"`, `${label} contact CTA`);
  assertIncludes(result.body, `href="${privacyHref}"`, `${label} privacy link`);
  assertIncludes(
    result.body,
    `<link rel="canonical" href="${canonicalHref}"`,
    `${label} canonical`,
  );
  assertIncludes(
    result.body,
    `hrefLang="zh-CN" href="${canonicalUrl}/zh/letter"`,
    `${label} Chinese alternate`,
  );
  assertIncludes(
    result.body,
    `hrefLang="en" href="${canonicalUrl}/letter"`,
    `${label} English alternate`,
  );
  assert(!result.body.includes("<form"), `${label}: unexpected form`);
  assert(
    !result.body.includes("contact@xentra.ai"),
    `${label}: unverified xentra.ai email is published`,
  );

  const structuredData = extractStructuredData(result.body, label);
  assert(structuredData["@type"] === "Article", `${label}: invalid schema type`);
  assert(structuredData.headline === headline, `${label}: invalid schema headline`);
  assert(
    structuredData.datePublished === "2026-08-13",
    `${label}: invalid publication date`,
  );
  assert(
    structuredData.dateModified === "2026-11-24",
    `${label}: invalid modified date`,
  );
  assert(
    structuredData.mainEntityOfPage === canonicalHref,
    `${label}: invalid schema page URL`,
  );
  assert(
    structuredData.author?.["@type"] === "Organization" &&
      structuredData.author?.name === "Xentra",
    `${label}: invalid schema author`,
  );
  assert(
    structuredData.publisher?.name === "Xentra",
    `${label}: invalid schema publisher`,
  );

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

  const currentCompanyPages = companyUrls
    .filter((url) => !companyEvidencePages.some((page) => page.url === url))
    .map((url) => ({ url }));
  const destinations = [...companyEvidencePages, ...currentCompanyPages];
  const revisionHeaders = new Map([
    [new URL(localhostProductSite).origin, "x-localhost-revision"],
    [new URL(recordedCompanyUrls.agentCoach).origin, "x-agentcoach-revision"],
  ]);
  if (!smokeContactEmailVerified) {
    destinations.push({
      url: smokeContactProfileUrl,
      headers: { "User-Agent": "Xentra-site-smoke" },
      markers: smokeContactProfileUrl === defaultContactProfileUrl ? ["luckyericyao"] : [],
    });
  }
  const report = await inspectPublicDestinations(destinations, ({ url, headers, redirect = "follow" }) =>
    readSmokeResponse(url, {
      attempts: requestAttempts,
      timeoutMs,
      cache: "no-store",
      headers: { "Cache-Control": "no-cache", ...headers },
      redirect,
    }), { revisionHeaders },
  );
  assertionCount += report.assertions;
  for (const { origin, revisions, missing, invalid } of report.revisionObservations) {
    const label = revisions.length > 1 ? "PUBLIC_REVISION_MIXED" : "PUBLIC_REVISION";
    for (const [revision, paths] of revisions) {
      console.log(`${label} ${origin} ${revision} [${paths.join(", ")}]`);
    }
    if (missing.length) console.log(`PUBLIC_REVISION_MISSING ${origin} [${missing.join(", ")}]`);
    if (invalid.length) console.log(`PUBLIC_REVISION_INVALID ${origin} [${invalid.join(", ")}]`);
  }
  if (report.failures.length) {
    const details = report.failures.map(({ url, problems }) => `- ${url}: ${problems.join("; ")}`);
    throw new Error(`Public destination checks failed (${report.failures.length}/${report.checked}):\n${details.join("\n")}`);
  }
  console.log(`PASS ${report.checked} public destinations (read-only)`);
}

function verifyNotFound(result, locale) {
  const isChinese = locale === "zh";
  const label = isChinese ? "Chinese 404" : "English 404";
  const html = result.body;

  assertStatus(result, 404, label);
  assert(!result.response.redirected, `${label}: missing URL was redirected`);
  assertIncludes(contentType(result), "text/html", `${label} content type`);
  assert(!/<script\b/i.test(result.body), `${label}: recovery must not need JavaScript`);
  assert(!html.includes("smoke-not-found-input"), `${label}: request data was echoed`);
  assertIncludes(html, `<html lang="${isChinese ? "zh-CN" : "en"}"`, `${label} document language`);
  assertIncludes(html, 'name="robots" content="noindex"', `${label} indexing policy`);
  assertIncludes(html, 'href="/not-found.css"', `${label} recovery stylesheet`);
  assertIncludes(html, isChinese ? "页面不存在" : "Page not found", `${label} rendered copy`);
  assertIncludes(html, 'href="#not-found-main"', `${label} skip link`);
  assertIncludes(html, '<main id="not-found-main" tabindex="-1"', `${label} main focus target`);
  assertIncludes(html, `href="${isChinese ? "/zh" : "/"}"`, `${label} localized home link`);
  assertIncludes(html, `href="${isChinese ? "/" : "/zh"}"`, `${label} alternate home link`);
  assertIncludes(html, isChinese ? "AI 原生运营集团" : "AI-native operating group", `${label} positioning`);
  assertSecurityHeaders(result, label);
  if (isChinese) {
    assert(result.headers.get("content-language") === "zh-CN", `${label}: missing Content-Language`);
  }
}

async function verifyPageAssets(pages) {
  const requests = new Map();
  function checkAsset(path, kind) {
    if (!requests.has(path)) {
      requests.set(path, (async () => {
        // Use the URL the browser loads, including the unmodified cache key.
        const result = await get(path, { cacheBust: false, binary: kind === "font" });
        assertStatus(result, 200, path);
        assert(result.body.length > 0, `${path}: empty ${kind}`);
        const types = { css: "text/css", js: "javascript", font: "font/woff2" };
        assertIncludes(contentType(result), types[kind], `${path} content type`);
        if (kind === "font") {
          assert(Buffer.from(result.body.subarray(0, 4)).toString("ascii") === "wOF2", `${path}: invalid WOFF2 signature`);
        }
        return result.body;
      })());
    }
    return requests.get(path);
  }

  for (const { path, html } of pages) {
    const references = { css: new Set(), js: new Set(), font: new Set() };
    for (const [tag] of html.matchAll(/<(?:link|script)\b[^>]*>/g)) {
      const href = tag.match(/\s(?:href|src)="(\/_next\/static\/[^"]+)"/)?.[1];
      if (!href) continue;
      if (href.endsWith(".css") && /\srel="stylesheet"/.test(tag)) references.css.add(href);
      if (href.endsWith(".js")) references.js.add(href);
      if (href.endsWith(".woff2") && /\sas="font"/.test(tag)) references.font.add(href);
    }
    for (const [kind, paths] of Object.entries(references)) {
      assert(paths.size > 0, `${path}: no ${kind} reference in the HTML`);
    }
    const [stylesheets] = await Promise.all(Object.entries(references).map(([kind, paths]) => (
      Promise.all([...paths].map((asset) => checkAsset(asset, kind)))
    )));
    const css = stylesheets.join("\n");
    assert(/(?:^|})\s*body\s*\{[^}]*\boverflow-wrap:\s*anywhere\b/.test(css),
      `${path}: long text must wrap at enlarged font sizes`);
    if (path === "/" || path === "/zh") {
      assertIncludes(css, ".hero-title", `${path} hero stylesheet`);
      assertIncludes(css, ".md\\:hidden", `${path} generated responsive utilities`);
      assertIncludes(css, ".scroll-rise:focus-within", `${path} animated link focus visibility`);
      assert(/\bhtml\s*\{[^}]*\bscroll-padding-top:\s*5rem\b/.test(css),
        `${path}: the root scroller must clear the sticky header`);
    }
  }
}

function verifyLanguageLink(html, path) {
  const isChinese = path === "/zh" || path.startsWith("/zh/");
  const language = isChinese ? "en" : "zh-CN";
  const name = isChinese ? "English" : "中文";
  const links = html.match(/<a\b[^>]*\shreflang="[^"]+"[^>]*>/gi) ?? [];
  assert(links.length > 0, `${path}: missing language link`);
  for (const link of links) {
    assertIncludes(link.toLowerCase(), ` hreflang="${language.toLowerCase()}"`, `${path} alternate language`);
    assertIncludes(link, ` lang="${language}"`, `${path} language pronunciation`);
    assertIncludes(link, ` aria-label="${name}"`, `${path} accessible language name`);
  }
}

function verifyScriptFreeNavigation(pages) {
  for (const { path, html } of pages) {
    const fallback = html.match(
      /<noscript><nav\b[^>]*\bmobile-navigation-fallback\b[^>]*>([\s\S]*?)<\/nav><\/noscript>/,
    )?.[1];
    assert(fallback, `${path}: missing native mobile links for script-free browsing`);

    const home = path.startsWith("/zh") ? "/zh" : "/";
    const destinations = path.endsWith("/privacy")
      ? [home]
      : path.endsWith("/letter")
        ? [home, `${home}#companies`, `${home}#contact`]
        : ["#thesis", "#companies", "#model", "#contact"];
    for (const href of destinations) {
      assertIncludes(fallback, `href="${href}"`, `${path} script-free navigation`);
    }
  }
}

async function verifyImageAssets(homepages) {
  const sharePaths = [
    "/opengraph-image", "/zh/opengraph-image", "/twitter-image", "/zh/twitter-image",
  ];
  const shareImages = await Promise.all(sharePaths.map((path) => get(path, { binary: true })));
  for (const [index, result] of shareImages.entries()) {
    const label = sharePaths[index];
    assertStatus(result, 200, label);
    assertIncludes(contentType(result), "image/png", `${label} content type`);
    assert(result.body.byteLength > 1_000, `${label}: image body is too small`);
    const png = new DataView(result.body.buffer, result.body.byteOffset, result.body.byteLength);
    assert(
      png.getUint32(0) === 0x89504e47 && png.getUint32(4) === 0x0d0a1a0a,
      `${label}: invalid PNG signature`,
    );
    assert(png.getUint32(16) === 1200 && png.getUint32(20) === 630, `${label}: incorrect share dimensions`);
  }

  for (const slug of ["ai-agent-coach", "localhost", "bioaxis"]) {
    const path = `/images/portfolio/${slug}.jpg`;
    const variant = `/_next/image?${new URLSearchParams({ url: path, w: "640", q: "75" })}`;
    for (const [locale, page] of homepages) {
      const image = page.body.match(/<img\b[^>]*>/g)?.find((tag) => tag.includes(htmlEscape(variant)));
      const label = `${locale} ${slug}`;
      assertHref(page.body, path, `${label} full-size screenshot link`);
      assert(image, `${label}: missing responsive image candidate`);
      assertIncludes(image, 'loading="lazy"', `${label} lazy chapter image`);
      assertIncludes(image, 'sizes="(min-width: 84rem) 48rem,', `${label} bounded desktop image size`);
    }

    const [source, optimized] = await Promise.all([
      get(path, { binary: true }),
      get(variant, { binary: true, headers: { Accept: "image/webp" } }),
    ]);
    assertStatus(source, 200, path);
    assertIncludes(contentType(source), "image/jpeg", `${path} content type`);
    assert(source.body.byteLength > 50_000, `${path}: source image is too small`);
    assertStatus(optimized, 200, `${slug} optimized image`);
    assertIncludes(contentType(optimized), "image/webp", `${slug} optimized content type`);
    const header = Buffer.from(optimized.body.subarray(0, 12)).toString("ascii");
    assert(header.startsWith("RIFF") && header.endsWith("WEBP"), `${slug}: invalid WebP signature`);
    assert(
      optimized.body.byteLength > 1_000 && optimized.body.byteLength < source.body.byteLength,
      `${slug}: optimized image must be nonempty and smaller than the original`,
    );
  }
}

function readDocuments() {
  const paths = [
    "/", "/zh",
    "/smoke-missing-route/smoke-not-found-input",
    "/zh/smoke-missing-route?probe=smoke-not-found-input",
    "/privacy", "/zh/privacy", "/letter", "/zh/letter",
  ];
  if (!expectedRevision) return Promise.all(paths.map((path) => get(path)));

  return readReleaseSnapshot(
    paths,
    expectedRevision,
    (path, attempt) => get(path, { cacheKey: `${runId}-release-${attempt}` }),
    { attempts: releaseAttempts },
  );
}

async function run() {
  const [
    english,
    chinese,
    englishMissing,
    chineseMissing,
    englishPrivacy,
    chinesePrivacy,
    englishLetter,
    chineseLetter,
  ] = await readDocuments();
  const [
    englishManifest,
    chineseManifest,
    robots,
    sitemap,
    recoveryStyles,
  ] = await Promise.all([
    get("/manifest.webmanifest"),
    get("/zh/manifest.webmanifest"),
    get("/robots.txt"),
    get("/sitemap.xml"),
    get("/not-found.css"),
  ]);

  verifyPage(english, "en");
  verifyPage(chinese, "zh");
  verifyPrivacyPage(englishPrivacy, "en");
  verifyPrivacyPage(chinesePrivacy, "zh");
  verifyFounderLetter(englishLetter, "en");
  verifyFounderLetter(chineseLetter, "zh");

  const applicationPages = [
    { path: "/", html: english.body },
    { path: "/zh", html: chinese.body },
    { path: "/privacy", html: englishPrivacy.body },
    { path: "/zh/privacy", html: chinesePrivacy.body },
    { path: "/letter", html: englishLetter.body },
    { path: "/zh/letter", html: chineseLetter.body },
  ];
  const assetPaths = new Set(portfolioSlugs.map((slug) => `/images/portfolio/${slug}.jpg`));
  const localNavigation = inspectLocalNavigation(applicationPages, baseUrl, { assetPaths });
  assert(localNavigation.length > 50, "Local navigation coverage is unexpectedly empty");
  for (const { path, href, error } of localNavigation) {
    assert(!error, `Local navigation ${path} -> ${href}: ${error}`);
  }

  verifyNotFound(englishMissing, "en");
  verifyNotFound(chineseMissing, "zh");
  for (const { path, html } of applicationPages) verifyLanguageLink(html, path);
  verifyLanguageLink(englishMissing.body, "/404");
  verifyLanguageLink(chineseMissing.body, "/zh/404");
  assertStatus(recoveryStyles, 200, "Recovery stylesheet");
  assertIncludes(contentType(recoveryStyles), "text/css", "Recovery stylesheet content type");

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

  const homepages = [["en", english], ["zh", chinese]];
  verifyScriptFreeNavigation(applicationPages);
  await verifyPageAssets(applicationPages);
  await verifyImageAssets(homepages);

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
    `<loc>${canonicalUrl}/letter</loc>`,
    "English founder letter sitemap URL",
  );
  assertIncludes(
    sitemap.body,
    `<loc>${canonicalUrl}/zh/letter</loc>`,
    "Chinese founder letter sitemap URL",
  );
  const sitemapEntries = [...sitemap.body.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((match) => match[1]);
  for (const path of ["/", "/zh", "/letter", "/zh/letter", "/privacy", "/zh/privacy"]) {
    const entry = sitemapEntries.find((value) => value.includes(`<loc>${canonicalUrl}${path}</loc>`));
    const modified = path.endsWith("/privacy") ? "2026-08-13" : "2026-11-24";
    assert(entry, `Sitemap entry missing: ${path}`);
    assertIncludes(entry, `<lastmod>${modified}T00:00:00.000Z</lastmod>`, `Sitemap page date: ${path}`);
  }

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
