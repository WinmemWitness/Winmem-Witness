# Terminology

This document defines the canonical terms used throughout Winmem.

## Project
A tracked entity defined by one or more Solana sources (addresses, program IDs) and policies.

## Source
An ingestion origin. Examples:
- Address source: all transactions involving an address
- Program source: all transactions invoking a program
- Account snapshot source: periodic reads of an account state

## Raw Reference (Raw Ref)
A minimal on-chain pointer:
- signature
- slot
- blockTime
- cluster
- RPC source used
- status/error fields

## Normalized Event
A deterministic, structured representation derived from raw transaction data.
Winmem aims to keep event formats stable over time.

## Witness Log
A durable memory entry that compresses a time window into a human-readable but structured artifact.
Witness logs must link back to raw refs and events.

## Memory Entry
A record stored in the memories table. Can include:
- witness logs
- snapshots
- lifecycle transitions
- archive metadata

## Audit Proof
A set of cryptographic artifacts that allow verification:
- canonical hash for an item
- Merkle proof path
- Merkle root for the batch/window
- batch metadata (range, timestamp)

## Canonical Serialization
A stable method of turning an object into bytes for hashing.
Canonical JSON is required to avoid ambiguity.

## Merkle Batch
A batch/window of items that share a Merkle root, typically defined by:
- time range
- slot range
- project ID
- batch size limit

## Legacy Runtime
A system state that indicates the project has no active maintenance, but remains observable and verifiable.

## Archive Mode
A system state where the project becomes read-only and exports become the primary interface.

## Multi-Tenancy
A deployment mode where multiple organizations/projects share a single stack with strict boundaries and access controls.
