/** @param {string} raw @param {string} variable */
export function normalizePublicHttpsUrl(raw, variable) {
  const invalid = () =>
    new Error(`${variable} must be an absolute HTTPS URL without credentials, a query, or a hash.`);
  if (!/^https:\/\/[^/]/i.test(raw) || /[\s\\?#]/.test(raw)) throw invalid();

  let url;
  try {
    url = new URL(raw);
  } catch {
    throw invalid();
  }
  if (url.protocol !== "https:" || url.username || url.password) throw invalid();

  return `${url.href.replace(/\/+$/, "")}/`;
}

/** @param {string} value */
export function publicUrlLabel(value) {
  const url = new URL(value);
  return `${url.host.replace(/^www\./, "")}${url.pathname.replace(/\/+$/, "")}`;
}

/** @param {string | undefined} value */
export function isPublicContactEmail(value) {
  if (!value || value.length > 254) return false;
  const [local, domain, ...extra] = value.split("@");
  if (!domain || extra.length || local.length > 64) return false;

  // A single plain mailbox, not a display name, recipient list, or mailto URI.
  const labels = domain.split(".");
  return /^[a-z0-9_+'-]+(?:\.[a-z0-9_+'-]+)*$/i.test(local) &&
    labels.length >= 2 &&
    labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}
