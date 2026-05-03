# Beneficiary Signature Verification — Fix #904

**Author:** Nour Khalil  **Date:** 2026-05-03

## Problem

The beneficiary verification flow in the Aid Escrow contract accepted
`require_auth()` from any address in the beneficiary registry, including
addresses that had been flagged for deduplication. A beneficiary registered
in two campaigns could collect disbursements from both simultaneously,
defeating the deduplication guard.

## Root Cause

```rust
// BEFORE (vulnerable): auth check without deduplication guard
pub fn collect_disbursement(env: Env, beneficiary: Address, campaign_id: u64) {
    beneficiary.require_auth();  // ← checks signature but not dedup status
    // ... disburse
}
```

The `require_auth()` call correctly verifies the cryptographic signature
but does not check whether the beneficiary has been flagged by the
deduplication engine as already collected in another campaign.

## Fix

```rust
// AFTER: auth + dedup status check
pub fn collect_disbursement(env: Env, beneficiary: Address, campaign_id: u64) {
    beneficiary.require_auth();

    // Check deduplication registry before disbursing
    let dedup_key = DataKey::BeneficiaryDedup(beneficiary.clone(), campaign_id);
    if env.storage().persistent().has(&dedup_key) {
        panic!("BeneficiaryAlreadyCollected");
    }

    // Mark as collected before transfer (check-effects-interactions)
    env.storage().persistent().set(&dedup_key, &true);

    // ... proceed with disbursement
}
```

## Testing

Added `test_dedup_prevents_double_collection` — verifies that a second
`collect_disbursement` call from the same beneficiary/campaign pair panics.

## Security Impact

Without this fix, a single beneficiary could extract 2× their entitled
amount by registering in overlapping campaigns. On a $10M campaign with
50,000 beneficiaries, this could represent up to $400K in fraud exposure.
