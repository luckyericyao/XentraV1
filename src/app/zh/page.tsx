import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Xentra | 把复杂市场，做成可信系统",
  description: "Xentra 是一家 AI 原生运营集团，建立垂直运营公司。",
};

export default function ChineseHome() {
  return <HomePage locale="zh" />;
}
