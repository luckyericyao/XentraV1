type HeaderProps = {
  navItems: { label: string; href: string }[];
  languageSwitch: { label: string; href: string };
};

export function Header({ navItems, languageSwitch }: HeaderProps) {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-[rgba(42,45,51,0.82)] bg-[#070809]/36 backdrop-blur-sm">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8"
      >
        <a
          href="#top"
          className="text-sm font-semibold uppercase text-[#F2EFE8]"
        >
          Xentra
        </a>
        <div className="flex items-center gap-1.5 sm:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] text-[#A6A39A] transition hover:text-[#F2EFE8] sm:text-sm"
            >
              {item.label}
            </a>
          ))}
          <a
            href={languageSwitch.href}
            className="rounded-full border border-[rgba(198,161,91,0.18)] px-3 py-1.5 text-xs font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
          >
            {languageSwitch.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
