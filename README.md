# Xentra

Xentra is an AI-native operating group building vertical companies for markets
where information is fragmented, judgment is expensive, and delivery still
requires accountable operators.

[View the public group site](https://xentra-v1.vercel.app/)

[Read the founder letter](https://xentra-v1.vercel.app/letter) — a short note
on judgment, accountability, delivery, and the role of the parent company.

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

```bash
pnpm lint
pnpm build
SMOKE_BASE_URL=http://127.0.0.1:3101 pnpm smoke
```

Set `SMOKE_EXTERNAL=1` to include the three live operating-company URLs.

## Public configuration

Verified company URLs can be replaced at build time with
`XENTRA_AGENT_COACH_URL`, `XENTRA_LOCALHOST_URL`, and
`XENTRA_BIOAXIS_URL`. The public owner profile can be replaced with
`XENTRA_CONTACT_URL`.

An email is published only when both `XENTRA_CONTACT_EMAIL` and
`XENTRA_CONTACT_EMAIL_VERIFIED=1` are supplied. This prevents an unverified or
non-deliverable address from becoming part of the public trust surface.

## Content integrity

Portfolio evidence may describe only capabilities currently visible on the
linked public company sites. Do not add customer names, commercial metrics,
contracts, funding, or operating claims without a source that can be verified.
