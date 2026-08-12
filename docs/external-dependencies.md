# External Launch Dependencies

This file records launch items that cannot be completed safely from this repository alone. Keep the verified public URLs in place until an owner confirms replacement targets and access.

## Custom domains

Status: pending domain ownership, DNS, and deployment access.

The currently verified production addresses are:

- Xentra: `https://xentra-v1.vercel.app/`
- AI Agent Coach: `https://agentcoach-three.vercel.app/`
- Localhost: `https://localhostchinav1.vercel.app/`
- BioAxis: `https://bioaxisv3.vercel.app/`

No owned branded domain for Xentra or the three operating companies was confirmed in the available repositories or deployment configuration. On 13 Aug 2026, `xentra.ai` resolved to an Atom domain-sale page, so it must not be used for the website or email until ownership and DNS control are independently confirmed. The site keeps the verified defaults until an owner confirms replacement targets.

Build-time replacement variables:

- `XENTRA_AGENT_COACH_URL`
- `XENTRA_LOCALHOST_URL`
- `XENTRA_BIOAXIS_URL`
- `XENTRA_CONTACT_URL`
- `XENTRA_CONTACT_EMAIL`
- `XENTRA_CONTACT_EMAIL_VERIFIED`

URL variables must be absolute HTTPS URLs without query strings or hashes; invalid values fail the build. An email is published only when `XENTRA_CONTACT_EMAIL` is valid and `XENTRA_CONTACT_EMAIL_VERIFIED=1`. Run smoke with the matching `SMOKE_*` URL, email, and verification variables so public links, JSON-LD, canonical output, and contact actions are checked against the same targets.

## Public contact and enterprise email

Published contact: `https://github.com/luckyericyao/`

Status: repository-owner profile verified; enterprise mailbox unavailable.

`contact@xentra.ai` was removed from the public site because the domain redirects to a sale page and no MX route was present during the 13 Aug 2026 check. An owner with registrar and mail-provider access must confirm domain ownership, mailbox delivery, MX, SPF, DKIM, and DMARC before enabling a branded address. Do not claim that an inbox is monitored until an end-to-end delivery test passes.

## Entity and team information

Status: factual input required.

The public site should only publish the legal entity name, jurisdiction, office details, team names, or partner claims after the owner supplies and confirms them. Until then, the site uses the group name and operating-company descriptions without inventing people, traction, funding, or legal status.
