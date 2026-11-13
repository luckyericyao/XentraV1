export function getSiteUrl(environment: Record<string, string | undefined> = process.env) {
  const configured = environment.NEXT_PUBLIC_SITE_URL?.trim();
  const production = environment.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const variable = configured
    ? "NEXT_PUBLIC_SITE_URL"
    : "VERCEL_PROJECT_PRODUCTION_URL";
  const rawUrl = configured || production;

  if (!rawUrl) {
    return "https://xentra-v1.vercel.app";
  }

  const error = () => new Error(`${variable} must be an HTTPS origin without credentials, a path, a query, or a hash.`);
  let url: URL;

  try {
    if (/\s/.test(rawUrl) || rawUrl.startsWith("/")) {
      throw error();
    }
    url = new URL(rawUrl.includes("://") ? rawUrl : `https://${rawUrl}`);
  } catch {
    throw error();
  }

  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.href !== `${url.origin}/`
  ) {
    throw error();
  }

  return url.origin;
}
