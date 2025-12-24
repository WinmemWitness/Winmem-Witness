# Disaster Recovery

This document outlines a recovery plan for catastrophic failures.

## Scenarios

- Postgres corruption or loss
- Blob storage loss
- Compromised API keys
- RPC provider outage
- Cluster outage (Kubernetes)

## Recovery Strategy

### Postgres Loss
- restore latest backup
- replay WAL if available
- reconcile checkpoints
- re-run proof building for recent windows

### Blob Loss
- restore from versioned bucket
- re-export missing artifacts from DB if possible
- validate checksums

### Key Compromise
- revoke keys
- rotate all service credentials
- invalidate sessions and tokens
- audit access logs for suspicious actions

### RPC Outage
- failover to secondary provider
- reduce ingestion concurrency
- pause non-critical backfills

## DR Drills

- run quarterly DR drills
- verify restore time objective (RTO)
- verify recovery point objective (RPO)

## Integrity Checks Post-DR

- sample verify memory entries vs raw signatures
- verify recent Merkle batches
- compare anchored roots if enabled
