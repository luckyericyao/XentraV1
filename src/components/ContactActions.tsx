type ContactActionsProps = {
  href: string;
  label: string;
  value: string;
  note: string;
  external: boolean;
  externalLinkLabel: string;
};

export function ContactActions({
  href,
  label,
  value,
  note,
  external,
  externalLinkLabel,
}: ContactActionsProps) {
  return (
    <div>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={external ? `${label} (${externalLinkLabel})` : label}
        className="group inline-flex min-h-11 items-center gap-5 rounded-md border border-[rgba(198,161,91,0.42)] bg-[#070809] px-5 text-sm font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
      >
        <span>{label}</span>
        <span
          aria-hidden="true"
          className="text-[#B49459] transition group-hover:translate-x-1"
        >
          &#8599;
        </span>
      </a>
      <p className="eyebrow mt-4 text-[#8D97A5]">{value}</p>
      <p className="mt-3 max-w-sm text-xs leading-5 text-[#8D97A5]">{note}</p>
    </div>
  );
}
