# Data Redaction

Winmem aims to be verifiable and transparent, but some deployments require redaction of sensitive information.

## What Can Be Sensitive

- internal RPC URLs and API keys
- private project identifiers
- user tokens and headers
- logs that include request bodies
- exported artifacts that contain internal notes or annotations
- LLM prompts that accidentally include secrets

## Redaction Strategy

1. **Never ingest secrets**
   - Do not store headers or auth tokens.
   - Do not persist raw HTTP responses.
2. **Centralized log redaction**
   - A redaction layer applies to all logs/traces.
   - Patterns include:
     - Authorization headers
     - API keys
     - session tokens
3. **Config redaction**
   - Provide `.env.example` files without secrets.
   - Provide runtime validation that fails if secrets are printed.
4. **Export redaction**
   - Exports should include a manifest listing redacted fields.
   - Hashes and proofs must remain valid; do not redact fields used in canonical hashing.
     - If you need redaction, design the canonical object to exclude sensitive fields.

## Canonical Hash Boundary

To keep verification stable:
- only include immutable, non-sensitive fields in canonical objects
- store sensitive fields in separate records that are explicitly excluded from hashing

## Recommended Redaction Patterns

- `Authorization: Bearer ...`
- `x-api-key: ...`
- `DATABASE_URL=...`
- `REDIS_URL=...`
- `*_SECRET=*`
- `*_TOKEN=*`

## Operational Controls

- Use a secret manager (KMS/Vault).
- Prevent debug-level logs in production.
- Restrict export downloads (signed URLs, expiring links).
