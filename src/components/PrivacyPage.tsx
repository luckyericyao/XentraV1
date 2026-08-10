import { Header } from "@/components/Header";
import { siteContent, type Locale } from "@/lib/content";
import { siteReviewDate } from "@/lib/site-meta";

type PrivacySection = {
  title: string;
  body: string[];
  showCompanyLinks?: boolean;
};

type PrivacyPageCopy = {
  lang: string;
  navLabel: string;
  homeLabel: string;
  languageLabel: string;
  languageHref: string;
  languageLang: string;
  eyebrow: string;
  title: string;
  intro: string;
  reviewedLabel: string;
  sections: PrivacySection[];
  contactLabel: string;
  contactBody: string;
  contactMailto: string;
  homeHref: string;
  footer: string;
  footerHomeLabel: string;
  companyLinksLabel: string;
  companyExternalLinkLabel: string;
};

const privacyCopy: Record<Locale, PrivacyPageCopy> = {
  en: {
    lang: "en",
    navLabel: "Privacy navigation",
    homeLabel: "Home",
    languageLabel: "中文",
    languageHref: "/zh/privacy",
    languageLang: "zh-CN",
    eyebrow: "Trust note",
    title: "Privacy, in plain terms.",
    intro:
      "How the Xentra group homepage handles information. This page describes the current public site, not the separate practices of its operating companies.",
    reviewedLabel: `Last reviewed ${siteReviewDate.english}`,
    sections: [
      {
        title: "On this site",
        body: [
          "The Xentra homepage is a public company page, not an account or product portal. You can browse it without creating an account, completing a web form, or submitting personal information.",
          "The page does not use embedded analytics, advertising pixels, or an account system. The hosting provider may process standard technical request data to serve and protect the site under its own terms.",
        ],
      },
      {
        title: "Contact by email",
        body: [
          "The contact links open your email client. Information you choose to send is used to respond to your inquiry and to assess the conversation you initiated.",
          "Please do not send passwords, confidential client material, or sensitive personal data in an initial email.",
        ],
      },
      {
        title: "Copying the email",
        body: [
          "The copy-email action runs in your browser. Copying the address does not send it to Xentra or create a contact record.",
        ],
      },
      {
        title: "Operating companies",
        body: [
          "Links to AI Agent Coach, Localhost, and BioAxis lead to separate sites with their own products, infrastructure, and information practices. Review the relevant site's terms before submitting anything there.",
        ],
        showCompanyLinks: true,
      },
    ],
    contactLabel: "Questions about this page",
    contactBody:
      "For questions about the Xentra homepage or a partnership inquiry, contact",
    contactMailto: `mailto:contact@xentra.ai?subject=${encodeURIComponent("Xentra privacy question")}`,
    homeHref: "/",
    footer: "Xentra — AI-native operating group for trust-heavy markets.",
    footerHomeLabel: "Return to Xentra",
    companyLinksLabel: "Public company sites",
    companyExternalLinkLabel: "opens in a new tab",
  },
  zh: {
    lang: "zh-CN",
    navLabel: "隐私说明导航",
    homeLabel: "首页",
    languageLabel: "EN",
    languageHref: "/privacy",
    languageLang: "en",
    eyebrow: "信任说明",
    title: "隐私说明。",
    intro:
      "这里说明 Xentra 集团主页如何处理信息，不代表旗下业务公司的独立数据实践。",
    reviewedLabel: `最近核验：${siteReviewDate.chinese}`,
    sections: [
      {
        title: "本页会处理什么",
        body: [
          "Xentra 主页是集团公开介绍页，不是账户或产品后台。浏览页面不需要注册、填写网页表单或提交个人信息。",
          "本页没有嵌入式分析工具、广告像素或账号系统。托管服务商仍可能按其规则处理提供页面和保护站点所需的标准技术数据。",
        ],
      },
      {
        title: "通过邮件联系",
        body: [
          "联系链接会打开你的邮件客户端。你主动发送的信息将用于回复咨询，并了解你发起的合作方向。",
          "首次联系时，请不要发送密码、客户机密或敏感个人信息。",
        ],
      },
      {
        title: "复制邮箱",
        body: [
          "复制邮箱只在你的浏览器中完成。复制这个动作不会把邮箱发送给 Xentra，也不会生成联系记录。",
        ],
      },
      {
        title: "旗下业务公司",
        body: [
          "AI Agent Coach、Localhost 和 BioAxis 都是独立网站，拥有各自的产品、基础设施与信息处理方式。在对应网站提交信息前，请阅读该网站的说明。",
        ],
        showCompanyLinks: true,
      },
    ],
    contactLabel: "关于本页的问题",
    contactBody: "如需询问 Xentra 主页或合作事宜，请联系",
    contactMailto: `mailto:contact@xentra.ai?subject=${encodeURIComponent("Xentra 隐私说明")}`,
    homeHref: "/zh",
    footer: "Xentra — 把复杂市场，做成可信系统。",
    footerHomeLabel: "返回 Xentra",
    companyLinksLabel: "公开业务网站",
    companyExternalLinkLabel: "在新窗口打开",
  },
};

