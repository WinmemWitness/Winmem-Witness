# Troubleshooting

This guide helps diagnose common issues.

## API Returns 500

- Check API logs for requestId.
- Verify database connectivity (`DATABASE_URL`).
- Verify Redis connectivity (`REDIS_URL`).
- Ensure migrations are applied.

## Worker Not Ingesting

- Check worker logs for RPC errors (429/timeout).
- Verify RPC URL configuration.
- Check queue depth.
- Confirm sources are registered for the project.

## Slow Queries

- Confirm pagination is enabled.
- Add indexes for common filters (projectId, createdAt, signature).
- Consider partitioning event tables by time.

## Proof Verification Fails

- Recompute canonical hash locally and compare.
- Confirm canonicalization version (schema changes can break).
- Rebuild batch and compare root.
- If on-chain anchored, compare on-chain root.

## Export Not Downloadable

- Validate blob storage configuration.
- Check signed URL expiration settings.
- Validate export status and checksums.

## Useful Commands

- `winmem doctor`
- `winmem status`
- `winmem logs --service worker`
