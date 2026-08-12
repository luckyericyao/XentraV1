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

function readVerifiedEmail(name: string, verificationName: string) {
  const email = process.env[name]?.trim();
  const verified = process.env[verificationName] === "1";

  if (!verified) {
    return null;
  }

  if (!email) {
    throw new Error(`${name} is required when ${verificationName}=1.`);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(`${name} must be a valid email address.`);
  }

  return email;
}

function displayHttpsUrl(value: string) {
  const url = new URL(value);
  const path = url.pathname.replace(/\/+$/, "");

  return `${url.hostname.replace(/^www\./, "")}${path}`;
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

const verifiedContactEmail = readVerifiedEmail(
  "XENTRA_CONTACT_EMAIL",
  "XENTRA_CONTACT_EMAIL_VERIFIED",
);
const contactProfileUrl = readHttpsUrl(
  "XENTRA_CONTACT_URL",
  "https://github.com/luckyericyao/",
);

export const publicContact = verifiedContactEmail
  ? {
      kind: "email" as const,
      href: `mailto:${verifiedContactEmail}`,
      value: verifiedContactEmail,
      opensNewWindow: false,
    }
  : {
      kind: "profile" as const,
      href: contactProfileUrl,
      value: displayHttpsUrl(contactProfileUrl),
      opensNewWindow: true,
    };
