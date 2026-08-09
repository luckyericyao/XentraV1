import { CompanyCard } from "@/components/CompanyCard";
import { ContactActions } from "@/components/ContactActions";
import { DecisionGraph } from "@/components/DecisionGraph";
import { Header } from "@/components/Header";
import { OperatingFlow } from "@/components/OperatingFlow";
import { PortfolioChapters } from "@/components/PortfolioChapters";
import { StructuredData } from "@/components/StructuredData";
import { siteContent } from "@/lib/content";
import type { Locale } from "@/lib/content";

type HomePageProps = {
  locale: Locale;
};

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
        <section
          aria-labelledby="hero-title"
          className={`relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-[#070809] px-5 py-20 text-[#F2EFE8] sm:px-8 lg:py-28 ${locale === "zh" ? "cjk-hero" : ""}`}
        >
          <div className="hero-color-field" aria-hidden="true" />
          <DecisionGraph />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
            <div className="max-w-6xl">
              <p
                className={`eyebrow reveal text-[#C6A15B] ${locale === "zh" ? "mb-5 lg:mb-6" : "mb-8"}`}
              >
                {content.hero.eyebrow}
              </p>
              <h1
                id="hero-title"
                className="hero-title reveal reveal-delay-1 max-w-5xl text-balance"
              >
                {content.hero.title}
              </h1>
              {content.hero.subtitle ? (
                <p
                  className={`reveal reveal-delay-2 max-w-4xl text-pretty text-2xl font-medium text-[#F2EFE8] sm:text-3xl sm:leading-10 ${locale === "zh" ? "mt-5 leading-8" : "mt-7 leading-8"}`}
                >
                  {content.hero.subtitle}
                </p>
              ) : null}
              <div
                className={`reveal reveal-delay-2 max-w-3xl text-[#A6A39A] ${locale === "zh" ? "mt-6 space-y-3 text-[15px] leading-6 sm:text-base sm:leading-7" : "mt-9 space-y-5 text-base leading-7 sm:text-lg sm:leading-8"}`}
              >
                {content.hero.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {content.hero.note ? (
                <p
                  className={`eyebrow reveal reveal-delay-2 text-[#C6A15B] ${locale === "zh" ? "mt-5" : "mt-8"}`}
                >
                  {content.hero.note}
                </p>
              ) : null}
              <div
                className={`flex flex-col gap-3 sm:flex-row ${locale === "zh" ? "mt-7 lg:mt-8" : "mt-11"}`}
              >
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
          aria-labelledby="thesis-title"
          className="border-y border-[#2A2D33] bg-[#101214] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div>
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {content.thesis.eyebrow}
                </p>
                <h2
                  id="thesis-title"
                  className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
                >
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
          <section
            id="build"
            aria-labelledby="build-title"
            className="bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
          >
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {content.build.eyebrow}
                </p>
                <h2
                  id="build-title"
                  className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
                >
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
          aria-labelledby="companies-title"
          className="border-y border-[#2A2D33] bg-[#101214] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {content.companies.eyebrow}
                </p>
                <h2
                  id="companies-title"
                  className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
                >
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
              {content.companies.items.map((company, index) => (
                <CompanyCard
                  key={company.title}
                  index={index}
                  {...company}
                  chapterHref={`#${company.slug}-chapter`}
                  chapterLabel={content.companies.chapterLabel}
                  visitLabel={content.companies.visitLabel}
                  externalLinkLabel={content.companies.externalLinkLabel}
                  detailsLabel={content.companies.detailsLabel}
                  useCasesLabel={content.companies.useCasesLabel}
                />
              ))}
            </div>
          </div>
        </section>

        <PortfolioChapters
          companies={content.companies.items}
          copy={content.portfolio}
          visitLabel={content.companies.visitLabel}
          externalLinkLabel={content.companies.externalLinkLabel}
        />

        <section
          id="model"
          aria-labelledby="model-title"
          className="bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5 text-[#C6A15B]">
                {content.model.eyebrow}
              </p>
              <h2
                id="model-title"
                className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
              >
                {content.model.title}
              </h2>
            </div>
            <OperatingFlow steps={content.model.steps} />
          </div>
        </section>

        {content.directions ? (
          <section
            id="directions"
            aria-labelledby="directions-title"
            className="bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
          >
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="eyebrow mb-5 text-[#C6A15B]">
                  {content.directions.eyebrow}
                </p>
                <h2
                  id="directions-title"
                  className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
                >
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
          aria-labelledby="contact-title"
          className="border-t border-[#2A2D33] bg-[#070809] px-5 py-24 text-[#F2EFE8] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="rounded-lg border border-[rgba(198,161,91,0.24)] bg-[#101214] p-8 shadow-[0_34px_120px_rgba(0,0,0,0.34)] sm:p-10 lg:p-14">
              <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="eyebrow mb-5 text-[#B49459]">
                    {content.contact.eyebrow}
                  </p>
                  <h2
                    id="contact-title"
                    className="font-serif text-balance text-5xl font-normal leading-[0.98] sm:text-6xl lg:text-7xl"
                  >
                    {content.contact.title}
                  </h2>
                  {content.contact.body ? (
                    <div className="mt-7 max-w-lg space-y-4 text-base leading-7 text-[#A6A39A]">
                      {content.contact.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div>
                  <p
                    id="contact-pathways-title"
                    className="eyebrow text-[#B49459]"
                  >
                    {content.contact.pathwaysLabel}
                  </p>
                  <div
                    role="group"
                    aria-labelledby="contact-pathways-title"
                    className="mt-5 border-y border-[#2A2D33]"
                  >
                    {content.contact.pathways.map((pathway, index) => (
                      <a
                        key={pathway.title}
                        href={pathway.mailto}
                        className="group grid min-h-28 grid-cols-[1fr_auto] items-center gap-x-5 gap-y-3 border-b border-[#2A2D33] py-5 last:border-b-0 sm:grid-cols-[8.5rem_1fr_auto] sm:py-6"
                      >
                        <span className="eyebrow col-span-2 text-[#8D97A5] transition group-hover:text-[#C6A15B] sm:col-span-1">
                          {String(index + 1).padStart(2, "0")} / {pathway.audience}
                        </span>
                        <span className="min-w-0">
                          <h3 className="text-lg font-semibold text-[#F2EFE8] sm:text-xl">
                            {pathway.title}
                          </h3>
                          <span className="mt-2 block text-sm leading-6 text-[#A6A39A]">
                            {pathway.body}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-lg text-[#B49459] transition duration-300 group-hover:translate-x-1 group-hover:text-[#C6A15B]"
                        >
                          &#8599;
                        </span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-9 grid gap-8 border-t border-[#2A2D33] pt-8 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow mb-4 text-[#B49459]">
                        {content.contact.bodyPrefix}
                      </p>
                      <ContactActions
                        email={content.contact.email}
                        emailLabel={content.contact.ctaLabel}
                        mailto={content.contact.mailto}
                        copyLabel={content.contact.copyLabel}
                        copiedLabel={content.contact.copiedLabel}
                        copyErrorLabel={content.contact.copyErrorLabel}
                      />
                    </div>
                    <div>
                      <p className="eyebrow mb-3 text-[#B49459]">
                        {content.contact.companiesLabel}
                      </p>
                      <div className="grid">
                        {content.companies.items.map((company) => (
                          <a
                            key={`${company.slug}-contact`}
                            href={company.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${company.title} (${content.companies.externalLinkLabel})`}
                            className="group inline-flex min-h-11 items-center justify-between border-b border-[#2A2D33] text-sm text-[#A6A39A] transition last:border-b-0 hover:text-[#F2EFE8]"
                          >
                            {company.title}
                            <span
                              aria-hidden="true"
                              className="text-[#B49459] transition group-hover:translate-x-1"
                            >
                              &#8599;
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
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
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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
                <span aria-hidden="true" className="text-[#B49459]">&#8599;</span>
              </a>
            ))}
            <a
              href={content.contact.mailto}
              className="text-sm transition hover:text-[#F2EFE8]"
            >
              {content.contact.email}
            </a>
            <a
              href={content.footer.privacyHref}
              className="text-sm transition hover:text-[#F2EFE8]"
            >
              {content.footer.privacyLabel}
            </a>
            <a
              href="#top"
              aria-label={content.footer.backToTopLabel}
              title={content.footer.backToTopLabel}
              className="inline-flex size-11 items-center justify-center rounded-full border border-[#2A2D33] text-base text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.46)] hover:text-[#F2EFE8]"
            >
              <span aria-hidden="true">&#8593;</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
