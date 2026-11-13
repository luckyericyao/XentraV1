import type { Locale } from "@/lib/content";

const copyByLocale = {
  en: {
    lang: "en",
    skipLabel: "Skip to content",
    eyebrow: "404 / Page not found",
    pageTitle: "Page not found | Xentra",
    title: "This path does not lead to an operating company.",
    body: "The page may have moved, or the address may be incomplete. Return to Xentra to continue.",
    homeLabel: "Return home",
    homeHref: "/",
    alternateLabel: "中文",
    alternateHref: "/zh",
    alternateLang: "zh-CN",
    footerLabel: "Xentra / AI-native operating group",
  },
  zh: {
    lang: "zh-CN",
    skipLabel: "跳到主要内容",
    eyebrow: "404 / 页面不存在",
    pageTitle: "页面不存在 | Xentra",
    title: "这个地址，没有对应的业务页面。",
    body: "页面可能已经移动，或链接并不完整。回到 Xentra 中文首页继续浏览。",
    homeLabel: "返回首页",
    homeHref: "/zh",
    alternateLabel: "EN",
    alternateHref: "/",
    alternateLang: "en",
    footerLabel: "Xentra / AI 原生运营集团",
  },
} as const;

export function notFoundResponse(locale: Locale) {
  const copy = copyByLocale[locale];

  // Only fixed localized copy is rendered; request paths and queries are never echoed.
  const html = `<!doctype html>
<html lang="${copy.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="#070809">
  <title>${copy.pageTitle}</title>
  <link rel="icon" href="/favicon.svg">
  <link rel="stylesheet" href="/not-found.css">
</head>
<body class="recovery-document">
  <div class="recovery-page">
    <a href="#not-found-main" class="recovery-skip">${copy.skipLabel}</a>
    <header class="recovery-header">
      <a href="${copy.homeHref}" class="recovery-brand">Xentra</a>
      <a href="${copy.alternateHref}" hreflang="${copy.alternateLang}" lang="${copy.alternateLang}" class="recovery-link">${copy.alternateLabel}</a>
    </header>
    <main id="not-found-main" tabindex="-1" class="recovery-main" aria-labelledby="not-found-title" aria-describedby="not-found-body">
      <p class="recovery-eyebrow">${copy.eyebrow}</p>
      <h1 id="not-found-title">${copy.title}</h1>
      <p id="not-found-body">${copy.body}</p>
      <a href="${copy.homeHref}" class="recovery-link recovery-home">${copy.homeLabel}</a>
    </main>
    <footer class="recovery-footer">${copy.footerLabel}</footer>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "Content-Language": copy.lang,
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
