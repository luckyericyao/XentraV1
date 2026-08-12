import { Header } from "@/components/Header";
import { siteContent } from "@/lib/content";
import type { Locale } from "@/lib/content";
import { siteReviewDate } from "@/lib/site-meta";
import { getSiteUrl } from "@/lib/site-url";

type LetterCopy = {
  lang: string;
  homeHref: string;
  languageSwitch: { label: string; href: string; lang: string };
  navItems: { label: string; href: string }[];
  eyebrow: string;
  title: string;
  titleLines?: {
    mobile: string[];
    desktop: string[];
  };
  deck: string;
  publishedLabel: string;
  indexLabel: string;
  sections: { title: string; body: string }[];
  proof: {
    eyebrow: string;
    title: string;
    body: string;
    questionLabel: string;
    companyCountLabel: string;
    countLabel: string;
    chapterLabel: string;
    externalLinkLabel: string;
  };
  closing: string;
  signature: string;
  companiesLabel: string;
  companiesHref: string;
  contactLabel: string;
  contactHref: string;
  footer: string;
  privacyLabel: string;
  privacyHref: string;
};

const publicationDate = "2026-08-13";

const letterCopy: Record<Locale, LetterCopy> = {
  en: {
    lang: "en",
    homeHref: "/",
    languageSwitch: { label: "中文", href: "/zh/letter", lang: "zh-CN" },
    navItems: [
      { label: "Home", href: "/" },
      { label: "Companies", href: "/#companies" },
      { label: "Contact", href: "/#contact" },
    ],
    eyebrow: "Founder Letter / 01",
    title: "A company should become more trusted as it grows.",
    deck: "Scale often creates distance. I am building Xentra around the opposite discipline: remove repetition with technology, then make judgment, responsibility, and delivery more visible.",
    publishedLabel: "13 Aug 2026",
    indexLabel: "Operating convictions",
    sections: [
      {
        title: "Judgment is not friction.",
        body: "In complex markets, the decision is part of the product. Search can be automated; accountability cannot. The goal is not to keep people in every step, but to reserve human judgment for the moments that change the outcome.",
      },
      {
        title: "The last mile belongs inside the company.",
        body: "A recommendation without delivery transfers the hardest part back to the customer. Xentra's operating companies stay with the handoff: workflow adoption, local access, or laboratory supply.",
      },
      {
        title: "The center must earn its place.",
        body: "A parent company is useful only if it improves what each business can do alone. Xentra shares methods for structure, reasoning, verification, and execution while every company remains answerable to its market.",
      },
    ],
    proof: {
      eyebrow: "Why These Three",
      title: "Three markets. The same moment of doubt.",
      body: "I did not begin with a platform and look for markets to fit it. I kept finding people with plenty of information, but no trusted way to decide and no one accountable for what happened next.",
      questionLabel: "The question",
      companyCountLabel: "operating companies",
      countLabel: "public product paths",
      chapterLabel: "Review evidence",
      externalLinkLabel: "opens in a new tab",
    },
    closing:
      "The point is not to make the portfolio look coherent. It is to make difficult decisions more trustworthy, then stay long enough to deliver.",
    signature: "Founder, Xentra",
    companiesLabel: "View operating companies",
    companiesHref: "/#companies",
    contactLabel: "Discuss a market",
    contactHref: "/#contact",
    footer: "Xentra — AI-native operating group for trust-heavy markets.",
    privacyLabel: "Privacy",
    privacyHref: "/privacy",
  },
  zh: {
    lang: "zh-CN",
    homeHref: "/zh",
    languageSwitch: { label: "EN", href: "/letter", lang: "en" },
    navItems: [
      { label: "首页", href: "/zh" },
      { label: "业务", href: "/zh#companies" },
      { label: "联系", href: "/zh#contact" },
    ],
    eyebrow: "创始人手记 / 01",
    title: "一家公司，应该在变大以后，更值得信任。",
    titleLines: {
      mobile: ["一家公司，", "应该在", "变大以后，", "更值得信任。"],
      desktop: ["一家公司，", "应该在变大以后，", "更值得信任。"],
    },
    deck: "规模往往让人与结果越来越远。我建立 Xentra，是想做相反的事：用技术消除重复，却让判断、责任和交付变得更清楚。",
    publishedLabel: "2026.08.13",
    indexLabel: "经营判断",
    sections: [
      {
        title: "判断不是多余成本。",
        body: "在复杂市场里，用户购买的往往不只是信息，而是有人愿意对选择负责。搜索可以自动化，责任不能。人的价值，不是留在每个步骤里，而是出现在真正改变结果的节点。",
      },
      {
        title: "最后一公里，本来就是产品的一部分。",
        body: "只给建议、不管交付，是把最难的问题重新交还给用户。Xentra 旗下业务会留在最后的交接现场：工作流落地、本地进入，或实验室供应。",
      },
      {
        title: "母公司必须证明自己值得存在。",
        body: "如果集团不能让每家公司做得更好，中心就只是管理成本。Xentra 共享结构化、推理、验证与执行的方法；每家公司仍然直接面对市场，并对结果负责。",
      },
    ],
    proof: {
      eyebrow: "为什么是这三个市场",
      title: "三个市场，同一个犹豫时刻。",
      body: "我不是先做一个平台，再去寻找可以套用的市场。我反复看见的是同一个时刻：一个人手里信息很多，却仍然无法放心做决定，也没有人对之后的结果负责。",
      questionLabel: "用户真正问的是",
      companyCountLabel: "垂直业务",
      countLabel: "公开产品入口",
      chapterLabel: "查看证据",
      externalLinkLabel: "在新窗口打开",
    },
    closing: "重要的不是让业务版图看起来整齐，而是让困难的决定更可信，并留下来把结果交付出去。",
    signature: "Xentra 创始人",
    companiesLabel: "查看业务布局",
    companiesHref: "/zh#companies",
    contactLabel: "讨论一个市场",
    contactHref: "/zh#contact",
    footer: "Xentra — 把复杂市场，做成可信系统。",
    privacyLabel: "隐私说明",
    privacyHref: "/zh/privacy",
  },
};

