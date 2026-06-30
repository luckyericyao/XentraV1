import { navItems } from "@/lib/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#11100d]/70 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="text-sm font-semibold uppercase text-[#f6f0e6]"
        >
          Xentra
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#d8d2c7] transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full border border-[#f6f0e6]/18 px-4 py-2 text-sm text-[#f6f0e6] transition hover:border-[#87b7d8]/60 hover:text-white"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
