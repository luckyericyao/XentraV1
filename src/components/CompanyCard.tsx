type CompanyCardProps = {
  slug: string;
  title: string;
  vertical: string;
  layer: string;
  headline: string;
};

export function CompanyCard({
  slug,
  title,
  vertical,
  layer,
  headline,
}: CompanyCardProps) {
  return (
    <article
      id={slug}
      className="scroll-rise group flex min-h-72 flex-col rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-1 hover:border-[rgba(183,196,211,0.26)] hover:bg-white/[0.045]"
    >
      <p className="eyebrow text-[#8FA7C0]">{vertical}</p>
      <div className="mt-auto pt-16">
        <h3 className="text-3xl font-semibold text-[#F3EEE5]">{title}</h3>
        <p className="mt-4 text-sm font-medium text-[#B7C4D3]">{layer}</p>
      </div>
      <p className="mt-7 border-t border-[rgba(255,255,255,0.08)] pt-5 text-base leading-7 text-[#A6AFB8]">
        {headline}
      </p>
    </article>
  );
}
