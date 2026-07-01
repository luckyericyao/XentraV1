import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Xentra | AI 原生运营集团",
  description:
    "Xentra 为复杂市场建立可信的决策与执行系统。",
};

export default function ChineseHome() {
  return <HomePage locale="zh" />;
}
