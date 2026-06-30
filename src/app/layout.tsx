import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xentra | Reducing trust cost in complex decisions",
  description:
    "Xentra builds AI-native platforms for trust-heavy decisions in complex markets where information is fragmented and execution matters.",
  keywords: [
    "Xentra",
    "AI-native operating company",
    "trust-heavy decisions",
    "trust cost",
    "structured data",
    "expert networks",
    "operational execution",
  ],
  authors: [{ name: "Xentra" }],
  creator: "Xentra",
  openGraph: {
    title: "Xentra | Reducing trust cost in complex decisions",
    description:
      "AI-native platforms for markets where information is fragmented, trust is expensive, and execution matters.",
    siteName: "Xentra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xentra | Reducing trust cost in complex decisions",
    description:
      "AI-native platforms for markets where information is fragmented, trust is expensive, and execution matters.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
