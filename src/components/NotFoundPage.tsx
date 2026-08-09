import Link from "next/link";
import { DecisionGraph } from "@/components/DecisionGraph";
import type { Locale } from "@/lib/content";

type NotFoundPageProps = {
  locale: Locale;
};

const notFoundCopy = {
  en: {
    lang: "en",
    eyebrow: "404 / Page not found",
    title: "This path does not lead to an operating company.",
    body: "The page may have moved, or the address may be incomplete. Return to Xentra to continue.",
    primaryLabel: "Return home",
    primaryHref: "/",
    secondaryLabel: "中文",
    secondaryHref: "/zh",
    secondaryLang: "zh-CN",
    footerLabel: "Xentra / AI-native operating group",
  },
  zh: {
    lang: "zh-CN",
    eyebrow: "404 / 页面不存在",
    title: "这个地址，没有对应的业务页面。",
    body: "页面可能已经移动，或链接并不完整。回到 Xentra 中文首页继续浏览。",
    primaryLabel: "返回首页",
    primaryHref: "/zh",
    secondaryLabel: "EN",
    secondaryHref: "/",
    secondaryLang: "en",
    footerLabel: "Xentra / AI 原生运营集团",
  },
} as const;

export function NotFoundPage({ locale }: NotFoundPageProps) {
  const copy = notFoundCopy[locale];

  return (
    <main
      lang={copy.lang}
      aria-labelledby="not-found-title"
      aria-describedby="not-found-body"
      className={`relative isolate flex min-h-svh overflow-hidden bg-[#070809] px-5 py-8 text-[#F2EFE8] sm:px-8 sm:py-10 ${
        locale === "zh" ? "cjk" : ""
      }`}
    >
      <div className="hero-color-field" aria-hidden="true" />
      <DecisionGraph />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
        <div className="flex items-center justify-between border-b border-[#2A2D33] pb-6">
          <Link
            href={copy.primaryHref}
            className="text-sm font-semibold uppercase tracking-[0.14em] text-[#F2EFE8]"
          >
            Xentra
          </Link>
          <Link
            href={copy.secondaryHref}
            hrefLang={copy.secondaryLang}
            lang={copy.secondaryLang}
            className="inline-flex min-h-11 items-center rounded-full border border-[rgba(198,161,91,0.22)] px-3 text-xs font-medium text-[#A6A39A] transition hover:border-[#C6A15B] hover:text-[#F2EFE8]"
          >
            {copy.secondaryLabel}
          </Link>
        </div>
        <div className="flex flex-1 items-center py-20">
          <div className="max-w-4xl">
            <p className="eyebrow mb-7 text-[#C6A15B]">{copy.eyebrow}</p>
            <h1
              id="not-found-title"
              className="font-serif text-balance text-5xl font-normal leading-[1.02] sm:text-7xl lg:text-8xl"
            >
              {copy.title}
            </h1>
            <p
              id="not-found-body"
              className="mt-8 max-w-2xl text-base leading-8 text-[#A6A39A] sm:text-lg"
            >
              {copy.body}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={copy.primaryHref}
                className="inline-flex rounded-full border border-[rgba(198,161,91,0.46)] bg-[#101214] px-6 py-3 text-sm font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:bg-[#17191D]"
              >
                {copy.primaryLabel}
              </Link>
              <Link
                href={copy.secondaryHref}
                hrefLang={copy.secondaryLang}
                lang={copy.secondaryLang}
                className="inline-flex rounded-full border border-[#2A2D33] px-6 py-3 text-sm font-medium text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.36)] hover:text-[#F2EFE8]"
              >
                {copy.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
        <p className="eyebrow border-t border-[#2A2D33] pt-6 text-[#8E7445]">
          {copy.footerLabel}
        </p>
      </div>
    </main>
  );
}
