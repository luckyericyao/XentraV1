type CompanyCardProps = {
  title: string;
  category: string;
  headline: string;
  body: string;
  trustLine: string;
  href: string;
};

export function CompanyCard({
  title,
  category,
  headline,
  body,
  trustLine,
  href,
}: CompanyCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-[#d8d0c2] bg-[#fbf7ee] p-7 shadow-[0_24px_60px_rgba(17,16,13,0.07)] transition hover:-translate-y-1 hover:border-[#87b7d8]/60">
      <div className="flex items-center justify-between gap-5">
        <p className="text-xs font-semibold uppercase text-[#6d91ab]">
          {category}
        </p>
        <span className="h-2 w-2 rounded-full bg-[#87b7d8]" />
      </div>
      <h3 className="mt-8 text-2xl font-semibold text-[#171613]">{title}</h3>
      <p className="mt-5 text-xl leading-7 text-[#24231f]">{headline}</p>
      <p className="mt-5 flex-1 text-sm leading-7 text-[#615e55]">{body}</p>
      <p className="mt-7 border-t border-[#ded7ca] pt-5 text-sm font-medium text-[#24231f]">
        {trustLine}
      </p>
      <a
        href={href}
        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#171613] transition group-hover:text-[#426f91]"
        target="_blank"
        rel="noreferrer"
      >
        Visit {title}
        <span aria-hidden="true" className="transition group-hover:translate-x-1">
          &rarr;
        </span>
      </a>
    </article>
  );
}
