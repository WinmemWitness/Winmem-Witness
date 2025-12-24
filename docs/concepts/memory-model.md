# Memory Model

Winmem stores multiple layers of memory, each with different durability and verification properties.

## Memory Layers

1. **Raw References**
   - signatures, slots, blockTime, status
   - minimal storage; always retained

2. **Normalized Events**
   - deterministic representations of transactions
   - stable schemas
   - retained based on policy

3. **Witness Logs**
   - compressed summaries of events
   - retained longer than events by default
   - always linked to proofs

4. **Snapshots**
   - point-in-time exports of state
   - stored as blobs with content hashes

5. **Audit Proofs**
   - Merkle batches and inclusion proofs
   - can be anchored on-chain

## Canonical Boundaries

Canonical objects should include only:
- immutable identifiers
- deterministic content fields
- provenance fields required for verification

Exclude:
- secrets
- transient operational details
- user-specific data unless explicitly configured

## Retention and Compaction

Retention policy defines:
- what is kept forever (raw refs, proof roots)
- what is compacted (events -> witness logs)
- what is discarded (optional for high-volume projects)

Compaction strategy:
- keep raw refs always
- allow dropping full events after a window if witness logs exist
- keep proofs for both events and witness logs if needed

## Consistency Guarantees

- memory items are append-only by default
- updates are modeled as new items with references
- batch proofs are immutable once finalized
