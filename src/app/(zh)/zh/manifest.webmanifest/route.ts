import { NextResponse } from "next/server";

const chineseManifest = {
  name: "Xentra",
  short_name: "Xentra",
  description:
    "Xentra 是一家 AI 原生运营集团，进入信息混乱、判断困难、结果依赖执行的市场，建立垂直运营公司。",
  start_url: "/zh",
  scope: "/zh",
  display: "standalone",
  background_color: "#070809",
  theme_color: "#070809",
  icons: [
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
};

export function GET() {
  return NextResponse.json(chineseManifest, {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
    },
  });
}
