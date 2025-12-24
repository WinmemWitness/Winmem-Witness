# Threat Model

This document outlines the main security assumptions, assets, threats, and mitigations for Winmem deployments.

## Security Goals

1. **Integrity**: Stored events/memories must not be silently modified.
2. **Verifiability**: Consumers must be able to verify records from on-chain sources.
3. **Availability**: The stack should degrade gracefully under load or partial failure.
4. **Confidentiality (optional)**: Some deployments may restrict access to raw/derived data.
5. **Least privilege**: Services and users should have minimal permissions.

## Assets

- Project definitions and source lists
- Raw references and fetched transaction payloads
- Normalized events
- Witness logs / memory entries
- Audit batches and Merkle roots
- Export artifacts
- Access tokens and API keys
- Operational logs and metrics

## Trust Assumptions

- Solana RPC providers are untrusted for integrity; they are data sources that must be cross-checkable by signature.
- Postgres is trusted for availability but not for integrity; integrity must be protected by proofs and optional signing.
- Operators control secrets and deployment configuration.
- Optional LLM providers are untrusted; outputs must be constrained and verifiable.

## Threats & Mitigations

### T1: Database tampering (events/memories modified)
**Mitigations**
- Canonical hashing for every item.
- Merkle batching; store roots and proofs.
- Optional: sign batch roots with an operator key.
- Optional: anchor Merkle roots on-chain (strong external integrity).

### T2: Malicious RPC provider (returns incomplete/incorrect data)
**Mitigations**
- Always store and expose the transaction signature.
- Provide verification instructions to re-fetch by signature from independent RPCs.
- Use multi-RPC quorum reads for critical anchors.
- Maintain ingestion metadata about which RPC returned which payload.

### T3: Replay / duplication (duplicate ingestion)
**Mitigations**
- Idempotent jobs and deduplication keys (signature + project ID).
- Transaction-level uniqueness constraints.
- Queue de-duplication and distributed locks.

### T4: DoS via large projects or hostile input
**Mitigations**
- Rate limiting and quotas (per tenant/project).
- Backpressure via queues.
- Bounded batch sizes and proof windows.
- API pagination and query timeouts.
- Optional: WAF/edge rate limiting.

### T5: Secrets leakage (logs, traces, config)
**Mitigations**
- Redaction middleware for logs.
- Use secret managers in production (KMS, Vault).
- Avoid logging request bodies and tokens.
- Rotate keys regularly.

### T6: LLM prompt injection / unsafe outputs
**Mitigations**
- Treat LLM output as untrusted.
- Use strict schemas for outputs.
- Store prompt + model metadata; never store secrets in prompts.
- Allow disabling LLM features.

### T7: Supply-chain compromise
**Mitigations**
- Dependency review workflow.
- Pin versions and verify lockfiles.
- CodeQL + vulnerability scanners.
- Signed releases (optional).

## Deployment Hardening Checklist

- Use TLS for API endpoints.
- Enforce auth (API keys/OAuth) for non-public deployments.
- Separate DB credentials for read/write services.
- Enable backups and test restores.
- Configure resource limits in Kubernetes.
- Use dedicated RPC endpoints with proper rate limits.
