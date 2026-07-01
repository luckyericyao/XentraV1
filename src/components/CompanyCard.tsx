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
};

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
}: CompanyCardProps) {
  return (
    <a
      id={slug}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="scroll-rise group flex flex-col rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-1 hover:border-[rgba(183,196,211,0.26)] hover:bg-white/[0.045] hover:shadow-[0_24px_90px_rgba(143,167,192,0.06)] sm:min-h-[30rem]"
    >
      <p className="eyebrow text-[#8FA7C0]">{vertical}</p>
      <div className="mt-10 sm:mt-14">
        <h3 className="text-3xl font-semibold text-[#F3EEE5]">{title}</h3>
        {layer ? (
          <p className="mt-4 text-sm font-medium text-[#B7C4D3]">{layer}</p>
        ) : null}
      </div>
      <p className="mt-6 border-t border-[rgba(255,255,255,0.08)] pt-5 text-base leading-7 text-[#F3EEE5] sm:mt-8">
        {headline}
      </p>
      {body?.length ? (
        <div className="mt-4 space-y-3 text-sm leading-6 text-[#A6AFB8] sm:mt-5 sm:leading-7">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}
      {useCases?.length ? (
        <div className="mt-5 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0B0D10]/40 p-4 sm:mt-7">
          <p className="text-[11px] font-semibold text-[#6E7680]">适用场景</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {useCases.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-xs text-[#B7C4D3]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      {problem ? (
        <div className="mt-5 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0B0D10]/40 p-4 sm:mt-7">
          <p className="text-[11px] font-semibold text-[#6E7680]">
            底层问题
          </p>
          <p className="mt-3 text-sm leading-6 text-[#B7C4D3]">{problem}</p>
        </div>
      ) : null}
      <span className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-medium text-[#F3EEE5] transition group-hover:text-[#B7C4D3] sm:pt-8">
        {visitLabel}
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </a>
  );
}
