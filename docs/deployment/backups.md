# Backups

Backups are essential for self-hosted deployments.

## What to Back Up

- Postgres database
- Blob storage exports (S3/filesystem)
- Deployment manifests (winmem.yaml, project.yaml)
- Secrets (in a secure vault, not as plaintext backups)

## Postgres

- daily full backups
- WAL archiving (PITR)
- test restores regularly

## Redis

Redis should be considered a cache/queue, not a source of truth.
Backups are optional, but you should plan for:
- queue loss recovery by replaying ingestion from checkpoints

## Blob Storage

- enable versioning if possible
- lifecycle policies for old artifacts
- checksum validation during restore

## Restore Drill

At least monthly:
- restore Postgres to a staging environment
- run integrity checks (sample proof verification)
- validate API endpoints and exports
