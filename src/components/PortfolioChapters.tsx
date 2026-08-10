import Image from "next/image";
import type { Company, SiteContent } from "@/lib/content";

type PortfolioChaptersProps = {
  companies: Company[];
  copy: SiteContent["portfolio"];
  visitLabel: string;
  externalLinkLabel: string;
};

const chapterTone = {
  "ai-agent-coach": {
    tone: "steel",
    label: "text-[#A7B3C3]",
    border: "border-[rgba(167,179,195,0.3)]",
    dot: "bg-[#A7B3C3]",
    hover: "hover:border-[#A7B3C3]",
  },
  localhost: {
    tone: "brass",
    label: "text-[#C6A15B]",
    border: "border-[rgba(198,161,91,0.32)]",
    dot: "bg-[#C6A15B]",
    hover: "hover:border-[#C6A15B]",
  },
  bioaxis: {
    tone: "sage",
    label: "text-[#9AA797]",
    border: "border-[rgba(154,167,151,0.3)]",
    dot: "bg-[#9AA797]",
    hover: "hover:border-[#9AA797]",
  },
} as const;

const defaultTone = chapterTone.localhost;

export function PortfolioChapters({
  companies,
  copy,
  visitLabel,
  externalLinkLabel,
}: PortfolioChaptersProps) {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="border-b border-[#2A2D33] bg-[#070809] text-[#F2EFE8]"
    >
      <div className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow mb-5 text-[#C6A15B]">{copy.eyebrow}</p>
              <h2
                id="portfolio-title"
                className="max-w-4xl text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
              >
                {copy.title}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#A6A39A] sm:text-lg sm:leading-8">
              {copy.body}
            </p>
          </div>

          <div className="mt-14 sm:mt-16">
            <div className="scroll-rise grid border-y border-[#2A2D33] lg:grid-cols-[0.78fr_1.22fr]">
              <div className="flex min-h-48 flex-col justify-between border-b border-[#2A2D33] py-7 lg:border-b-0 lg:border-r lg:p-8">
                <p className="eyebrow text-[#B49459]">{copy.systemLabel}</p>
                <div className="mt-12">
                  <p className="font-serif text-4xl font-normal leading-none text-[#F2EFE8] sm:text-5xl">
                    Xentra
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-[#A6A39A]">
                    {copy.systemBody}
                  </p>
                </div>
              </div>
              <ol className="grid sm:grid-cols-2">
                {copy.systemItems.map((item, index) => (
                  <li
                    key={item.title}
                    className="group-capability min-h-40 border-b border-[#2A2D33] py-6 last:border-b-0 sm:p-7 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-semibold text-[#F2EFE8]">
                        {item.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="text-[11px] tabular-nums text-[#8D97A5]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-[#A6A39A]">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div
              aria-hidden="true"
              className="group-architecture-lines scroll-rise relative mx-auto hidden h-16 w-2/3 sm:block"
            >
              <span className="absolute left-1/2 top-0 h-8 w-px bg-[#2A2D33]" />
              <span className="absolute left-1/6 right-1/6 top-8 h-px bg-[#2A2D33]" />
              <span className="absolute bottom-0 left-1/6 top-8 w-px bg-[#2A2D33]" />
              <span className="absolute bottom-0 left-1/2 top-8 w-px bg-[#2A2D33]" />
              <span className="absolute bottom-0 right-1/6 top-8 w-px bg-[#2A2D33]" />
            </div>

            <div className="scroll-rise border-y border-[#2A2D33] sm:grid sm:grid-cols-3">
              {companies.map((company) => {
                const tone =
                  chapterTone[company.slug as keyof typeof chapterTone] ??
                  defaultTone;

                return (
                  <a
                    key={`${company.slug}-architecture`}
                    href={`#${company.slug}-chapter`}
                    className="group flex min-h-40 flex-col justify-between border-b border-[#2A2D33] py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:p-6 sm:last:border-r-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className={`eyebrow ${tone.label}`}>
                        {copy.companyRoleLabel}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`size-1.5 rounded-full ${tone.dot}`}
                      />
                    </div>
                    <div className="mt-9">
                      <h3 className="text-xl font-semibold text-[#F2EFE8] transition group-hover:text-[#C6A15B]">
                        {company.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#A6A39A]">
                        {copy.companyRole}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div>
        {companies.map((company, index) => {
          const tone =
            chapterTone[company.slug as keyof typeof chapterTone] ?? defaultTone;
          const previousCompany = companies[index - 1];
          const nextCompany = companies[index + 1];
          const previousHref = previousCompany
            ? `#${previousCompany.slug}-chapter`
            : "#portfolio";
          const nextHref = nextCompany ? `#${nextCompany.slug}-chapter` : "#model";
          const previousLabel = previousCompany
            ? copy.previousLabel
            : copy.backLabel;
          const previousTitle = previousCompany?.title ?? "Xentra";
          const nextLabel = nextCompany ? copy.nextLabel : copy.modelLabel;
          const nextTitle = nextCompany?.title ?? copy.modelLabel;

          return (
            <article
              key={`${company.slug}-chapter`}
              id={`${company.slug}-chapter`}
              data-portfolio-tone={tone.tone}
              aria-labelledby={`${company.slug}-chapter-title`}
              className="portfolio-chapter relative isolate overflow-hidden border-t border-[#2A2D33] px-5 py-16 sm:px-8 sm:py-24 lg:flex lg:min-h-[100svh] lg:flex-col lg:items-center lg:py-32"
            >
              <div className="portfolio-chapter-field" aria-hidden="true" />
              <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 sm:gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:items-center xl:gap-20">
                <div className="portfolio-chapter-copy lg:sticky lg:top-28 lg:self-start">
                  <div className="flex items-center gap-4">
                    <span
                      className={`eyebrow ${tone.label}`}
                    >
                      {company.vertical}
                    </span>
                    <span className="h-px flex-1 bg-[#2A2D33]" aria-hidden="true" />
                    <span className="text-xs tabular-nums text-[#8D97A5]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3
                    id={`${company.slug}-chapter-title`}
                    className="mt-6 text-balance text-4xl font-semibold leading-tight sm:mt-8 sm:text-5xl"
                  >
                    {company.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-pretty text-xl leading-8 text-[#F2EFE8] sm:mt-5 sm:text-2xl sm:leading-9">
                    {company.headline}
                  </p>
                  {company.body?.[0] ? (
                    <p className="mt-4 max-w-xl text-base leading-7 text-[#A6A39A] sm:mt-6">
                      {company.body[0]}
                    </p>
                  ) : null}

                  <dl className="mt-7 border-y border-[#2A2D33] sm:mt-9">
                    {[
                      [copy.audienceLabel, company.evidence.audience],
                      [copy.decisionLabel, company.evidence.decision],
                      [copy.deliveryLabel, company.evidence.delivery],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="grid gap-2 border-b border-[#2A2D33] py-5 last:border-b-0 sm:grid-cols-[6rem_1fr]"
                      >
                        <dt className={`eyebrow pt-1 ${tone.label}`}>{label}</dt>
                        <dd className="text-sm leading-6 text-[#A6A39A]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${visitLabel}: ${company.title} (${externalLinkLabel})`}
                    className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-md border ${tone.border} px-5 text-sm font-medium text-[#F2EFE8] transition ${tone.hover} hover:bg-[#17191D] sm:mt-8`}
                  >
                    {visitLabel}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>

                <figure className="portfolio-evidence overflow-hidden rounded-lg border border-[rgba(242,239,232,0.12)] bg-[#0A0B0C] shadow-[0_32px_120px_rgba(0,0,0,0.36)]">
                  <figcaption className="flex min-h-12 items-center justify-between gap-4 border-b border-[rgba(242,239,232,0.1)] px-4 sm:px-5">
                    <span className="text-xs font-medium text-[#A6A39A]">
                      {copy.evidenceLabel}
                    </span>
                    <span className="flex flex-col items-end gap-1 text-[10px] font-medium leading-none text-[#A6A39A] sm:text-[11px]">
                      <span className="flex items-center gap-2">
                        <span
                          className={`size-1.5 rounded-full ${tone.dot}`}
                          aria-hidden="true"
                        />
                        {company.title}
                      </span>
                      <span className="text-[9px] font-normal text-[#8D97A5] sm:text-[10px]">
                        {copy.evidenceVerifiedLabel}
                      </span>
                    </span>
                  </figcaption>
                  <a
                    href={company.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${visitLabel}: ${company.title} (${externalLinkLabel})`}
                    className="group block overflow-hidden"
                  >
                    <Image
                      src={company.evidence.image}
                      alt={company.evidence.imageAlt}
                      width={1440}
                      height={900}
                      sizes="(max-width: 1023px) 100vw, 62vw"
                      className="aspect-[8/5] h-auto w-full object-cover transition duration-700 group-hover:scale-[1.012]"
                    />
                  </a>
                  <div className="border-t border-[rgba(242,239,232,0.1)]">
                    <ul
                      aria-label={copy.proofLabel}
                      className="grid sm:grid-cols-3"
                    >
                      {company.evidence.proof.map((item) => (
                        <li
                          key={item.label}
                          className="border-b border-[rgba(242,239,232,0.1)] last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                        >
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.label} (${externalLinkLabel})`}
                            className="group/proof flex min-h-16 w-full items-center gap-3 px-4 py-3 text-xs leading-5 text-[#A6A39A] transition hover:text-[#F2EFE8] sm:px-5"
                          >
                            <span
                              aria-hidden="true"
                              className={`size-1.5 shrink-0 rounded-full ${tone.dot}`}
                            />
                            <span className="min-w-0 flex-1">{item.label}</span>
                            <span
                              aria-hidden="true"
                              className="text-[#8D97A5] transition group-hover/proof:text-[#C6A15B]"
                            >
                              &#8599;
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </figure>
              </div>
              <nav
                aria-label={copy.chapterNavLabel}
                className="relative z-10 mx-auto mt-12 flex w-full max-w-7xl items-stretch justify-between gap-6 border-t border-[#2A2D33] pt-5 sm:mt-16 sm:pt-6"
              >
                <a
                  href={previousHref}
                  className="group flex min-h-11 max-w-[48%] flex-col justify-center text-left"
                >
                  <span className={`eyebrow ${tone.label}`}>
                    <span aria-hidden="true" className="mr-2">
                      &#8592;
                    </span>
                    {previousLabel}
                  </span>
                  <span className="mt-2 text-sm text-[#A6A39A] transition group-hover:text-[#F2EFE8]">
                    {previousTitle}
                  </span>
                </a>
                <a
                  href={nextHref}
                  className="group flex min-h-11 max-w-[48%] flex-col justify-center text-right"
                >
                  <span className={`eyebrow ${tone.label}`}>
                    {nextLabel}
                    <span aria-hidden="true" className="ml-2">
                      &#8594;
                    </span>
                  </span>
                  <span className="mt-2 text-sm text-[#A6A39A] transition group-hover:text-[#F2EFE8]">
                    {nextTitle}
                  </span>
                </a>
              </nav>
            </article>
          );
        })}
      </div>
    </section>
  );
}
