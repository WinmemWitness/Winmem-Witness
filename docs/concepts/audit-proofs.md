# Audit Proofs

Audit proofs are the cryptographic backbone of Winmem.

Every memory item can be verified by:
1. canonical serialization
2. hashing
3. inclusion proof in a Merkle batch
4. optional anchoring of batch roots on-chain

## Canonical Serialization

Winmem uses canonical JSON:
- stable key ordering
- strict typing and normalization
- stable encoding

This prevents ambiguous hashing.

## Hashing

- hash algorithm: SHA-256 (default)
- output: hex-encoded 32-byte digest

## Merkle Batching

Items are grouped into batches based on:
- project ID
- time/slot window
- maximum batch size (to keep proofs bounded)

Each batch stores:
- root hash
- batch metadata (range, count, created_at)
- hash of the canonical batch manifest

## Inclusion Proofs

For each item:
- store leaf hash
- store proof path (sibling hashes + left/right indicators)

A verifier can recompute the root and compare.

## On-Chain Anchoring (Optional)

Operators can anchor batch roots on Solana:
- write root + metadata hash into a program account
- or store root in a Memo instruction (weaker but cheaper)
- anchoring makes tampering detectable without trusting the DB

## Verification Cookbook

- Fetch memory item JSON
- Compute canonical hash (client-side)
- Compare with stored leaf hash
- Fetch proof path and batch root
- Verify inclusion
- If anchored: fetch on-chain root and compare

## Failure Modes

- Missing RPC data: verifier uses another RPC
- Root mismatch: indicates tampering or inconsistent canonicalization
- Proof missing: batch not finalized or storage error
