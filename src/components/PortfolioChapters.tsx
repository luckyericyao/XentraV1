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

          <div className="mt-12 border-y border-[#2A2D33] lg:grid lg:grid-cols-[1.15fr_repeat(4,1fr)]">
            <p className="flex min-h-16 items-center border-b border-[#2A2D33] py-4 text-sm font-semibold text-[#F2EFE8] lg:border-b-0 lg:border-r lg:px-5">
              Xentra
              <span className="ml-3 text-xs font-medium text-[#B49459]">
                {copy.systemLabel}
              </span>
            </p>
            {copy.systemItems.map((item, index) => (
              <p
                key={item}
                className="flex min-h-16 items-center border-b border-[#2A2D33] py-4 text-sm leading-6 text-[#A6A39A] last:border-b-0 lg:border-b-0 lg:border-r lg:px-5 lg:last:border-r-0"
              >
                <span
                  aria-hidden="true"
                  className="mr-3 text-[11px] tabular-nums text-[#8D97A5]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        {companies.map((company, index) => {
          const tone =
            chapterTone[company.slug as keyof typeof chapterTone] ?? defaultTone;

          return (
            <article
              key={`${company.slug}-chapter`}
              id={`${company.slug}-chapter`}
              data-portfolio-tone={tone.tone}
              aria-labelledby={`${company.slug}-chapter-title`}
              className="portfolio-chapter relative isolate overflow-hidden border-t border-[#2A2D33] px-5 py-16 sm:px-8 sm:py-24 lg:flex lg:min-h-[100svh] lg:items-center lg:py-32"
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
                    className={`mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border ${tone.border} px-5 text-sm font-medium text-[#F2EFE8] transition ${tone.hover} hover:bg-[#17191D] sm:mt-8`}
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
                    <span className="flex items-center gap-2 text-[11px] font-medium text-[#A6A39A]">
                      <span
                        className={`size-1.5 rounded-full ${tone.dot}`}
                        aria-hidden="true"
                      />
                      {company.title}
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
                </figure>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
