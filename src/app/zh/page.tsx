import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Xentra | 把复杂市场，做成可信系统",
  description:
    "Xentra 是一家 AI 原生运营集团，进入信息混乱、判断困难、结果依赖执行的市场，建立垂直运营公司。",
  keywords: [
    "Xentra",
    "AI 原生运营集团",
    "垂直运营公司",
    "复杂市场",
    "可信判断",
    "企业 AI",
    "私人旅行",
    "生命科学供应",
  ],
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
};

export default function ChineseHome() {
  return <HomePage locale="zh" />;
}
