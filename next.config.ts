import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const chineseHeaders = [
  ...securityHeaders,
  { key: "Content-Language", value: "zh-CN" },
];

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      { source: "/zh", headers: chineseHeaders },
      { source: "/zh/:path*", headers: chineseHeaders },
      { source: "/(.*)", headers: securityHeaders },
    ];
  },
};

export default nextConfig;
