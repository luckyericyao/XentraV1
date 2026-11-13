"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { openMobileNavigation } from "@/lib/mobile-navigation";
import { getReadingHash } from "@/lib/reading-position";

type HeaderProps = {
  homeHref?: string;
  navItems: { label: string; href: string }[];
  languageSwitch: { label: string; href: string; lang: string };
};

export function Header({ homeHref = "#top", navItems, languageSwitch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [readingHash, setReadingHash] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuNavigationRef = useRef<HTMLDivElement>(null);
  const menuSessionRef = useRef<ReturnType<typeof openMobileNavigation> | null>(null);
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

  const moveToMain = () => {
    const main = document.getElementById("top");

    if (!main) {
      return;
    }

    main.focus({ preventScroll: true });
    main.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", "#top");
  };

  const focusMain = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    moveToMain();
  };

  const focusMainFromKeyboard = (
    event: ReactKeyboardEvent<HTMLAnchorElement>,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    moveToMain();
  };

  useEffect(() => {
    const button = menuButtonRef.current;
    const navigation = menuNavigationRef.current;

    if (!menuOpen || !button || !navigation) {
      return;
    }

    const session = openMobileNavigation({
      document,
      desktopViewport: window.matchMedia("(min-width: 48rem)"),
      button,
      navigation,
      onClose: () => setMenuOpen(false),
    });
    menuSessionRef.current = session;

    return () => {
      session.dispose();
      menuSessionRef.current = null;
    };
  }, [menuOpen]);

  useEffect(() => {
    const readingSections = homeHref === "#top"
      ? Array.from(document.querySelectorAll<HTMLElement>(
          "main > section[id], .portfolio-chapter[id]",
        ))
      : [];
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
      const readingMarker = Math.min(window.innerHeight * 0.34, 260);
      const marker = window.scrollY + readingMarker;
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
      const nextReadingHash = readingSections.length
        ? getReadingHash(readingSections.flatMap((section) => {
            const bounds = section.getBoundingClientRect();
            return bounds.height > 0 ? [{ id: section.id, top: bounds.top }] : [];
          }), readingMarker)
        : "";
      setReadingHash((current) =>
        current === nextReadingHash ? current : nextReadingHash,
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
  }, [homeHref, navItems]);

  const languageHref = `${languageSwitch.href}${readingHash}`;

  return (
    <>
      <a
        href="#top"
        data-navigation-background
        onClick={focusMain}
        onKeyDown={focusMainFromKeyboard}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-[rgba(198,161,91,0.5)] focus:bg-[#101214] focus:px-4 focus:py-2.5 focus:text-sm focus:text-[#F2EFE8] focus:shadow-[0_12px_35px_rgba(0,0,0,0.36)]"
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
          href={homeHref}
          data-navigation-background
          className="text-sm font-semibold uppercase tracking-[0.14em] text-[#F2EFE8]"
          onClick={(event) => {
            setMenuOpen(false);

            if (homeHref !== "#top") {
              return;
            }

            focusMain(event);
          }}
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
            href={languageHref}
            data-navigation-background
            hrefLang={languageSwitch.lang}
            lang={languageSwitch.lang}
            className="inline-flex min-h-9 items-center rounded-md border border-[rgba(198,161,91,0.18)] px-3 text-xs font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
          >
            {languageSwitch.label}
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={languageHref}
            data-navigation-background
            hrefLang={languageSwitch.lang}
            lang={languageSwitch.lang}
            className="inline-flex min-h-11 items-center rounded-md border border-[rgba(198,161,91,0.18)] px-3 text-xs font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
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
            onClick={() => {
              if (menuOpen) {
                menuSessionRef.current?.close();
              } else {
                setMenuOpen(true);
              }
            }}
            className="flex size-11 items-center justify-center rounded-md border border-[#2A2D33] text-[#F2EFE8] transition hover:border-[rgba(198,161,91,0.46)]"
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
          className={`absolute left-4 right-4 top-[calc(100%+0.65rem)] z-50 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-lg border border-[rgba(198,161,91,0.2)] bg-[#101214]/98 shadow-[0_26px_80px_rgba(0,0,0,0.48)] transition duration-300 md:hidden ${
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
                onClick={() => {
                  const destination = item.href.startsWith("#")
                    ? document.getElementById(item.href.slice(1))
                    : null;
                  menuSessionRef.current?.close(destination);
                }}
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
          onClick={() => menuSessionRef.current?.close()}
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-[#070809]/64 backdrop-blur-[2px] md:hidden"
        />
      ) : null}
    </>
  );
}
