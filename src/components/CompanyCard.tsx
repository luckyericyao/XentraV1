type CompanyCardProps = {
  title: string;
  category: string;
  headline: string;
  trustLine: string;
  href: string;
};

export function CompanyCard({
  title,
  category,
  headline,
  trustLine,
  href,
}: CompanyCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-[rgba(244,240,232,0.14)] bg-[#0b0b0b] p-7 transition duration-300 hover:border-[#6f8faf]/70 hover:bg-[#111111]">
      <p className="text-xs uppercase text-[#6f8faf]">{category}</p>
      <h3 className="mt-10 text-2xl font-medium text-[#f4f0e8]">{title}</h3>
      <p className="mt-5 min-h-16 text-lg leading-7 text-[#c9c2b6]">
        {headline}
      </p>
      <p className="mt-8 border-t border-[rgba(244,240,232,0.12)] pt-5 text-sm leading-6 text-[#8f8a82]">
        {trustLine}
      </p>
      <a
        href={href}
        className="mt-8 inline-flex w-fit items-center gap-2 text-sm text-[#f4f0e8] transition group-hover:text-[#9db6cf]"
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
