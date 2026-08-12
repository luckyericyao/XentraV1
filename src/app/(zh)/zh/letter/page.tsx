import type { Metadata } from "next";
import { FounderLetterPage } from "@/components/FounderLetterPage";

const title = "创始人手记 | Xentra";
const description = "为什么企业 AI、私人旅行与生命科学采购，面对的是同一种信任与交付问题。";

export const metadata: Metadata = {
  title,
  description,
  other: {
    "content-language": "zh-CN",
  },
  alternates: {
    canonical: "/zh/letter",
    languages: {
      en: "/letter",
      "zh-CN": "/zh/letter",
      "x-default": "/letter",
    },
  },
  openGraph: {
    title,
    description,
    siteName: "Xentra",
    type: "article",
    url: "/zh/letter",
    locale: "zh_CN",
    publishedTime: "2026-08-13T00:00:00.000Z",
    images: [
      {
        url: "/zh/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Xentra 创始人手记",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/zh/twitter-image"],
  },
};

export default function ChineseFounderLetter() {
  return <FounderLetterPage locale="zh" />;
}