type PrivacyPageProps = {
  locale: Locale;
};

export function PrivacyPage({ locale }: PrivacyPageProps) {
  const copy = privacyCopy[locale];
  const companyItems = siteContent[locale].companies.items;

  return (
    <>
      <Header
        homeHref={copy.homeHref}
        navItems={[{ label: copy.homeLabel, href: copy.homeHref }]}
        languageSwitch={{
          label: copy.languageLabel,
          href: copy.languageHref,
          lang: copy.languageLang,
        }}
      />
      <main
        id="top"
        tabIndex={-1}
        lang={copy.lang}
        className={`min-h-svh bg-[#070809] text-[#F2EFE8] ${
          locale === "zh" ? "cjk" : ""
        }`}
      >
        <section
          aria-labelledby="privacy-title"
          className="border-b border-[#2A2D33] px-5 py-24 sm:px-8 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow mb-6 text-[#C6A15B]">{copy.eyebrow}</p>
              <h1
                id="privacy-title"
                className="font-serif text-balance text-5xl font-normal leading-[0.98] sm:text-6xl lg:text-8xl"
              >
                {copy.title}
              </h1>
            </div>
            <div className="max-w-xl">
              <p className="text-base leading-8 text-[#A6A39A] sm:text-lg">
                {copy.intro}
              </p>
              <p className="eyebrow mt-6 text-[#8D97A5]">
                {copy.reviewedLabel}
              </p>
            </div>
          </div>
        </section>

        <section
          aria-label={copy.eyebrow}
          className="px-5 py-16 sm:px-8 sm:py-24 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl border-t border-[#2A2D33]">
              {copy.sections.map((section, index) => (
                <article
                  key={section.title}
                  className="grid gap-6 border-b border-[#2A2D33] py-8 sm:grid-cols-[8rem_1fr] sm:gap-10 sm:py-10"
                >
                  <p className="eyebrow pt-1 text-[#B49459]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight text-[#F2EFE8] sm:text-3xl">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4 text-base leading-8 text-[#A6A39A]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.showCompanyLinks ? (
                      <div className="mt-6 border-t border-[#2A2D33] pt-5">
                        <p className="eyebrow text-[#B49459]">
                          {copy.companyLinksLabel}
                        </p>
                        <ul className="mt-3 border-y border-[#2A2D33]">
                          {companyItems.map((company) => (
                            <li
                              key={company.slug}
                              className="border-b border-[#2A2D33] last:border-b-0"
                            >
                              <a
                                href={company.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${company.title} (${copy.companyExternalLinkLabel})`}
                                className="group flex min-h-12 items-center justify-between gap-4 text-sm text-[#A6A39A] transition hover:text-[#F2EFE8]"
                              >
                                <span>{company.title}</span>
                                <span
                                  aria-hidden="true"
                                  className="text-[#B49459] transition group-hover:translate-x-1 group-hover:text-[#C6A15B]"
                                >
                                  &#8599;
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-20 border-t border-[rgba(198,161,91,0.24)] pt-8 sm:mt-28 sm:flex sm:items-end sm:justify-between sm:gap-10">
              <div>
                <p className="eyebrow text-[#B49459]">{copy.contactLabel}</p>
                <p className="mt-4 max-w-xl text-base leading-8 text-[#A6A39A]">
                  {copy.contactBody}{" "}
                  <a
                    href={copy.contactMailto}
                    className="text-[#F2EFE8] underline decoration-[rgba(198,161,91,0.52)] underline-offset-4 transition hover:text-[#C6A15B]"
                  >
                    contact@xentra.ai
                  </a>
                  .
                </p>
              </div>
              <a
                href={copy.homeHref}
                className="mt-8 inline-flex min-h-11 items-center rounded-md border border-[rgba(198,161,91,0.42)] px-5 text-sm font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B] sm:mt-0"
              >
                {copy.footerHomeLabel}
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-[#2A2D33] bg-[#070809] px-5 py-8 text-[#9B978E] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.footer}</p>
          <a
            href={copy.homeHref}
            className="text-[#A6A39A] transition hover:text-[#F2EFE8]"
          >
            {copy.footerHomeLabel}
          </a>
        </div>
      </footer>
    </>
  );
}
