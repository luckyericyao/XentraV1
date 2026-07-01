import { navItems } from "@/lib/content";

export function Header() {
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
        <div className="flex items-center gap-3 sm:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs text-[#A6AFB8] transition hover:text-[#F3EEE5] sm:text-sm"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
