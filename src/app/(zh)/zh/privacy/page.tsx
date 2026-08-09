import type { Metadata } from "next";
import { PrivacyPage } from "@/components/PrivacyPage";

export const metadata: Metadata = {
  title: "隐私说明 | Xentra",
  description: "Xentra 集团主页如何处理信息的简明说明。",
  other: {
    "content-language": "zh-CN",
  },
  alternates: {
    canonical: "/zh/privacy",
    languages: {
      en: "/privacy",
      "zh-CN": "/zh/privacy",
      "x-default": "/privacy",
    },
  },
  openGraph: {
    title: "隐私说明 | Xentra",
    description: "Xentra 集团主页如何处理信息的简明说明。",
    siteName: "Xentra",
    type: "website",
    url: "/zh/privacy",
    locale: "zh_CN",
  },
};

export default function ChinesePrivacy() {
  return <PrivacyPage locale="zh" />;
}
