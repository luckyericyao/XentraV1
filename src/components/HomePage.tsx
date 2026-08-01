import { CompanyCard } from "@/components/CompanyCard";
import { ContactActions } from "@/components/ContactActions";
import { DecisionGraph } from "@/components/DecisionGraph";
import { Header } from "@/components/Header";
import { OperatingFlow } from "@/components/OperatingFlow";
import { StructuredData } from "@/components/StructuredData";
import { siteContent } from "@/lib/content";
import type { Locale } from "@/lib/content";

type HomePageProps = {
  locale: Locale;
};

const architectureAccent = {
  "ai-agent-coach": {
    border: "border-[rgba(111,119,130,0.34)]",
    hoverBorder: "hover:border-[rgba(111,119,130,0.62)]",
    text: "text-[#6F7782]",
  },
  localhost: {
    border: "border-[rgba(198,161,91,0.34)]",
    hoverBorder: "hover:border-[rgba(198,161,91,0.62)]",
    text: "text-[#C6A15B]",
  },
  bioaxis: {
    border: "border-[rgba(124,131,119,0.34)]",
    hoverBorder: "hover:border-[rgba(124,131,119,0.62)]",
    text: "text-[#7C8377]",
  },
  default: {
    border: "border-[#2A2D33]",
    hoverBorder: "hover:border-[rgba(198,161,91,0.28)]",
    text: "text-[#C6A15B]",
  },
} as const;

