# Runbooks

This document lists common operator tasks and their recommended procedures.

## Backfill a Project

1. Increase worker concurrency for backfill queues.
2. Set a slot/time range.
3. Monitor queue depth and RPC error rates.
4. Verify proof batches after completion.

## Investigate RPC Failures

1. Check provider status and rate limits.
2. Switch to secondary endpoints.
3. Reduce concurrency and enable backoff.
4. Re-run failed jobs.

## Database Performance Degradation

1. Identify slow queries via metrics.
2. Add indexes for hot paths.
3. Partition tables if needed.
4. Archive old event data.

## Proof Verification Incident

1. Pause batch finalization.
2. Sample compare memory items and raw signatures.
3. Rebuild batch root and compare.
4. If anchored: compare on-chain root.
5. Issue an incident report and rotate credentials if needed.

## Export Failures

1. Validate blob storage credentials.
2. Check disk space and quotas.
3. Retry export with smaller windows.
4. Validate checksums after completion.
