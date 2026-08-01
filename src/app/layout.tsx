import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { DocumentLanguage } from "@/components/DocumentLanguage";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070809",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Xentra | Decision infrastructure for trust-heavy markets",
  description:
    "Xentra is an AI-enabled operating group building vertical companies for trust-heavy markets.",
  keywords: [
    "Xentra",
    "AI-native operating group",
    "operating companies",
    "vertical companies",
    "trust-heavy decisions",
    "trust cost",
    "structured data",
    "expert networks",
    "operational execution",
  ],
  authors: [{ name: "Xentra" }],
  creator: "Xentra",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "zh-CN": "/zh",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Xentra | Decision infrastructure for trust-heavy markets",
    description:
      "An AI-enabled operating group building vertical companies for trust-heavy markets.",
    siteName: "Xentra",
    type: "website",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xentra | Decision infrastructure for trust-heavy markets",
    description:
      "An AI-enabled operating group building vertical companies for trust-heavy markets.",
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
    <html
      lang="en"
      className={`${instrumentSans.variable} ${newsreader.variable}`}
    >
      <body>
        <DocumentLanguage />
        {children}
      </body>
    </html>
  );
}
