export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    "https://xentra-lmk9.vercel.app";
  const absoluteUrl = /^https?:\/\//.test(rawUrl)
    ? rawUrl
    : `https://${rawUrl}`;

  return absoluteUrl.replace(/\/+$/, "");
}
