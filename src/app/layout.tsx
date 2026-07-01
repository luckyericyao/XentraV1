import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Xentra | Reducing trust cost in complex decisions",
  description:
    "Xentra is an AI-native operating group building vertical companies for trust-heavy decisions in complex markets.",
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
  openGraph: {
    title: "Xentra | Reducing trust cost in complex decisions",
    description:
      "An AI-native operating group building vertical companies for trust-heavy decisions.",
    siteName: "Xentra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xentra | Reducing trust cost in complex decisions",
    description:
      "An AI-native operating group building vertical companies for trust-heavy decisions.",
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
      <body>{children}</body>
    </html>
  );
}
