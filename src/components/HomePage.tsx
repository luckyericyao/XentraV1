import { CompanyCard } from "@/components/CompanyCard";
import { DecisionGraph } from "@/components/DecisionGraph";
import { Header } from "@/components/Header";
import { OperatingFlow } from "@/components/OperatingFlow";
import { siteContent } from "@/lib/content";
import type { Locale } from "@/lib/content";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const content = siteContent[locale];

  return (
    <>
      <Header
        navItems={content.navItems}
        languageSwitch={content.languageSwitch}
      />
      <main
        id="top"
        lang={content.lang}
        className={locale === "zh" ? "cjk" : undefined}
      >
        <section className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-[#0B0D10] px-5 py-20 text-[#F3EEE5] sm:px-8 lg:py-28">
          <div className="hero-color-field" aria-hidden="true" />
          <DecisionGraph />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
            <div className="max-w-7xl">
              <p className="eyebrow reveal mb-8 text-[#8FA7C0]">
                {content.hero.eyebrow}
              </p>
              <h1 className="hero-title reveal reveal-delay-1 max-w-6xl text-balance">
                {content.hero.title}
              </h1>
              <p className="reveal reveal-delay-2 mt-9 max-w-2xl text-base leading-7 text-[#A6AFB8] sm:text-lg sm:leading-8">
                {content.hero.body}
              </p>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#companies"
                  className="inline-flex justify-center rounded-full bg-[#F3EEE5] px-6 py-3 text-sm font-medium text-[#0B0D10] transition hover:bg-[#E6DED1]"
                >
                  {content.hero.companiesCta}
                </a>
                <a
                  href="#contact"
                  className="inline-flex justify-center rounded-full border border-[rgba(255,255,255,0.12)] px-6 py-3 text-sm font-medium text-[#F3EEE5] transition hover:border-[#B7C4D3] hover:text-[#B7C4D3]"
                >
                  {content.hero.contactCta}
                </a>
              </div>
            </div>
            <div className="eyebrow mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-[rgba(255,255,255,0.08)] pt-5 text-[#6E7680]">
              {content.hero.tags.map((tag, index) => (
                <span key={tag} className="contents">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thesis"
          className="border-y border-[rgba(255,255,255,0.08)] bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#8FA7C0]">
                  {content.thesis.eyebrow}
                </p>
                <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                  {content.thesis.title}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {content.thesis.points.map((item) => (
                  <div
                    key={item.title}
                    className="scroll-rise rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-5"
                  >
                    <p className="text-sm font-semibold text-[#F3EEE5]">
                      {item.title}
                    </p>
                    {item.body ? (
                      <p className="mt-4 text-sm leading-6 text-[#A6AFB8]">
                        {item.body}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="companies"
          className="bg-[#0B0D10] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#8FA7C0]">
                  {content.companies.eyebrow}
                </p>
                <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                  {content.companies.title}
                </h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-[#A6AFB8]">
                {content.companies.body}
              </p>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {content.companies.items.map((company) => (
                <CompanyCard
                  key={company.title}
                  {...company}
                  visitLabel={content.companies.visitLabel}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[rgba(255,255,255,0.08)] bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-5 text-[#8FA7C0]">
                {content.architecture.eyebrow}
              </p>
              <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                {content.architecture.title}
              </h2>
            </div>
            <div className="mt-16">
              <div className="architecture-card mx-auto max-w-xs rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#161B21] p-6 text-center shadow-[0_30px_90px_rgba(11,13,16,0.22)]">
                <p className="text-2xl font-semibold text-[#F3EEE5]">Xentra</p>
                <p className="mt-3 text-sm text-[#A6AFB8]">
                  {content.architecture.parentLabel}
                </p>
              </div>
              <div
                className="architecture-line mx-auto h-12 w-px bg-[rgba(183,196,211,0.26)]"
                aria-hidden="true"
              />
              <div
                className="architecture-line mx-auto hidden h-px max-w-4xl bg-[rgba(183,196,211,0.2)] md:block"
                aria-hidden="true"
              />
              <div className="grid gap-4 md:grid-cols-3">
                {content.companies.items.map((company) => (
                  <div
                    key={`${company.slug}-architecture`}
                    className="architecture-node flex flex-col items-center"
                  >
                    <div
                      className="architecture-line h-8 w-px bg-[rgba(183,196,211,0.2)]"
                      aria-hidden="true"
                    />
                    <a
                      href={company.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[rgba(183,196,211,0.26)] hover:bg-white/[0.045]"
                    >
                      <p className="text-xl font-semibold text-[#F3EEE5]">
                        {company.title}
                      </p>
                      <p className="mt-3 text-sm text-[#A6AFB8]">
                        {company.vertical}
                      </p>
                      <p className="mt-5 text-xs font-medium text-[#B7C4D3] transition group-hover:text-[#F3EEE5]">
                        {content.companies.visitLabel}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="model"
          className="bg-[#0B0D10] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5 text-[#8FA7C0]">
                {content.model.eyebrow}
              </p>
              <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                {content.model.title}
              </h2>
            </div>
            <OperatingFlow steps={content.model.steps} />
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-[rgba(255,255,255,0.08)] bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[1fr_0.65fr] lg:items-end">
              <h2 className="font-serif text-balance text-6xl font-normal leading-[0.98] sm:text-8xl">
                {content.contact.title}
              </h2>
              <div className="max-w-md text-sm leading-7 text-[#A6AFB8]">
                <p>
                  {content.contact.bodyPrefix}{" "}
                  <a
                    href="mailto:contact@xentra.ai"
                    className="text-[#F3EEE5] transition hover:text-[#B7C4D3]"
                  >
                    contact@xentra.ai
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B0D10] px-5 py-10 text-[#6E7680] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-[rgba(255,255,255,0.08)] pt-8 lg:flex-row">
          <p className="text-sm leading-6 text-[#A6AFB8]">
            {content.footer.line}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {content.companies.items.map((company) => (
              <a
                key={`${company.slug}-footer`}
                href={company.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm transition hover:text-[#F3EEE5]"
              >
                {company.title}
              </a>
            ))}
            <a
              href="mailto:contact@xentra.ai"
              className="text-sm transition hover:text-[#F3EEE5]"
            >
              contact@xentra.ai
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
