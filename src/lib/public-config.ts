const verifiedCompanyDefaults = {
  agentCoach: "https://agentcoach-three.vercel.app/",
  localhost: "https://localhostchinav1.vercel.app/",
  bioaxis: "https://bioaxisv3.vercel.app/",
} as const;

function readHttpsUrl(name: string, fallback: string) {
  const raw = process.env[name]?.trim();

  if (!raw) {
    return fallback;
  }

  let url: URL;

  try {
    url = new URL(raw);
  } catch {
    throw new Error(`${name} must be an absolute HTTPS URL.`);
  }

  if (url.protocol !== "https:" || url.search || url.hash) {
    throw new Error(`${name} must be an HTTPS origin or path without a query.`);
  }

  return `${url.toString().replace(/\/+$/, "")}/`;
}

function readEmail(name: string, fallback: string) {
  const email = process.env[name]?.trim();

  if (!email) {
    return fallback;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`${name} must be a valid email address.`);
  }

  return email;
}

export const publicCompanyLinks = {
  agentCoach: readHttpsUrl(
    "XENTRA_AGENT_COACH_URL",
    verifiedCompanyDefaults.agentCoach,
  ),
  localhost: readHttpsUrl(
    "XENTRA_LOCALHOST_URL",
    verifiedCompanyDefaults.localhost,
  ),
  bioaxis: readHttpsUrl(
    "XENTRA_BIOAXIS_URL",
    verifiedCompanyDefaults.bioaxis,
  ),
} as const;

export const contactEmail = readEmail(
  "XENTRA_CONTACT_EMAIL",
  "contact@xentra.ai",
);
