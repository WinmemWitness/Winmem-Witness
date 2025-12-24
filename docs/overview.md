# Overview

Winmem is a deployable runtime that keeps Solana projects *observable, inspectable, and auditable* even when maintainers leave.

It is designed for the post-execution lifecycle of a project:
- indexing and normalizing on-chain activity into stable events
- compressing events into durable "witness logs"
- producing verifiable audit proofs (canonical hashes + Merkle roots)
- exporting snapshots for long-term archiving and migration

## What Winmem Is

- A **self-hostable index + memory layer** for Solana projects.
- A **witness system** that records a project's on-chain footprint in a structured, queryable form.
- A **verification-first runtime** that produces cryptographic proofs for every memory entry.
- A **deployment primitive**: one repo, one config file, one command to bring it up.

## What Winmem Is Not

- Not an operating system.
- Not a blockchain.
- Not a miracle engine that fixes bugs or brings liquidity.
- Not a custodial service.

## Core Outcomes

1. **Visibility**: Projects remain queryable via API and UI (status, activity, logs).
2. **Memory**: Activity is retained as canonical events and summaries.
3. **Auditability**: Every record can be traced back to on-chain data and proofs.
4. **Portability**: You can export a full snapshot and rehydrate elsewhere.

## Who Uses It

- Protocol teams who want post-maintenance continuity.
- Communities maintaining abandoned but valuable projects.
- Researchers and analysts who need verified historical records.
- Infrastructure operators running registries of projects.

## High-Level Workflow

1. Define a project (addresses/program IDs, cluster, RPC sources, retention policy).
2. Start the stack (API + worker + DB + queue).
3. Worker ingests signatures and transactions, normalizes them into events.
4. Memory engine writes witness logs and builds Merkle proofs.
5. Optional: anchor Merkle roots on-chain for external verification.
6. API/UI exposes the data for search, export, and audit.

## Design Principles

- **Verifiable by default**: canonical serialization, stable hashing, deterministic Merkle construction.
- **No hidden state**: any derived output must link back to raw on-chain sources.
- **Self-host first**: avoid mandatory third-party services.
- **Failure-tolerant**: resumable checkpoints, idempotent jobs, replayable pipelines.
