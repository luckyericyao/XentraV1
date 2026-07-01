import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Xentra | 面向高信任成本市场的决策基础设施",
  description:
    "Xentra 是面向高信任成本市场构建垂直公司的 AI 驱动运营集团。",
};

export default function ChineseHome() {
  return <HomePage locale="zh" />;
}
