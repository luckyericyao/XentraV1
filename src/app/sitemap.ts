import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { siteReviewDate } from "@/lib/site-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date(`${siteReviewDate.iso}T00:00:00.000Z`);
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

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/zh`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
    {
      url: `${siteUrl}/zh/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
  ];
}
