"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

type HeaderProps = {
  navItems: { label: string; href: string }[];
  languageSwitch: { label: string; href: string };
};

export function Header({ navItems, languageSwitch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuNavigationRef = useRef<HTMLDivElement>(null);
  const isChinese = languageSwitch.label === "EN";
  const navigationLabel = isChinese ? "主导航" : "Primary navigation";
  const skipLabel = isChinese ? "跳到主要内容" : "Skip to content";
  const menuLabel = menuOpen
    ? isChinese
      ? "关闭导航"
      : "Close navigation"
    : isChinese
      ? "打开导航"
      : "Open navigation";

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    menuNavigationRef.current
      ?.querySelector<HTMLAnchorElement>("a[href]")
      ?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      menuButton?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const sections = navItems
      .filter((item) => item.href.startsWith("#"))
      .map((item) => ({
        href: item.href,
        element: document.getElementById(item.href.slice(1)),
      }))
      .filter(
        (section): section is { href: string; element: HTMLElement } =>
          section.element instanceof HTMLElement,
      );

    const updateScrollState = () => {
      const marker = window.scrollY + Math.min(window.innerHeight * 0.34, 260);
      let nextActiveHref = "";

      for (const section of sections) {
        const sectionTop =
          section.element.getBoundingClientRect().top + window.scrollY;

        if (sectionTop <= marker) {
          nextActiveHref = section.href;
        }
      }

      setActiveHref((current) =>
        current === nextActiveHref ? current : nextActiveHref,
      );
      setScrolled((current) => {
        const nextScrolled = window.scrollY > 12;
        return current === nextScrolled ? current : nextScrolled;
      });
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    window.addEventListener("hashchange", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      window.removeEventListener("hashchange", updateScrollState);
    };
  }, [navItems]);

  const handleLanguageSwitch = (event: MouseEvent<HTMLAnchorElement>) => {
    const currentHash = window.location.hash || activeHref;

    if (!currentHash) {
      return;
    }

    event.preventDefault();
    window.location.assign(`${languageSwitch.href}${currentHash}`);
  };

  return (
    <>
      <a
        href="#top"
        onClick={(event) => {
          const main = document.getElementById("top");

          if (!main) {
            return;
          }

          event.preventDefault();
          main.focus();
          main.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.replaceState(null, "", "#top");
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border focus:border-[rgba(198,161,91,0.5)] focus:bg-[#101214] focus:px-4 focus:py-2.5 focus:text-sm focus:text-[#F2EFE8] focus:shadow-[0_12px_35px_rgba(0,0,0,0.36)]"
      >
        {skipLabel}
      </a>
      <header
        className={`site-header sticky top-0 z-50 border-b backdrop-blur-md ${
          scrolled
            ? "border-[rgba(42,45,51,0.92)] bg-[#070809]/92 shadow-[0_12px_35px_rgba(0,0,0,0.16)]"
            : "border-[rgba(42,45,51,0.58)] bg-[#070809]/62"
        }`}
      >
      <nav
        aria-label={navigationLabel}
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8"
      >
        <a
          href="#top"
          className="text-sm font-semibold uppercase tracking-[0.14em] text-[#F2EFE8]"
          onClick={() => setMenuOpen(false)}
        >
          Xentra
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "location" : undefined}
              className={`relative text-sm transition hover:text-[#F2EFE8] ${
                activeHref === item.href ? "text-[#F2EFE8]" : "text-[#A6A39A]"
              }`}
            >
              {item.label}
              {activeHref === item.href ? (
                <span
                  className="absolute -bottom-2 left-0 h-px w-5 bg-[#C6A15B]"
                  aria-hidden="true"
                />
              ) : null}
            </a>
          ))}
          <a
            href={languageSwitch.href}
            onClick={handleLanguageSwitch}
            className="inline-flex min-h-9 items-center rounded-full border border-[rgba(198,161,91,0.18)] px-3 text-xs font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
          >
            {languageSwitch.label}
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={languageSwitch.href}
            onClick={handleLanguageSwitch}
            className="inline-flex min-h-11 items-center rounded-full border border-[rgba(198,161,91,0.18)] px-3 text-xs font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
          >
            {languageSwitch.label}
          </a>
          <button
            type="button"
            ref={menuButtonRef}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuLabel}
            title={menuLabel}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-11 items-center justify-center rounded-full border border-[#2A2D33] text-[#F2EFE8] transition hover:border-[rgba(198,161,91,0.46)]"
          >
            <span className="relative block h-3.5 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 block h-px w-4 bg-current transition ${
                  menuOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-px w-4 bg-current transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 block h-px w-4 bg-current transition ${
                  menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
        <div
          id="mobile-navigation"
          ref={menuNavigationRef}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          onKeyDown={(event) => {
            if (!menuOpen || event.key !== "Tab") {
              return;
            }

            const links = Array.from(
              menuNavigationRef.current?.querySelectorAll<HTMLAnchorElement>(
                "a[href]",
              ) ?? [],
            );

            if (!links.length) {
              return;
            }

            const firstLink = links[0];
            const lastLink = links[links.length - 1];

            if (event.shiftKey && document.activeElement === firstLink) {
              event.preventDefault();
              lastLink.focus();
            } else if (!event.shiftKey && document.activeElement === lastLink) {
              event.preventDefault();
              firstLink.focus();
            }
          }}
          className={`absolute left-4 right-4 top-[calc(100%+0.65rem)] z-50 overflow-hidden rounded-lg border border-[rgba(198,161,91,0.2)] bg-[#101214]/98 shadow-[0_26px_80px_rgba(0,0,0,0.48)] transition duration-300 md:hidden ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <div className="grid p-2">
            {navItems.map((item, index) => (
              <a
                key={`mobile-${item.href}`}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={activeHref === item.href ? "location" : undefined}
                className={`flex min-h-12 items-center justify-between border-b border-[#2A2D33] px-4 text-sm transition last:border-b-0 hover:bg-[#17191D] hover:text-[#F2EFE8] ${
                  activeHref === item.href
                    ? "bg-[#17191D] text-[#F2EFE8]"
                    : "text-[#A6A39A]"
                }`}
              >
                <span className="flex items-center gap-3">
                  {activeHref === item.href ? (
                    <span
                      className="size-1.5 rounded-full bg-[#C6A15B]"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span>{item.label}</span>
                </span>
                <span
                  className="text-[10px] tabular-nums text-[#B49459]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>
      </header>
      {menuOpen ? (
        <button
          type="button"
          aria-label={isChinese ? "关闭导航背景" : "Close navigation backdrop"}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-[#070809]/64 backdrop-blur-[2px] md:hidden"
        />
      ) : null}
    </>
  );
}
