import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Xentra | 复杂决策，需要新的信任基础设施",
  description:
    "Xentra 构建并运营垂直业务，为复杂决策建立可信运营系统。",
};

export default function ChineseHome() {
  return <HomePage locale="zh" />;
}