export function HomePage({ locale }: HomePageProps) {
  const content = siteContent[locale];

  return (
    <>
      <StructuredData locale={locale} />
      <Header
        navItems={content.navItems}
        languageSwitch={content.languageSwitch}
      />
      <main
        id="top"
        tabIndex={-1}
        lang={content.lang}
        className={locale === "zh" ? "cjk" : undefined}
      >
        <section className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-[#070809] px-5 py-20 text-[#F2EFE8] sm:px-8 lg:py-28">
          <div className="hero-color-field" aria-hidden="true" />
          <DecisionGraph />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
            <div className="max-w-6xl">
              <p className="eyebrow reveal mb-8 text-[#C6A15B]">
                {content.hero.eyebrow}
              </p>
              <h1 className="hero-title reveal reveal-delay-1 max-w-5xl text-balance">
                {content.hero.title}
              </h1>
              {content.hero.subtitle ? (
                <p className="reveal reveal-delay-2 mt-7 max-w-4xl text-pretty text-2xl font-medium leading-8 text-[#F2EFE8] sm:text-3xl sm:leading-10">
                  {content.hero.subtitle}
                </p>
              ) : null}
              <div className="reveal reveal-delay-2 mt-9 max-w-3xl space-y-5 text-base leading-7 text-[#A6A39A] sm:text-lg sm:leading-8">
                {content.hero.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {content.hero.note ? (
                <p className="eyebrow reveal reveal-delay-2 mt-8 text-[#C6A15B]">
                  {content.hero.note}
                </p>
              ) : null}
              <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <a
                  href={content.hero.primaryHref}
                  className="inline-flex justify-center rounded-full border border-[rgba(198,161,91,0.46)] bg-[#101214] px-6 py-3 text-sm font-medium text-[#F2EFE8] shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition hover:border-[#C6A15B] hover:bg-[#17191D]"
                >
                  {content.hero.primaryCta}
                </a>
                <a
                  href={content.hero.secondaryHref}
                  className="inline-flex justify-center rounded-full border border-[#2A2D33] px-6 py-3 text-sm font-medium text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.36)] hover:text-[#F2EFE8]"
                >
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>
            {content.hero.tags.length ? (
              <div className="eyebrow mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#2A2D33] pt-5 text-[#9B978E]">
                {content.hero.tags.map((tag, index) => (
                  <span key={tag} className="contents">
                    {index > 0 ? <span aria-hidden="true">/</span> : null}
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section
          id="thesis"
          className="border-y border-[#2A2D33] bg-[#101214] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div>
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {content.thesis.eyebrow}
                </p>
                <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  {content.thesis.title}
                </h2>
                {content.thesis.body ? (
                  <div className="mt-8 space-y-4 text-base leading-7 text-[#A6A39A] sm:text-lg sm:leading-8">
                    {content.thesis.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </div>
              <div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {content.thesis.points.map((item) => (
                    <div
                      key={item.title}
                      className="scroll-rise rounded-lg border border-[#2A2D33] bg-[#17191D]/55 p-5"
                    >
                      <p className="text-sm font-semibold leading-6 text-[#F2EFE8]">
                        {item.title}
                      </p>
                      {item.body ? (
                        <p className="mt-4 text-sm leading-6 text-[#A6A39A]">
                          {item.body}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
                {content.thesis.closing ? (
                  <div className="mt-8 max-w-3xl space-y-4 border-t border-[#2A2D33] pt-7 text-base leading-8 text-[#A6A39A]">
                    {content.thesis.closing.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {content.build ? (
          <section className="bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {content.build.eyebrow}
                </p>
                <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  {content.build.title}
                </h2>
              </div>
              <div className="space-y-5 border-l border-[#2A2D33] pl-6 text-base leading-8 text-[#A6A39A] sm:text-lg sm:leading-8">
                {content.build.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section
          id="companies"
          className="border-y border-[#2A2D33] bg-[#101214] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {content.companies.eyebrow}
                </p>
                <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  {content.companies.title}
                </h2>
              </div>
              <div className="max-w-xl space-y-4 text-base leading-7 text-[#A6A39A]">
                {content.companies.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            {content.companies.principles ? (
              <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {content.companies.principles.map((principle) => (
                  <div
                    key={principle}
                    className="scroll-rise rounded-lg border border-[#2A2D33] bg-[#17191D]/55 p-5"
                  >
                    <p className="text-sm font-medium leading-6 text-[#F2EFE8]">
                      {principle}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {content.companies.items.map((company) => (
                <CompanyCard
                  key={company.title}
                  {...company}
                  visitLabel={content.companies.visitLabel}
                  externalLinkLabel={content.companies.externalLinkLabel}
                  detailsLabel={content.companies.detailsLabel}
                  useCasesLabel={content.companies.useCasesLabel}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="model"
          className="bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5 text-[#C6A15B]">
                {content.model.eyebrow}
              </p>
              <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                {content.model.title}
              </h2>
            </div>
            <OperatingFlow steps={content.model.steps} />
          </div>
        </section>

        <section className="border-y border-[#2A2D33] bg-[#101214] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-5 text-[#C6A15B]">
                {content.architecture.eyebrow}
              </p>
              <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                {content.architecture.title}
              </h2>
              {content.architecture.body ? (
                <div className="mx-auto mt-8 max-w-2xl space-y-4 text-base leading-7 text-[#A6A39A]">
                  {content.architecture.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </div>
            {content.architecture.questions ? (
              <div className="mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-3">
                {content.architecture.questions.map((question) => (
                  <div
                    key={question}
                    className="scroll-rise rounded-lg border border-[#2A2D33] bg-[#17191D]/55 p-5 text-sm leading-6 text-[#F2EFE8]"
                  >
                    {question}
                  </div>
                ))}
              </div>
            ) : null}
            {content.architecture.closing ? (
              <p className="mx-auto mt-8 max-w-3xl border-t border-[#2A2D33] pt-6 text-center text-sm leading-7 text-[#A6A39A]">
                {content.architecture.closing}
              </p>
            ) : null}
            <div className="mt-16">
              <div className="architecture-card mx-auto max-w-xs rounded-lg border border-[rgba(198,161,91,0.22)] bg-[#17191D] p-6 text-center shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
                <p className="text-2xl font-semibold text-[#F2EFE8]">Xentra</p>
                <p className="mt-3 text-sm text-[#A6A39A]">
                  {content.architecture.parentLabel}
                </p>
              </div>
              <div
                className="architecture-line mx-auto h-12 w-px bg-[rgba(198,161,91,0.26)]"
                aria-hidden="true"
              />
              <div
                className="architecture-line mx-auto hidden h-px max-w-4xl bg-[rgba(198,161,91,0.2)] md:block"
                aria-hidden="true"
              />
              <div className="grid gap-4 md:grid-cols-3">
                {content.companies.items.map((company) => {
                  const tone =
                    architectureAccent[
                      company.slug as keyof typeof architectureAccent
                    ] ?? architectureAccent.default;

                  return (
                    <div
                      key={`${company.slug}-architecture`}
                      className="architecture-node flex flex-col items-center"
                    >
                      <div
                        className="architecture-line h-8 w-px bg-[rgba(198,161,91,0.2)]"
                        aria-hidden="true"
                      />
                      <a
                        href={company.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${content.companies.visitLabel}: ${company.title} (${content.companies.externalLinkLabel})`}
                        className={`group w-full rounded-lg border ${tone.border} bg-[#17191D]/55 p-6 text-center transition duration-300 hover:-translate-y-1 ${tone.hoverBorder} hover:bg-[#17191D]`}
                      >
                        <p className="text-xl font-semibold text-[#F2EFE8]">
                          {company.title}
                        </p>
                        <p className="mt-3 text-sm text-[#A6A39A]">
                          {company.architecture ?? company.vertical}
                        </p>
                        <p
                          className={`mt-5 inline-flex items-center gap-1.5 text-xs font-medium ${tone.text} transition group-hover:text-[#F2EFE8]`}
                        >
                          {content.companies.visitLabel}
                          <span aria-hidden="true">&#8599;</span>
                        </p>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {content.directions ? (
          <section className="bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {content.directions.eyebrow}
                </p>
                <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  {content.directions.title}
                </h2>
                <div className="mt-8 space-y-4 text-base leading-7 text-[#A6A39A] sm:text-lg sm:leading-8">
                  {content.directions.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {content.directions.signals.map((signal) => (
                  <div
                    key={signal}
                    className="scroll-rise rounded-lg border border-[#2A2D33] bg-[#17191D]/55 p-5"
                  >
                    <p className="text-sm font-medium leading-6 text-[#F2EFE8]">
                      {signal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section
          id="contact"
          className="border-t border-[#2A2D33] bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="rounded-lg border border-[rgba(198,161,91,0.24)] bg-[#101214] p-8 shadow-[0_34px_120px_rgba(0,0,0,0.34)] sm:p-10 lg:p-14">
              <div className="grid gap-14 lg:grid-cols-[1fr_0.72fr] lg:items-end">
                <h2 className="font-serif text-balance text-5xl font-normal leading-[0.98] sm:text-7xl lg:text-8xl">
                  {content.contact.title}
                </h2>
                <div className="max-w-lg text-sm leading-7 text-[#A6A39A]">
                  {content.contact.body ? (
                    <div className="mb-8 space-y-4 text-base leading-7">
                      {content.contact.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  <p className="eyebrow mb-3 text-[#8E7445]">
                    {content.contact.bodyPrefix}
                  </p>
                  <ContactActions
                    email={content.contact.ctaLabel ?? content.contact.email}
                    mailto={content.contact.mailto}
                    copyLabel={content.contact.copyLabel}
                    copiedLabel={content.contact.copiedLabel}
                    copyErrorLabel={content.contact.copyErrorLabel}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#070809] px-5 py-10 text-[#9B978E] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-[#2A2D33] pt-8 lg:flex-row">
          <p className="text-sm leading-6 text-[#A6A39A]">
            {content.footer.line}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {content.companies.items.map((company) => (
              <a
                key={`${company.slug}-footer`}
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${company.title} (${content.companies.externalLinkLabel})`}
                className="inline-flex items-center gap-1.5 text-sm transition hover:text-[#F2EFE8]"
              >
                {company.title}
                <span aria-hidden="true" className="text-[#8E7445]">&#8599;</span>
              </a>
            ))}
            <a
              href={content.contact.mailto}
              className="text-sm transition hover:text-[#F2EFE8]"
            >
              {content.contact.email}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
