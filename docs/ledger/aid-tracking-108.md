# Aid Tracking Ledger — Feature #108

**Author:** Nour Khalil  **Date:** 2026-04-29

## Overview

This change advances ReliefFlow's on-chain aid tracking capability. Every
disbursement transaction now carries a full provenance chain: from the original
donor commitment through campaign allocation, beneficiary verification, and
final settlement — all anchored immutably on Stellar Soroban.

## Changes

### AidRecord Struct Extension
Added `campaign_id`, `donor_ref`, and `delivery_hash` to the `AidRecord`
struct stored in the Aid Escrow contract. The `delivery_hash` is an IPFS CID
of the physical delivery confirmation document (photo evidence, GPS coordinates,
field worker signature) anchored at time of disbursement.

### Tracking Functions
- `get_aid_record(disbursement_id) -> AidRecord` — full provenance query
- `get_campaign_disbursements(campaign_id) -> Vec<u64>` — all disbursements for a campaign
- `get_beneficiary_receipts(beneficiary_hash) -> Vec<AidRecord>` — privacy-preserving beneficiary lookup using hash of identity

### Donor Transparency
Real-time donor dashboard data now sourced directly from on-chain events.
The `DisbursementExecuted` event schema extended with `campaign_id` and
`delivery_confirmation_hash` for downstream indexer consumption.

## Impact

This closes the accountability loop: donors can now trace their specific
contribution from wallet to beneficiary delivery confirmation — without
requiring any PII to leave the off-chain registry.
