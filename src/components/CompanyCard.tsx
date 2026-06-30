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
    <article className="group flex h-full flex-col rounded-lg border border-[#111111]/14 bg-[#ede7dc] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#6f8faf]/70 hover:bg-[#f4f0e8]">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase text-[#5f7f9c]">{category}</p>
        <p className="text-xs text-[#8f8a82]">{repo}</p>
      </div>
      <h3 className="mt-10 text-2xl font-medium text-[#111111]">{title}</h3>
      <p className="mt-5 min-h-20 text-base leading-7 text-[#4d4942]">
        {headline}
      </p>
      <p className="mt-8 border-t border-[#111111]/12 pt-5 text-sm leading-6 text-[#5e5a52]">
        {trustLine}
      </p>
      <a
        href={href}
        className="mt-8 inline-flex w-fit items-center gap-2 text-sm text-[#111111] transition group-hover:text-[#426985]"
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
