# Scaling

Winmem scales along three axes:
- ingestion throughput
- normalization CPU
- storage and query performance

## API Scaling

- stateless; scale replicas horizontally
- use caching for hot queries
- enforce pagination and query limits

## Worker Scaling

- scale by queue partition
- ensure jobs are idempotent
- use bounded concurrency
- separate backfill workers from realtime workers

## Indexer Scaling (optional)

- dedicated service for high-volume signature streaming
- checkpoint frequently
- partition by project or source

## Database Scaling

- add read replicas for API-heavy deployments
- partition large tables by tenant/project/time
- archive older event rows
- keep indexes aligned with query patterns

## Proof Scaling

- build proofs per window (hour/day)
- finalize batches asynchronously
- store proofs in compact formats

## UI Scaling

- serve static assets via CDN
- SSR only where needed
