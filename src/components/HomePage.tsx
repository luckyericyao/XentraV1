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
          className={`relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-[#070809] px-5 py-20 text-[#F2EFE8] sm:px-8 lg:py-20 ${locale === "zh" ? "cjk-hero" : ""}`}
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
                {content.hero.titleLines
                  ? content.hero.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))
                  : content.hero.title}
              </h1>
              {content.hero.subtitle ? (
                <p
                  className={`reveal reveal-delay-2 max-w-4xl text-pretty text-2xl font-medium text-[#F2EFE8] sm:text-3xl sm:leading-10 ${locale === "zh" ? "cjk-hero-subtitle mt-5 leading-8" : "mt-7 leading-8"}`}
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
                  className="inline-flex justify-center rounded-md border border-[rgba(198,161,91,0.46)] bg-[#101214] px-6 py-3 text-sm font-medium text-[#F2EFE8] shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition hover:border-[#C6A15B] hover:bg-[#17191D]"
                >
                  {content.hero.primaryCta}
                </a>
                <a
                  href={content.hero.secondaryHref}
                  className="inline-flex justify-center rounded-md border border-[#2A2D33] px-6 py-3 text-sm font-medium text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.36)] hover:text-[#F2EFE8]"
                >
                  {content.hero.secondaryCta}
                </a>
              </div>
            </div>
            <div className="hero-register mt-8 border-t border-[#2A2D33] pt-5 lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-8">
              <div className="grid grid-cols-3 gap-4">
                {content.hero.ledger.map((item) => (
                  <div key={item.label} className="min-w-0">
                    <p className="font-serif text-2xl font-normal leading-none text-[#F2EFE8] sm:text-3xl">
                      {item.value}
                    </p>
                    <p className="mt-2 max-w-[12rem] text-[10px] font-semibold uppercase leading-4 tracking-[0.12em] text-[#8D97A5] sm:text-[11px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              {content.hero.tags.length ? (
                <div className="eyebrow mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[#9B978E] lg:mt-0 lg:max-w-lg lg:justify-end lg:border-l lg:border-[#2A2D33] lg:pl-6 lg:pt-1">
                  {content.hero.tags.map((tag, index) => (
                    <span key={tag} className="contents">
                      {index > 0 ? <span aria-hidden="true">/</span> : null}
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
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
                <ol className="border-y border-[#2A2D33]">
                  {content.thesis.points.map((item, index) => (
                    <li
                      key={item.title}
                      className="scroll-rise grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#2A2D33] py-5 last:border-b-0 sm:grid-cols-[3.5rem_1fr] sm:py-6"
                    >
                      <span className="eyebrow pt-1 text-[#B49459]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-base font-semibold leading-6 text-[#F2EFE8]">
                          {item.title}
                        </p>
                        {item.body ? (
                          <p className="mt-3 text-sm leading-6 text-[#A6A39A]">
                            {item.body}
                          </p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
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
            className="border-y border-[#2A2D33] bg-[#070809] px-5 py-14 text-[#F2EFE8] sm:px-8 sm:py-16 lg:py-20"
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
              <div>
                <p className="eyebrow mb-4 text-[#C6A15B]">
                  {content.build.eyebrow}
                </p>
                <h2
                  id="build-title"
                  aria-label={content.build.title}
                  className="max-w-xl text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
                >
                  {content.build.titleLines
                    ? content.build.titleLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))
                    : content.build.title}
                </h2>
              </div>
              <div className="border-l border-[#2A2D33] pl-5">
                <div className="grid gap-4 text-sm leading-7 text-[#A6A39A] sm:text-base sm:leading-7 lg:grid-cols-2 lg:gap-8">
                  {content.build.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {content.build.signature ? (
                  <div className="mt-6 flex flex-col gap-4 border-t border-[#2A2D33] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="eyebrow flex items-center gap-3 text-[#B49459]">
                      <span
                        aria-hidden="true"
                        className="block h-px w-8 bg-[#8E7445]"
                      />
                      <span>{content.build.signature}</span>
                    </p>
                    {content.build.letterLabel && content.build.letterHref ? (
                      <a
                        href={content.build.letterHref}
                        className="group inline-flex items-center gap-3 text-sm font-medium text-[#A6A39A] transition hover:text-[#F2EFE8]"
                      >
                        {content.build.letterLabel}
                        <span
                          aria-hidden="true"
                          className="text-[#B49459] transition group-hover:translate-x-1"
                        >
                          &#8594;
                        </span>
                      </a>
                    ) : null}
                  </div>
                ) : null}
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
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)] lg:items-end lg:gap-16">
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
                {content.companies.principles ? (
                  <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 text-[#8D97A5]">
                    {content.companies.principles.map((principle, index) => (
                      <span key={principle} className="contents">
                        {index > 0 ? (
                          <span aria-hidden="true" className="text-[#B49459]">
                            /
                          </span>
                        ) : null}
                        <span>{principle}</span>
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {content.companies.items.map((company, index) => (
                <CompanyCard
                  key={company.title}
                  index={index}
                  {...company}
                  chapterHref={`#${company.slug}-chapter`}
                  chapterLabel={content.companies.chapterLabel}
                  evidenceLabel={content.portfolio.evidenceLabel}
                  evidenceVerifiedLabel={content.portfolio.evidenceVerifiedLabel}
                  showSummary={false}
                  showDetails={false}
                  visitLabel={content.companies.visitLabel}
                  externalLinkLabel={content.companies.externalLinkLabel}
                  detailsLabel={content.companies.detailsLabel}
                  useCasesLabel={content.companies.useCasesLabel}
                />
              ))}
            </div>
            <div className="mt-8 grid gap-3 border-t border-[#2A2D33] pt-5 md:grid-cols-[auto_1fr] md:items-start md:gap-8">
              <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-[#8D97A5]">
                <span>{content.portfolio.evidenceLabel}</span>
                <span aria-hidden="true" className="text-[#B49459]">
                  /
                </span>
                <span>{content.portfolio.evidenceVerifiedLabel}</span>
              </p>
              <p className="max-w-2xl text-xs leading-5 text-[#8D97A5] md:justify-self-end md:text-right">
                {content.portfolio.evidenceNote}
              </p>
            </div>
          </div>
        </section>

        <PortfolioChapters
          companies={content.companies.items}
          copy={content.portfolio}
          chapterLabel={content.companies.chapterLabel}
          visitLabel={content.companies.visitLabel}
          externalLinkLabel={content.companies.externalLinkLabel}
        />

        <section
          id="model"
          aria-labelledby="model-title"
          className="bg-[#070809] px-5 py-20 text-[#F2EFE8] sm:px-8 sm:py-24 lg:py-28"
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

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="border-t border-[#2A2D33] bg-[#070809] px-5 py-20 text-[#F2EFE8] sm:px-8 sm:py-24 lg:py-28"
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
                    className="text-balance text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl"
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
                  {content.directions ? (
                    <div
                      id="directions"
                      className="mb-10 border-b border-[#2A2D33] pb-8"
                    >
                      <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
                        <div>
                          <p className="eyebrow mb-4 text-[#B49459]">
                            {content.directions.eyebrow}
                          </p>
                          <h3
                            id="directions-title"
                            className="text-balance text-2xl font-semibold leading-tight text-[#F2EFE8] sm:text-3xl"
                          >
                            {content.directions.title}
                          </h3>
                        </div>
                        <div className="space-y-3 text-sm leading-6 text-[#A6A39A]">
                          {content.directions.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                      <ol className="mt-7 grid border-t border-[#2A2D33] sm:grid-cols-5 sm:border-y">
                        {content.directions.signals.map((signal, index) => (
                          <li
                            key={signal}
                            className="scroll-rise grid grid-cols-[2.5rem_1fr] gap-3 border-b border-[#2A2D33] py-4 last:border-b-0 sm:grid-cols-1 sm:gap-5 sm:border-b-0 sm:border-r sm:p-4 sm:last:border-r-0"
                          >
                            <span className="eyebrow pt-1 text-[#B49459]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="text-sm font-medium leading-6 text-[#F2EFE8]">
                              {signal}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                  <p
                    id="contact-pathways-title"
                    className="eyebrow text-[#B49459]"
                  >
                    {content.contact.pathwaysLabel}
                  </p>
                  <p
                    id="contact-pathways-note"
                    className="mt-3 max-w-xl text-sm leading-6 text-[#8D97A5]"
                  >
                    {content.contact.intakeNote}
                  </p>
                  <div
                    role="group"
                    aria-labelledby="contact-pathways-title"
                    aria-describedby="contact-pathways-note"
                    className="mt-5 border-y border-[#2A2D33]"
                  >
                    {content.contact.pathways.map((pathway, index) => (
                      <div
                        key={pathway.title}
                        className="grid min-h-28 items-center gap-x-5 gap-y-3 border-b border-[#2A2D33] py-5 last:border-b-0 sm:grid-cols-[8.5rem_1fr] sm:py-6"
                      >
                        <span className="eyebrow text-[#8D97A5]">
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
                      </div>
                    ))}
                  </div>

                  <div className="mt-9 grid gap-8 border-t border-[#2A2D33] pt-8 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow mb-4 text-[#B49459]">
                        {content.contact.bodyPrefix}
                      </p>
                      <ContactActions
                        href={content.contact.contactHref}
                        label={content.contact.ctaLabel}
                        value={content.contact.contactValue}
                        note={content.contact.channelNote}
                        external={content.contact.contactExternal}
                        externalLinkLabel={content.contact.externalLinkLabel}
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
              href={content.footer.letterHref}
              className="text-sm transition hover:text-[#F2EFE8]"
            >
              {content.footer.letterLabel}
            </a>
            <a
              href={content.contact.contactHref}
              target={content.contact.contactExternal ? "_blank" : undefined}
              rel={
                content.contact.contactExternal
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label={
                content.contact.contactExternal
                  ? `${content.contact.ctaLabel} (${content.contact.externalLinkLabel})`
                  : content.contact.ctaLabel
              }
              className="inline-flex items-center gap-1.5 text-sm transition hover:text-[#F2EFE8]"
            >
              {content.contact.ctaLabel}
              <span aria-hidden="true" className="text-[#B49459]">
                &#8599;
              </span>
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
              className="inline-flex size-11 items-center justify-center rounded-md border border-[#2A2D33] text-base text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.46)] hover:text-[#F2EFE8]"
            >
              <span aria-hidden="true">&#8593;</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
