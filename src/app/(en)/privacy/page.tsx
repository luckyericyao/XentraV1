import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy | Xentra",
  description:
    "A plain-language note on how the Xentra group homepage handles information.",
  alternates: {
    canonical: "/privacy",
    languages: {
      en: "/privacy",
      "zh-CN": "/zh/privacy",
      "x-default": "/privacy",
    },
  },
  openGraph: {
    title: "Privacy | Xentra",
    description:
      "A plain-language note on how the Xentra group homepage handles information.",
    siteName: "Xentra",
    type: "website",
    url: "/privacy",
  },
};

export default function Privacy() {
  return <PrivacyPage locale="en" />;
}
