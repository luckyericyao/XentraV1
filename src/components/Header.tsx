import { navItems } from "@/lib/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(255,255,255,0.08)] bg-[#0B0D10]/78 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="flex items-baseline gap-3 text-sm font-semibold uppercase text-[#F3EEE5]"
        >
          <span>Xentra</span>
          <span className="hidden text-xs font-normal text-[#8FA7C0] sm:inline">
            Operating Group
          </span>
        </a>
        <div className="flex items-center gap-5 sm:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#A6AFB8] transition hover:text-[#F3EEE5]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
