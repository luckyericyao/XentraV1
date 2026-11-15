import localFont from "next/font/local";

export const instrumentSans = localFont({
  src: "./instrument-sans-latin.woff2",
  weight: "400 700",
  variable: "--font-instrument",
  display: "swap",
});

export const newsreader = localFont({
  src: "./newsreader-latin.woff2",
  weight: "200 800",
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
