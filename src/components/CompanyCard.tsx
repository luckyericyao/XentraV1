type CompanyCardProps = {
  slug: string;
  title: string;
  vertical: string;
  layer?: string;
  headline: string;
  body?: string[];
  problem?: string;
  useCases?: string[];
  href: string;
  visitLabel: string;
  externalLinkLabel: string;
  detailsLabel: string;
};

const companyAccent = {
  "ai-agent-coach": "text-[#6F7782]",
  localhost: "text-[#C6A15B]",
  bioaxis: "text-[#7C8377]",
} as const;

export function CompanyCard({
  slug,
  title,
  vertical,
  layer,
  headline,
  body,
  problem,
  useCases,
  href,
  visitLabel,
  externalLinkLabel,
  detailsLabel,
}: CompanyCardProps) {
  const labelTone =
    companyAccent[slug as keyof typeof companyAccent] ?? "text-[#C6A15B]";

  return (
    <article
      id={slug}
      className="scroll-rise group flex flex-col rounded-lg border border-[#2A2D33] bg-[#17191D]/70 p-7 shadow-[0_18px_70px_rgba(0,0,0,0.18)] transition duration-500 hover:border-[rgba(198,161,91,0.28)] hover:bg-[#17191D] hover:shadow-[0_24px_90px_rgba(198,161,91,0.055)] sm:min-h-[24rem]"
    >
      <p className={`eyebrow ${labelTone}`}>{vertical}</p>
      <div className="mt-10 sm:mt-14">
        <h3 className="text-3xl font-semibold text-[#F2EFE8]">{title}</h3>
        {layer ? (
          <p className="mt-4 text-sm font-medium text-[#8E7445]">{layer}</p>
        ) : null}
      </div>
      <p className="mt-6 border-t border-[#2A2D33] pt-5 text-base leading-7 text-[#F2EFE8] sm:mt-8">
        {headline}
      </p>
      {body?.[0] ? (
        <p className="mt-4 text-sm leading-6 text-[#A6A39A] sm:leading-7">
          {body[0]}
        </p>
      ) : null}
      {body && body.length > 1 || useCases?.length || problem ? (
        <details className="mt-5 border-y border-[#2A2D33] py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-medium text-[#A6A39A] transition hover:text-[#F2EFE8]">
            <span>{detailsLabel}</span>
            <span aria-hidden="true" className="text-[#C6A15B]">+</span>
          </summary>
          {body && body.length > 1 ? (
            <div className="mt-4 space-y-3 border-t border-[#2A2D33] pt-4 text-sm leading-6 text-[#A6A39A] sm:leading-7">
              {body.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}
          {useCases?.length ? (
            <div className="mt-4 border-t border-[#2A2D33] pt-4">
              <p className="text-[11px] font-semibold text-[#9B978E]">适用场景</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {useCases.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(198,161,91,0.16)] px-3 py-1 text-xs text-[#A6A39A]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {problem ? (
            <p className="mt-4 border-t border-[#2A2D33] pt-4 text-sm leading-6 text-[#A6A39A]">
              {problem}
            </p>
          ) : null}
        </details>
      ) : null}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${visitLabel}: ${title} (${externalLinkLabel})`}
        className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-medium text-[#F2EFE8] transition hover:text-[#C6A15B] sm:pt-8"
      >
        {visitLabel}
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          &rarr;
        </span>
      </a>
    </article>
  );
}
