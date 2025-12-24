# Data Migrations

Winmem uses database migrations to evolve schemas.

## Principles

- backward-compatible changes first
- avoid breaking older workers during rolling updates
- use additive migrations where possible
- migrate data in background jobs for large tables

## Recommended Workflow

1. Add new columns/tables (nullable).
2. Deploy new code that writes to both old/new fields if needed.
3. Backfill data with a worker job.
4. Switch reads to the new fields.
5. Remove old fields in a later release.

## Versioning

- tag releases with semver
- record schema version in the DB
- maintain a migration changelog

## Safety

- run migrations in staging before production
- snapshot DB before major migrations
- monitor slow queries and lock contention during migrations
