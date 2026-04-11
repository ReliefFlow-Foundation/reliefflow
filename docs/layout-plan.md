# Layout Plan

## Repository map
- `contracts/beneficiary-registry`
- `contracts/aid-escrow`
- `contracts/fraud-challenge`
- `apps/web`
- `docs`
- `configs`

## Product surfaces
- Beneficiary intake and verification console
- Aid campaign treasury and tranche manager
- Disbursement monitoring and exception queue
- Donor impact transparency dashboard

## Runtime layout (monorepo)

| Path | Responsibility |
| --- | --- |
| `contracts/*` | Soroban smart contracts — source of truth for rules |
| `apps/web` | Next.js — marketing, dashboards, contributor UX |
| `apps/backend` | Fastify — integrations, optional server-side signing gateway |

See also `docs/SITE_MAP.md` for the web route backlog.
