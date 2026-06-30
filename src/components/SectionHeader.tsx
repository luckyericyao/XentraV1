type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  light = false,
}: SectionHeaderProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const titleColor = light ? "text-[#f6f0e6]" : "text-[#171613]";
  const bodyColor = light ? "text-[#d4cec2]" : "text-[#5d5a52]";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase text-[#6d91ab]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-balance text-4xl font-semibold leading-tight sm:text-5xl ${titleColor}`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-6 text-lg leading-8 text-pretty ${bodyColor}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
