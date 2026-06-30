import { navItems } from "@/lib/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(244,240,232,0.10)] bg-[#050505]/72 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="text-sm font-medium uppercase text-[#f4f0e8]"
        >
          Xentra
        </a>
        <div className="flex items-center gap-5 sm:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#8f8a82] transition hover:text-[#f4f0e8]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
