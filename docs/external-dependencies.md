# External Launch Dependencies

This file records launch items that cannot be completed safely from this repository alone. Keep the verified public URLs in place until an owner confirms replacement targets and access.

## Custom domains

Status: pending DNS and deployment access.

The currently verified production addresses are:

- Xentra: `https://xentra-v1.vercel.app/`
- AI Agent Coach: `https://agentcoach-three.vercel.app/`
- Localhost: `https://localhostchinav1.vercel.app/`
- BioAxis: `https://bioaxisv3.vercel.app/`

No branded domain for Xentra or the three operating companies was confirmed in the available repositories or deployment configuration. The site keeps the verified defaults until an owner confirms replacement targets, then the build-time variables below can be set without editing page content directly.

Build-time replacement variables:

- `XENTRA_AGENT_COACH_URL`
- `XENTRA_LOCALHOST_URL`
- `XENTRA_BIOAXIS_URL`
- `XENTRA_CONTACT_EMAIL`

The URL variables must be absolute HTTPS URLs without query strings or hashes; invalid values fail the build. The email variable must be a valid address. When these values are supplied, run smoke with matching `SMOKE_AGENT_COACH_URL`, `SMOKE_LOCALHOST_URL`, `SMOKE_BIOAXIS_URL`, and `SMOKE_CONTACT_EMAIL` values so public links, evidence paths, JSON-LD, canonical output, and mailto actions are checked against the same targets.

## Enterprise email

Published address: `contact@xentra.ai`

Status: mailbox and delivery configuration not verified in this repository.

An owner with access to the domain registrar and mail provider must confirm the mailbox, MX records, SPF, DKIM, DMARC, and inbound delivery. Do not claim that the inbox is monitored or that a branded sending domain is configured until those checks are complete.

## Entity and team information

Status: factual input required.

The public site should only publish the legal entity name, jurisdiction, office details, team names, or partner claims after the owner supplies and confirms them. Until then, the site uses the group name and operating-company descriptions without inventing people, traction, funding, or legal status.
