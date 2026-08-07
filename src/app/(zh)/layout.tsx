import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { DocumentLanguage } from "@/components/DocumentLanguage";
import { getSiteUrl } from "@/lib/site-url";
import "../globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const siteUrl = getSiteUrl();
const languageBootstrap = `(() => {
  const isChinese = window.location.pathname === "/zh" || window.location.pathname.startsWith("/zh/");
  document.documentElement.lang = isChinese ? "zh-CN" : "en";
})();`;

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070809",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Xentra | 把复杂市场，做成可信系统",
  description:
    "Xentra 是一家 AI 原生运营集团，进入信息混乱、判断困难、结果依赖执行的市场，建立垂直运营公司。",
  authors: [{ name: "Xentra" }],
  creator: "Xentra",
  manifest: "/zh/manifest.webmanifest",
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Xentra | 把复杂市场，做成可信系统",
    description:
      "Xentra 是一家 AI 原生运营集团，进入信息混乱、判断困难、结果依赖执行的市场，建立垂直运营公司。",
    siteName: "Xentra",
    type: "website",
    url: "/zh",
    locale: "zh_CN",
    images: [
      {
        url: "/zh/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Xentra - 把复杂市场，做成可信系统",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xentra | 把复杂市场，做成可信系统",
    description:
      "Xentra 是一家 AI 原生运营集团，进入信息混乱、判断困难、结果依赖执行的市场，建立垂直运营公司。",
    images: ["/zh/twitter-image"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function ChineseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${instrumentSans.variable} ${newsreader.variable}`}
    >
      <body>
        <script
          id="document-language-bootstrap"
          dangerouslySetInnerHTML={{ __html: languageBootstrap }}
        />
        <DocumentLanguage />
        {children}
      </body>
    </html>
  );
}
