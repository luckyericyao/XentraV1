import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Xentra | 把复杂市场，做成可信系统",
  description:
    "Xentra 是一家 AI 原生运营集团，在企业 AI、私人旅行与生命科学供应领域建立并运营垂直公司。",
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
      "Xentra 是一家 AI 原生运营集团，在企业 AI、私人旅行与生命科学供应领域建立并运营垂直公司。",
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
      "Xentra 是一家 AI 原生运营集团，在企业 AI、私人旅行与生命科学供应领域建立并运营垂直公司。",
    images: ["/zh/twitter-image"],
  },
};

export default function ChineseHome() {
  return <HomePage locale="zh" />;
}
