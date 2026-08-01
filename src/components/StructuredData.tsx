import type { Locale } from "@/lib/content";
import { siteContent } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";

type StructuredDataProps = {
  locale: Locale;
};

export function StructuredData({ locale }: StructuredDataProps) {
  const content = siteContent[locale];
  const siteUrl = getSiteUrl();
  const pageUrl = locale === "zh" ? `${siteUrl}/zh` : `${siteUrl}/`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Xentra",
        alternateName: "Xentra Operating Group",
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
        description: content.hero.body[0],
        knowsAbout: Array.from(
          new Set([
            ...content.hero.tags,
            ...content.companies.items.map((company) => company.vertical),
          ]),
        ),
        subOrganization: content.companies.items.map((company) => ({
          "@type": "Organization",
          name: company.title,
          url: company.href,
          description: company.headline,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Xentra",
        url: siteUrl,
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: ["en", "zh-CN"],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        name: content.hero.title,
        url: pageUrl,
        description: content.hero.body[0],
        inLanguage: content.lang,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        about: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
