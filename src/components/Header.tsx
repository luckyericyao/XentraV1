type HeaderProps = {
  navItems: { label: string; href: string }[];
  languageSwitch: { label: string; href: string };
};

export function Header({ navItems, languageSwitch }: HeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-[rgba(255,255,255,0.06)] bg-[#0B0D10]/36 backdrop-blur-sm">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8"
      >
        <a
          href="#top"
          className="text-sm font-semibold uppercase text-[#F3EEE5]"
        >
          Xentra
        </a>
        <div className="flex items-center gap-2 sm:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-[#A6AFB8] transition hover:text-[#F3EEE5] sm:text-sm"
            >
              {item.label}
            </a>
          ))}
          <a
            href={languageSwitch.href}
            className="rounded-full border border-[rgba(255,255,255,0.1)] px-3 py-1.5 text-xs font-medium text-[#F3EEE5] transition hover:border-[#B7C4D3] hover:text-[#B7C4D3]"
          >
            {languageSwitch.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
