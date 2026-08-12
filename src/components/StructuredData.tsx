import type { Locale } from "@/lib/content";
import { siteContent } from "@/lib/content";
import { publicContact } from "@/lib/public-config";
import { siteReviewDate } from "@/lib/site-meta";
import { getSiteUrl } from "@/lib/site-url";

type StructuredDataProps = {
  locale: Locale;
};

export function StructuredData({ locale }: StructuredDataProps) {
  const content = siteContent[locale];
  const siteUrl = getSiteUrl();
  const pageUrl = locale === "zh" ? `${siteUrl}/zh` : `${siteUrl}/`;
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "Xentra",
        alternateName: "Xentra Operating Group",
        url: siteUrl,
        logo: `${siteUrl}/favicon.svg`,
        description: content.hero.body[0],
        ...(publicContact.kind === "profile"
          ? { sameAs: [publicContact.href] }
          : {}),
        knowsAbout: Array.from(
          new Set([
            ...content.hero.tags,
            ...content.companies.items.map((company) => company.vertical),
          ]),
        ),
        ...(publicContact.kind === "email"
          ? {
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "partnerships",
                email: publicContact.value,
                url: `${pageUrl}#contact`,
                availableLanguage: ["en", "zh-CN"],
              },
            }
          : {}),
        subOrganization: content.companies.items.map((company) => ({
          "@type": "Organization",
          "@id": `${company.href}#organization`,
          name: company.title,
          url: company.href,
          description: company.headline,
          parentOrganization: {
            "@id": organizationId,
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Xentra",
        url: siteUrl,
        description: content.hero.body[0],
        publisher: {
          "@id": organizationId,
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
        dateModified: siteReviewDate.iso,
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": organizationId,
        },
        about: {
          "@id": organizationId,
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
