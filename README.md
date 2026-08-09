# Xentra

Premium group website for Xentra, an AI-native operating group building vertical companies for trust-heavy markets.

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
