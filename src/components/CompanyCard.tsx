type CompanyCardProps = {
  title: string;
  category: string;
  headline: string;
  trustLine: string;
  repo: string;
  splitLine: string;
  signal: string;
  href: string;
};

export function CompanyCard({
  title,
  category,
  headline,
  trustLine,
  repo,
  href,
}: CompanyCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-[rgba(183,196,211,0.28)] hover:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-[#8FA7C0]">{category}</p>
        <p className="text-xs text-[#6E7680]">{repo}</p>
      </div>
      <h3 className="mt-10 text-2xl font-semibold text-[#F3EEE5]">{title}</h3>
      <p className="mt-5 min-h-20 text-base leading-7 text-[#A6AFB8]">
        {headline}
      </p>
      <p className="mt-8 border-t border-[rgba(255,255,255,0.08)] pt-5 text-sm leading-6 text-[#A6AFB8]">
        {trustLine}
      </p>
      <a
        href={href}
        className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#F3EEE5] transition group-hover:text-[#B7C4D3]"
        target="_blank"
        rel="noreferrer"
      >
        Visit
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          &rarr;
        </span>
      </a>
    </article>
  );
}
