# Supply Chain Provenance Refactor — #872

**Author:** Christoph Bauer  **Date:** 2026-03-30

## Overview

Aid supply chains involve multiple handoffs: donor → logistics provider →
regional warehouse → field partner → beneficiary. Each handoff is an
opportunity for diversion. This refactor adds immutable on-chain provenance
tracking at every handoff point.

## New Provenance Chain Model

```
Donor Commitment
       │
       ▼ (Campaign Creation Event on-chain)
Campaign Escrow Funded
       │
       ▼ (Supply Chain Initialized Event)
Logistics Handoff 1: Donor → Logistics Provider
       │ IPFS: shipping manifest CID
       ▼ (HandoffRecorded Event)
Logistics Handoff 2: Logistics Provider → Regional Hub
       │ IPFS: warehouse receipt CID
       ▼ (HandoffRecorded Event)
Field Partner Distribution
       │ IPFS: distribution list CID
       ▼ (HandoffRecorded Event)
Beneficiary Receipt Confirmed
       │ IPFS: delivery confirmation CID
       ▼ (DisbursementSettled Event)
```

## Contract Changes

Added `record_handoff(env, from: Address, to: Address, shipment_id: u64, manifest_cid: String)` to the Aid Escrow contract. Each handoff emits a `HandoffRecorded` event with the manifest IPFS CID, enabling auditors to reconstruct the complete supply chain for any disbursement.

## Donor Transparency Benefit

The ReliefFlow donor dashboard now shows supply chain progress in real time.
A donor contributing $500 to a medical supplies campaign can see exactly
which warehouse their contribution is currently staged in, without any
reliance on NGO self-reporting.
