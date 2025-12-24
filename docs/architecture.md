# Architecture

Winmem is a modular system built around a simple pipeline:

Raw chain data -> Normalized events -> Memory entries -> Proofs -> Query & Export

## Components

### apps/indexer (optional)
High-throughput ingestion service for large backfills and multi-project fleets.
- signature streaming (by address/program)
- checkpointing
- RPC pooling and rate-limit handling
- durable queues

### apps/worker
Pipeline executor that turns raw chain data into durable memory.
- ingestion jobs: signatures, transactions, account snapshots
- normalization jobs: parse programs, SPL Token, Token-2022, Metaplex, Memo
- lifecycle jobs: activity detection, "legacy" state transitions
- memory jobs: witness summaries, compression
- audit jobs: canonical hashing, Merkle roots, proof sets
- archive jobs: freeze mode + exports

### apps/api
The read/write boundary for the system.
- project registry
- event queries
- memory queries
- audit endpoints
- exports and webhooks
- admin and multi-tenant boundaries

### packages/core
Domain models and engines:
- normalization engine
- witness engine
- memory engine
- audit engine
- archive engine
- policy modules: retention, redaction, sampling, lifecycle

### packages/solana
Solana integration toolkit:
- RPC client pool
- transaction fetch + retries
- parsers and event adapters
- backfill helpers
- checkpoint utilities

### packages/storage
Persistence layer:
- PostgreSQL for relational data and search indexes
- Redis for queues, deduplication, locks
- optional: ClickHouse for high-volume event storage
- optional: S3/filesystem for blob snapshots and exports

### packages/cryptography
Verification primitives:
- canonical JSON
- stable hashing
- Merkle tree construction
- optional signing of snapshots

### apps/web
A retro Windows-style UI for:
- project dashboards
- witness logs explorer
- audit proof viewer
- export/download panel
- operator settings

## Data Flow

1. **Ingest**
   - obtain signatures for project sources
   - fetch full transaction payloads and relevant account states

2. **Normalize**
   - parse transactions into domain events
   - produce stable event objects with deterministic fields

3. **Persist**
   - store raw tx references (signatures, slots, block time)
   - store normalized events and link to raw refs

4. **Witness**
   - compress event sequences into witness logs (structured summaries)
   - record time windows and boundaries

5. **Prove**
   - canonicalize event/memory objects
   - hash them deterministically
   - build Merkle roots for batches (per time window)
   - persist proof paths and batch metadata

6. **Expose**
   - API serves projects, events, memories, proofs, archives
   - webhooks notify external systems
   - exports snapshot to portable artifacts

## Storage Model

- projects
- sources (addresses/programs)
- raw_refs (signature, slot, blocktime, err)
- events (normalized)
- memories (witness logs)
- audit_batches (Merkle roots, ranges)
- audit_items (hashes, proof paths)
- archives (frozen snapshots)
- exports (artifact metadata)

## Verification Model

A verifier can:
- fetch a memory entry
- fetch its canonical hash and Merkle proof path
- fetch the batch root
- verify inclusion locally
- optionally verify that the root was anchored on-chain

## Scalability Notes

- ingestion is horizontally scalable if idempotent and checkpointed
- normalization is CPU-bound; use worker concurrency controls
- proof building can be incremental
- large fleets should use dedicated indexer + queue partitioning
