# Incident Response

This document provides a minimal incident response process for Winmem operators.

## Severity Levels

- SEV0: Active compromise, data integrity at risk, widespread outage
- SEV1: Significant service degradation or potential integrity risk
- SEV2: Partial outage, limited scope
- SEV3: Minor issue or near-miss

## Detection Sources

- Error budgets / SLO alerts
- Unusual queue growth
- Database integrity checks failing
- Unexpected changes in Merkle roots or batch boundaries
- Vulnerability scanner alerts
- User reports

## First Response Checklist

1. **Triage**
   - Identify impacted components (API/worker/indexer/web/storage/RPC).
   - Capture logs and traces with request IDs.
   - Determine blast radius (tenant/project).

2. **Containment**
   - Rotate credentials (API keys, DB, blob storage).
   - Block suspicious IPs or revoke keys.
   - Pause ingestion if integrity is in doubt.

3. **Eradication**
   - Patch vulnerable components.
   - Remove malicious artifacts.
   - Validate dependencies.

4. **Recovery**
   - Restore from backups if necessary.
   - Rebuild proofs and compare anchored roots.
   - Re-enable ingestion with controlled rate.

5. **Postmortem**
   - Write timeline, root cause, and corrective actions.
   - Add monitoring and tests to prevent recurrence.

## Integrity Validation Procedures

- Verify sampled memory entries against raw on-chain signatures.
- Rebuild Merkle batches for a time window and compare stored roots.
- If roots are anchored on-chain, compare on-chain root values with DB roots.
- Produce a signed incident report artifact.

## Communication

- Public deployments: provide a status update within the first hour for SEV0/SEV1.
- Private deployments: notify tenant owners immediately.
- Security disclosures: follow SECURITY.md policy.