type FounderLetterPageProps = {
  locale: Locale;
};

export function FounderLetterPage({ locale }: FounderLetterPageProps) {
  const copy = letterCopy[locale];
  const companies = siteContent[locale].companies.items;
  const publicPathCount = companies.reduce(
    (total, company) => total + company.evidence.proof.length,
    0,
  );
  const siteUrl = getSiteUrl();
  const pagePath = locale === "zh" ? "/zh/letter" : "/letter";
  const pageUrl = `${siteUrl}${pagePath}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: copy.title,
    description: copy.deck,
    datePublished: publicationDate,
    dateModified: publicationDate,
    inLanguage: copy.lang,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: "Xentra",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Xentra",
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header
        homeHref={copy.homeHref}
        navItems={copy.navItems}
        languageSwitch={copy.languageSwitch}
      />
      <main
        id="top"
        tabIndex={-1}
        lang={copy.lang}
        className={locale === "zh" ? "cjk" : undefined}
      >
        <section
          aria-labelledby="letter-title"
          className="border-b border-[#2A2D33] bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 sm:py-28 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_0.38fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow mb-7 text-[#C6A15B]">{copy.eyebrow}</p>
                <h1
                  id="letter-title"
                  aria-label={copy.title}
                  className={`letter-title max-w-5xl font-serif font-normal ${
                    locale === "zh"
                      ? "text-[2.875rem] leading-[1.02] sm:text-7xl sm:leading-[0.98] lg:text-[5.75rem]"
                      : "text-balance text-[3.25rem] leading-[0.98] sm:text-7xl lg:text-[5.75rem]"
                  }`}
                >
                  {copy.titleLines ? (
                    <>
                      <span aria-hidden="true" className="sm:hidden">
                        {copy.titleLines.mobile.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                      <span aria-hidden="true" className="hidden sm:block">
                        {copy.titleLines.desktop.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </>
                  ) : (
                    copy.title
                  )}
                </h1>
              </div>
              <p className="eyebrow border-l border-[#2A2D33] pl-5 text-[#8D97A5] lg:mb-2">
                {copy.publishedLabel}
              </p>
            </div>
            <p className="mt-10 max-w-3xl text-pretty text-lg leading-8 text-[#A6A39A] sm:text-xl sm:leading-9">
              {copy.deck}
            </p>
          </div>
        </section>

        <section
          aria-label={copy.indexLabel}
          className="bg-[#101214] px-5 py-20 text-[#F2EFE8] sm:px-8 sm:py-24 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow text-[#B49459]">{copy.indexLabel}</p>
              <p className="mt-5 max-w-xs text-sm leading-6 text-[#8D97A5]">
                01 / 03
              </p>
            </div>
            <div className="border-t border-[#2A2D33]">
              {copy.sections.map((section, index) => (
                <article
                  key={section.title}
                  className="grid gap-5 border-b border-[#2A2D33] py-9 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-12"
                >
                  <p className="eyebrow pt-1 text-[#B49459]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="text-balance text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-[#A6A39A] sm:text-lg sm:leading-8">
                      {section.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="letter-proof-title"
          className="border-y border-[#2A2D33] bg-[#070809] px-5 py-20 text-[#F2EFE8] sm:px-8 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {copy.proof.eyebrow}
                </p>
                <h2
                  id="letter-proof-title"
                  className="max-w-4xl text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
                >
                  {copy.proof.title}
                </h2>
              </div>
              <div>
                <p className="text-base leading-8 text-[#A6A39A] sm:text-lg">
                  {copy.proof.body}
                </p>
                <p className="eyebrow mt-6 flex flex-wrap gap-x-3 gap-y-2 text-[#8D97A5]">
                  <span>
                    {String(companies.length).padStart(2, "0")} {copy.proof.companyCountLabel}
                  </span>
                  <span aria-hidden="true" className="text-[#B49459]">
                    /
                  </span>
                  <span>
                    {String(publicPathCount).padStart(2, "0")} {copy.proof.countLabel}
                  </span>
                  <span aria-hidden="true" className="text-[#B49459]">
                    /
                  </span>
                  <span>
                    {locale === "zh"
                      ? siteReviewDate.chinese
                      : siteReviewDate.english}
                  </span>
                </p>
              </div>
            </div>

            <ol className="mt-12 border-y border-[#2A2D33]">
              {companies.map((company, index) => (
                <li
                  key={company.slug}
                  className="grid gap-5 border-b border-[#2A2D33] py-7 last:border-b-0 lg:grid-cols-[3rem_0.55fr_1fr] lg:items-start lg:gap-8 lg:py-9"
                >
                  <span className="eyebrow pt-1 text-[#B49459]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="eyebrow text-[#8D97A5]">{company.vertical}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-[#F2EFE8]">
                      {company.title}
                    </h3>
                  </div>
                  <div>
                    <p className="eyebrow text-[#8D97A5]">
                      {copy.proof.questionLabel}
                    </p>
                    <blockquote className="mt-3 max-w-2xl font-serif text-xl font-normal leading-8 text-[#F2EFE8] sm:text-2xl sm:leading-9">
                      <span aria-hidden="true">&ldquo;</span>
                      {company.evidence.decision}
                      <span aria-hidden="true">&rdquo;</span>
                    </blockquote>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#2A2D33] pt-4">
                      {company.evidence.proof.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${item.label} (${copy.proof.externalLinkLabel})`}
                          className="inline-flex min-h-8 items-center gap-2 text-xs text-[#A6A39A] transition hover:text-[#F2EFE8]"
                        >
                          <span aria-hidden="true" className="text-[#B49459]">
                            &#8599;
                          </span>
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <a
                      href={`${copy.homeHref}#${company.slug}-chapter`}
                      className="group mt-4 inline-flex min-h-9 items-center gap-3 text-sm font-medium text-[#F2EFE8] transition hover:text-[#C6A15B]"
                    >
                      {copy.proof.chapterLabel}
                      <span
                        aria-hidden="true"
                        className="text-[#B49459] transition group-hover:translate-x-1"
                      >
                        &#8594;
                      </span>
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-y border-[#2A2D33] bg-[#101214] px-5 py-20 text-[#F2EFE8] sm:px-8 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.38fr] lg:items-end lg:gap-20">
            <div>
              <p className="max-w-4xl text-balance text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                {copy.closing}
              </p>
              <p className="eyebrow mt-9 flex items-center gap-3 text-[#B49459]">
                <span aria-hidden="true" className="block h-px w-8 bg-[#8E7445]" />
                <span>{copy.signature}</span>
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={copy.companiesHref}
                className="inline-flex min-h-11 items-center justify-between gap-5 rounded-md border border-[rgba(198,161,91,0.42)] bg-[#101214] px-5 text-sm font-medium transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
              >
                {copy.companiesLabel}
                <span aria-hidden="true" className="text-[#B49459]">
                  &#8594;
                </span>
              </a>
              <a
                href={copy.contactHref}
                className="inline-flex min-h-11 items-center justify-between gap-5 rounded-md border border-[#2A2D33] px-5 text-sm text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.36)] hover:text-[#F2EFE8]"
              >
                {copy.contactLabel}
                <span aria-hidden="true" className="text-[#B49459]">
                  &#8594;
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#070809] px-5 py-9 text-[#9B978E] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 border-t border-[#2A2D33] pt-8 sm:flex-row sm:items-center">
          <p className="text-sm leading-6 text-[#A6A39A]">{copy.footer}</p>
          <div className="flex items-center gap-6">
            <a
              href={copy.privacyHref}
              className="text-sm transition hover:text-[#F2EFE8]"
            >
              {copy.privacyLabel}
            </a>
            <a
              href={copy.homeHref}
              className="text-sm transition hover:text-[#F2EFE8]"
            >
              Xentra
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
