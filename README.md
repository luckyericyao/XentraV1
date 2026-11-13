# Xentra

Xentra is an AI-native operating group building vertical companies for markets
where information is fragmented, judgment is expensive, and delivery still
requires accountable operators.

[View the public group site](https://xentra-v1.vercel.app/)

[Read the founder letter](https://xentra-v1.vercel.app/letter) — a short note
on judgment, accountability, and why three very different markets break at the
same moment of doubt, followed by nine public product paths across the three
operating companies.

## Operating companies

- [AI Agent Coach](https://agentcoach-three.vercel.app/) — AI capability for
  teams adopting AI into real workflows.
- [Localhost](https://localhostchinav1.vercel.app/) — private cultural travel
  through trusted local hosts.
- [BioAxis](https://bioaxisv3.vercel.app/) — sourcing intelligence for life
  science consumables.

## Operating principles

- Problem before technology.
- Evidence before reach.
- Delivery before scale.

The public site links each company to live product evidence. It does not claim
customers, commercial performance, funding, or legal status without a source
that can be independently verified.

## Development

```bash
pnpm install
pnpm dev
```

## Validation

With Node 24 available, run the complete local gate:

```bash
pnpm check:local
```

It tests, lints, and builds a temporary copy of the current source under
`artifacts/local-checks/`, then runs smoke on a loopback port. It reuses installed
dependencies without copying dotenv files or replacing the checkout's `.next`.
An existing preview can remain running. The command cleans up its workspace
and servers and atomically writes `artifacts/local-checks/latest.json`.
It does not run browser checks, deploy, verify external company sites, or use
public deployment configuration inherited from your shell.

Run `pnpm check:local --fixtures` to also rehearse the custom build-record and
email-rendering modes using reserved `.test` addresses. It neither visits these
addresses nor sends mail. Both fixtures stay in the temporary workspace. Use
`pnpm build` separately to refresh a production-mode preview of this checkout.
The gate still uses Next's existing font build chain; it is not an offline build.

The individual commands remain available:

```bash
pnpm lint
pnpm test
pnpm build
SMOKE_BASE_URL=http://127.0.0.1:3101 pnpm smoke
```

Run `pnpm start --hostname 127.0.0.1 --port 3101` after building and before smoke.
Unit tests use Node 24's built-in TypeScript support, with no additional test
dependencies. They cover navigation state, local link validation, and public
configuration. Smoke checks generated bilingual routes, script-free 404 recovery,
local link targets, metadata, security headers, compiled stylesheets, and
share and optimized image responses; it does not simulate a browser.

Set `SMOKE_EXTERNAL=1` to include the three live operating-company URLs.

The current local review and acceptance criteria are recorded in
[the optimization report](docs/optimization-2026-11-09.md). Browser verification
and external delivery are reported separately from successful local checks.

## Public configuration

Canonical URLs, share-image origins, structured data, and sitemap URLs use
`NEXT_PUBLIC_SITE_URL`, then `VERCEL_PROJECT_PRODUCTION_URL`, then the existing
Xentra default. Temporary `VERCEL_URL` previews do not change that identity.
An override must be an HTTPS origin without credentials, base path, query, or hash.
Page modification dates are maintained separately from public evidence dates.

Verified company URLs can be replaced at build time with
`XENTRA_AGENT_COACH_URL`, `XENTRA_LOCALHOST_URL`, and
`XENTRA_BIOAXIS_URL`. These override the current visit links; dated screenshots
and product paths remain attached to their recorded sources. The public
build-record profile can be replaced with
`XENTRA_CONTACT_URL`; it is not presented as a private contact channel.

An email is published only when `XENTRA_CONTACT_EMAIL` is a single plain mailbox
and `XENTRA_CONTACT_EMAIL_VERIFIED=1` is supplied. The flag records owner
verification; syntax checks and local rendering do not prove delivery.

## Content integrity

Portfolio evidence may describe only capabilities currently visible on the
linked public company sites. Do not add customer names, commercial metrics,
contracts, funding, or operating claims without a source that can be verified.
