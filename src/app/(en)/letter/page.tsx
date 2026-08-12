import type { Metadata } from "next";
import { FounderLetterPage } from "@/components/FounderLetterPage";

const title = "Founder Letter | Xentra";
const description =
  "Why Xentra sees the same trust problem across AI adoption, private travel, and laboratory sourcing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/letter",
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
    url: "/letter",
    locale: "en_US",
    publishedTime: "2026-08-13T00:00:00.000Z",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Xentra founder letter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image"],
  },
};

export default function FounderLetter() {
  return <FounderLetterPage locale="en" />;
}
