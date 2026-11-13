import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { sitePageDates } from "@/lib/site-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const modified = (page: keyof typeof sitePageDates) =>
    new Date(`${sitePageDates[page]}T00:00:00.000Z`);
  const languages = {
    en: `${siteUrl}/`,
    "zh-CN": `${siteUrl}/zh`,
    "x-default": `${siteUrl}/`,
  };
  const privacyLanguages = {
    en: `${siteUrl}/privacy`,
    "zh-CN": `${siteUrl}/zh/privacy`,
    "x-default": `${siteUrl}/privacy`,
  };
  const letterLanguages = {
    en: `${siteUrl}/letter`,
    "zh-CN": `${siteUrl}/zh/letter`,
    "x-default": `${siteUrl}/letter`,
  };

  return [
    {
      url: `${siteUrl}/`,
      lastModified: modified("home"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/zh`,
      lastModified: modified("home"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/letter`,
      lastModified: modified("letter"),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: { languages: letterLanguages },
    },
    {
      url: `${siteUrl}/zh/letter`,
      lastModified: modified("letter"),
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: { languages: letterLanguages },
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: modified("privacy"),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
    {
      url: `${siteUrl}/zh/privacy`,
      lastModified: modified("privacy"),
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
  ];
}
