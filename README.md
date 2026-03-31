# ReliefFlow — Humanitarian Aid Infrastructure Protocol

> Transparent. Direct. Cryptographically verifiable. Built on Stellar Soroban.

ReliefFlow is a decentralized protocol for the transparent, direct, and verifiable disbursement of humanitarian aid. It constructs a trustless "Aid Pipeline" that routes funds from international donors directly to verified beneficiaries—with full on-chain proof of every transaction and zero tolerance for disbursement leakage.

**Disbursement leakage** — the silent drain of aid funds to intermediaries, administrative overhead, and corruption — currently accounts for an estimated 20–30% loss on every dollar donated to humanitarian causes. ReliefFlow eliminates this by removing the intermediary layer entirely.

---

## The Problem We Solve

Traditional humanitarian aid flows through a chain of international organizations, national governments, regional bodies, and local NGOs before reaching a beneficiary. At each layer, funds are subject to administrative fees, currency conversion costs, corruption risk, and simple bureaucratic delays.

ReliefFlow compresses this chain to a single, automated smart contract execution. A donor in Switzerland funds an escrow. A beneficiary in Sudan receives a Stellar payment. The entire chain is publicly auditable in real time.

---

## Protocol Architecture

ReliefFlow is implemented as three interconnected Soroban smart contracts.

### Aid Escrow · `contracts/aid-escrow`

A specialized, sovereign vault for humanitarian capital.

- **Multi-Signature Approval** — Supports complex release conditions requiring consensus among a verified consortium of NGOs, UN agencies, or field monitors.
- **Campaign Structure** — Each relief campaign is an independent escrow instance with its own funding goal, beneficiary criteria, and timeline.
- **Asset Flexibility** — Accepts any Stellar-native asset (XLM, USDC, EURC) and handles currency conversion for beneficiary disbursement.
- **Transparent Accounting** — Every deposit and withdrawal is recorded with full metadata: donor identity (optional), campaign ID, and timestamp.

### Beneficiary Registry · `contracts/beneficiary-registry`

A privacy-first identity system for aid eligibility management.

- **Privacy by Design** — Beneficiary identities are stored as cryptographic hashes. No PII (name, address, biometrics) is ever written to the public ledger.
- **Eligibility Verification** — Field partners register beneficiaries using a verified onboarding flow. Eligibility criteria are encoded per campaign.
- **Dignity-First Architecture** — The system is designed to protect beneficiaries from surveillance, discrimination, or targeting based on their aid recipient status.
- **Deduplication** — Cryptographic uniqueness checks prevent a single individual from being registered under multiple identities across campaigns.

### Fraud Challenge · `contracts/fraud-challenge`

A decentralized auditing and dispute mechanism.

- **Community Monitoring** — Authorized monitors and community members can flag suspicious transactions with an evidence hash and stake.
- **Automatic Circuit Breaker** — Flagged flows are paused automatically pending review. No central administrator can override this.
- **Forensic Trail** — Every challenge, review, and resolution is recorded on-chain for permanent accountability.
- **Stake-Based Governance** — Malicious challenges are penalized; legitimate ones are rewarded, creating economic incentives for honest monitoring.

---

## Repository Layout

```
.
├── apps/
│   ├── backend/        # Fastify indexer: transparency API for donor dashboards
│   └── web/            # Next.js 14 PWA — optimized for low-bandwidth mobile
├── contracts/
│   ├── aid-escrow/         # Vault and multi-sig disbursement logic
│   ├── beneficiary-registry/ # Privacy-preserving identity system
│   └── fraud-challenge/    # Decentralized audit and dispute mechanism
├── docs/               # System architecture, data flows, audit reports
└── scripts/            # Deployment utilities and field partner tooling
```

---

## Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Rust | 1.78+ |
| Soroban CLI | 20+ |
| Node.js | 20+ |
| pnpm | 9+ |

### Build Smart Contracts

```bash
cargo build --target wasm32-unknown-unknown --release
```

### Run Tests

```bash
# Full test suite including disbursement flow and fraud challenge scenarios
cargo test --workspace
```

### Launch Applications

```bash
pnpm install
pnpm dev
# Donor dashboard: http://localhost:3000
# Transparency API: http://localhost:3001
```

---

## Aid Pipeline Flow

| Step | Actor | Action | Contract |
|------|-------|--------|----------|
| 1 | NGO | Create relief campaign with criteria | `aid-escrow` |
| 2 | Donors | Fund the campaign escrow | `aid-escrow` |
| 3 | Field Partner | Register beneficiaries (hashed) | `beneficiary-registry` |
| 4 | Protocol | Validate eligibility and release funds | `aid-escrow` + `beneficiary-registry` |
| 5 | Community | Monitor and challenge suspicious flows | `fraud-challenge` |

---

## Technical Stack

| Layer | Technology |
|-------|-----------|
| Smart Contracts | Rust · Soroban SDK |
| Backend | Fastify · TypeScript · Stellar Horizon API |
| Frontend | Next.js 14 · Tailwind CSS · Framer Motion |
| Identity | Cryptographic hashing · no PII on-chain |
| Wallet | Freighter · Stellar Mainnet |

---

## Contributing

ReliefFlow is open-source and structured to accept contributions from developers, humanitarian organizations, and independent researchers. See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

High-impact contribution areas:
- Field partner onboarding tooling (offline-capable PWA)
- Additional Stellar asset adapters (USDC, EURC)
- Multi-language beneficiary UI
- Formal verification of escrow release logic

---

## Security

All smart contract logic should be treated as holding real humanitarian capital. Security reviews are mandatory before any mainnet deployment. See [SECURITY.md](SECURITY.md) for our responsible disclosure policy and bug bounty program.

---

## License

MIT — open-source for the benefit of all.

---

*Direct aid. Real impact. Total transparency.*
