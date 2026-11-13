import {
  isPublicContactEmail,
  normalizePublicHttpsUrl,
  publicUrlLabel,
} from "./public-address.mjs";

// These are the sources of the dated screenshots and product paths.
export const recordedCompanyLinks = {
  agentCoach: "https://agentcoach-three.vercel.app/",
  localhost: "https://localhostchinav1.vercel.app/",
  bioaxis: "https://bioaxisv3.vercel.app/",
} as const;

function readHttpsUrl(name: string, fallback: string) {
  const raw = process.env[name]?.trim();
  return raw ? normalizePublicHttpsUrl(raw, name) : fallback;
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

  if (!isPublicContactEmail(email)) {
    throw new Error(`${name} must be a single plain email address.`);
  }

  return email;
}

export const publicCompanyLinks = {
  agentCoach: readHttpsUrl(
    "XENTRA_AGENT_COACH_URL",
    recordedCompanyLinks.agentCoach,
  ),
  localhost: readHttpsUrl(
    "XENTRA_LOCALHOST_URL",
    recordedCompanyLinks.localhost,
  ),
  bioaxis: readHttpsUrl(
    "XENTRA_BIOAXIS_URL",
    recordedCompanyLinks.bioaxis,
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
      value: publicUrlLabel(contactProfileUrl),
      opensNewWindow: true,
    };
