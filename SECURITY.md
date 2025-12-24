# Security Policy (Winmem)

Winmem takes security seriously. This document describes supported versions, how to report vulnerabilities, how to deploy Winmem safely, and the security architecture assumptions that shape the project.

> If you believe you have found a security vulnerability, **do not open a public issue**. Please follow the responsible disclosure process below.

---

## Table of contents

- [Supported versions](#supported-versions)
- [Reporting a vulnerability](#reporting-a-vulnerability)
- [Coordinated disclosure timeline](#coordinated-disclosure-timeline)
- [Scope](#scope)
- [Security principles](#security-principles)
- [Threat model overview](#threat-model-overview)
- [Deployment security checklist](#deployment-security-checklist)
- [Secrets and key management](#secrets-and-key-management)
- [Authentication](#authentication)
- [Authorization and RBAC](#authorization-and-rbac)
- [Input validation and hardening](#input-validation-and-hardening)
- [Rate limiting and abuse controls](#rate-limiting-and-abuse-controls)
- [Data handling, redaction, and privacy](#data-handling-redaction-and-privacy)
- [Storage security](#storage-security)
- [On-chain anchoring security (optional)](#on-chain-anchoring-security-optional)
- [Webhooks security](#webhooks-security)
- [Dependency and supply chain security](#dependency-and-supply-chain-security)
- [Logging, audit trails, and observability](#logging-audit-trails-and-observability)
- [Incident response](#incident-response)
- [Security testing](#security-testing)
- [Hardening recommendations](#hardening-recommendations)
- [FAQ](#faq)

---

## Supported versions

Winmem is under active development. Security fixes are provided in:

- The latest tagged release
- The `main` branch (for users building from source)

If you run Winmem in production, you should:
- Track releases
- Pin versions
- Regularly upgrade
- Monitor CVEs for dependencies

---

## Reporting a vulnerability

### Preferred reporting channel

- **GitHub Security Advisory** (recommended, if the repository has Security Advisories enabled)

### Alternate reporting channel

- Contact the maintainers via the project’s official channel:
  - X: https://x.com/Winmemlabs

### What to include

Please include as much detail as possible:

- Affected component(s): API / Worker / Web / CLI / SDK / On-chain program
- Affected version(s) and deployment mode (Docker/K8s/Helm)
- Steps to reproduce (PoC, scripts, requests, logs)
- Impact analysis (data exposure, auth bypass, RCE, DoS, etc.)
- Any suggested mitigation
- Whether the issue is currently being exploited (if you suspect so)

### What **not** to do

- Do not publicly disclose the issue before a fix is available
- Do not attempt to access data you don’t own or have explicit permission to test
- Do not run destructive tests against production deployments without permission

---

## Coordinated disclosure timeline

We aim to follow a practical coordinated disclosure process:

- **Acknowledgment:** within 72 hours
- **Triage:** initial severity and scope assessment within 7 days
- **Fix:** depends on severity and complexity
- **Release:** patch release + mitigation guidance
- **Credit:** reporters are credited by default unless they request otherwise

For high-severity issues (e.g., auth bypass, RCE), we may ship emergency patches and recommend immediate mitigations.

---

## Scope

### In scope

- Winmem codebase (apps, packages, CLI)
- Official Docker images and Helm charts (if provided)
- Default configs and deployment scripts in `infra/`
- Optional on-chain program in `programs/`
- Supply-chain issues related to Winmem’s published artifacts

### Out of scope

- Vulnerabilities in third-party infrastructure not controlled by Winmem (cloud provider outages, misconfigured firewalls)
- Attacks requiring local root access on your host
- Weaknesses introduced by your custom modifications or custom plugins (unless they impact default behavior)
- Social engineering attacks

---

## Security principles

Winmem’s security design is built around:

- **Least privilege:** minimize permissions, separate duties
- **Defense in depth:** multiple overlapping controls
- **Secure defaults:** safe baseline config and hardening guidance
- **Auditability:** key actions are logged; data flows are inspectable
- **Determinism where possible:** canonical serialization and cryptographic proofs

---

## Threat model overview

Winmem commonly runs as:

- An API service exposed to the Internet (or internal networks)
- A Worker service with access to RPC providers and storage
- Optional Web UI for dashboards and admin functions
- Optional on-chain anchoring for audit roots

### Primary attacker goals

- Obtain unauthorized access to the API
- Exfiltrate sensitive data (tokens, secrets, internal exports)
- Tamper with audit proofs or archived snapshots
- Trigger expensive workloads (DoS / cost amplification)
- Abuse webhook endpoints or integrations

### Primary trust boundaries

- Internet ↔ API/Web ingress
- API ↔ Storage (Postgres/Redis/Blob)
- Worker ↔ RPC providers
- Worker ↔ LLM provider (optional)
- API ↔ Webhooks (outbound delivery)
- Operator ↔ CLI ↔ Deployment environment

---

## Deployment security checklist

If you deploy Winmem publicly, strongly consider:

- [ ] Run behind a reverse proxy / ingress with TLS (HTTPS)
- [ ] Put API behind auth (JWT/OAuth/API token) and disable public endpoints
- [ ] Use a private network for Postgres and Redis
- [ ] Use strong secrets and rotate them periodically
- [ ] Enable rate limiting and request size limits
- [ ] Enable redaction policies and avoid storing secrets in logs
- [ ] Use least-privilege service accounts in Kubernetes
- [ ] Restrict outbound egress (only RPC, LLM if enabled, webhook destinations)
- [ ] Pin versions and enable dependency scanning
- [ ] Monitor logs + metrics + alerts
- [ ] Backup Postgres and blob storage regularly

---

## Secrets and key management

Winmem commonly needs:

- JWT signing secret (API auth)
- Database credentials (Postgres)
- Redis credentials (optional)
- Blob storage credentials (optional, e.g., S3)
- Webhook signing secret (optional)
- LLM provider API keys (optional)
- On-chain anchor payer keypair (optional)

### Best practices

- **Never commit secrets** to git.
- Use secret managers in production (KMS/Vault/Secrets Manager).
- Prefer environment variables over config files for secrets.
- Use **distinct secrets** for different environments (dev/stage/prod).
- Rotate secrets on a schedule and after suspected compromise.
- Keep secrets out of logs, traces, and error messages.

### Key rotation

Winmem should support secret rotation operationally:

- JWT secret rotation: accept old + new for a grace period (if implemented)
- Webhook secret rotation: allow dual-signing temporarily
- On-chain payer rotation: replace payer keypair path and re-fund new payer

If your deployment doesn’t support dual secrets, rotate during a maintenance window.

---

## Authentication

Winmem typically supports:

- JWT-based auth (recommended baseline)
- Optional API tokens for service-to-service access (if implemented)
- Local dev credentials (seeded admin users) in dev mode only

### Guidelines

- Disable any default credentials in production
- Use strong password policy for local users (if enabled)
- Prefer SSO/OAuth via a reverse proxy if you run Winmem for organizations
- Set short access token TTLs and use refresh tokens if supported
- Ensure clock sync (NTP) for token validity

---

## Authorization and RBAC

Winmem should enforce role-based access control:

Common roles:
- **admin**: manage users, settings, exports, lifecycle actions
- **operator**: create projects, run audits, manage sources
- **viewer**: read-only access to dashboards and exported results

### Recommendations

- Avoid using `admin` tokens for automation
- Create scoped service accounts for automation tasks
- Apply least privilege to webhook configurations and export endpoints
- Audit privileged operations (export creation, archive freeze, key rotation)

---

## Input validation and hardening

Winmem services should:

- Validate JSON bodies using schemas (e.g., Zod/JSON Schema)
- Enforce strict content types
- Restrict request body sizes (protect against payload bombs)
- Normalize and validate Solana addresses/program IDs
- Protect file paths and filesystem operations against traversal

If you add new endpoints:
- Validate all inputs
- Reject unknown fields when appropriate
- Apply consistent error handling without leaking secrets

---

## Rate limiting and abuse controls

The API should rate-limit:

- Auth endpoints (login, token refresh)
- Export endpoints (expensive)
- Audit proof generation (CPU-heavy)
- Query endpoints that can produce large DB scans

Recommended controls:
- IP-based rate limiting at ingress
- User/token-based rate limiting inside the API
- Request timeouts
- Concurrency caps for expensive operations
- Queue backpressure and circuit breakers

---

## Data handling, redaction, and privacy

Winmem ingests public on-chain data, but operational data can still be sensitive:

- API access logs may contain metadata
- Config files can include internal URLs or identifiers
- Exports can aggregate data into easy-to-scrape form

### Redaction

Winmem should apply redaction to:

- Private keys / seed phrases
- Bearer tokens and API keys
- Email addresses (optional)
- Any operator-defined sensitive patterns

### LLM usage (optional)

If LLM summarization is enabled:

- Assume prompts and content may be sent to a third-party provider
- Minimize what you send: avoid secrets and internal identifiers
- Use redaction before summarization
- Prefer local models for high-sensitivity deployments

---

## Storage security

### Postgres

- Run on a private network
- Enforce TLS connections when crossing network boundaries
- Use least-privilege DB users
- Regularly backup and test restores
- Apply schema migrations from trusted CI/CD only

### Redis

- Never expose Redis publicly
- Use authentication and TLS if available
- Use key prefixes to avoid collisions
- Limit max memory and apply eviction policy appropriate to caching

### Blob storage (filesystem/S3)

- Restrict write access to the Winmem services only
- Use server-side encryption for S3 where possible
- Use bucket policies to block public reads
- Validate export signatures/hashes after download

---

## On-chain anchoring security (optional)

If you enable audit root anchoring:

- Treat the payer keypair as high-value
- Use a dedicated payer with limited SOL balance
- Restrict signing to only required instructions (post root, rotate auth)
- Keep program authority separate from payer (where possible)
- Monitor on-chain activity for unusual posts or rotations

If anchoring is disabled, Winmem remains auditable via exported proofs; anchoring only adds an additional public timestamp/commitment layer.

---

## Webhooks security

Winmem webhooks should:

- Sign payloads with HMAC (shared secret)
- Include a timestamp header to prevent replay (recommended)
- Include an event ID and idempotency key
- Support retries with exponential backoff
- Allow endpoint allowlisting to avoid SSRF

If you implement webhook receivers:
- Verify signature and timestamp
- Enforce strict JSON schema
- Apply rate limits
- Avoid reflecting payloads in responses

---

## Dependency and supply chain security

Winmem recommends:

- Pin versions and use lockfiles (pnpm-lock.yaml)
- Run dependency scanning in CI:
  - dependency review
  - CodeQL
  - SCA (software composition analysis)
- Use provenance where possible (SLSA/Sigstore) if publishing images
- Avoid installing postinstall scripts from untrusted packages

For contributors:
- Do not add dependencies without justification
- Prefer well-maintained libraries with security track records
- Keep transitive dependency count low

---

## Logging, audit trails, and observability

Winmem should log:

- authentication events (success/failure) without secrets
- RBAC denials
- export creation and download requests
- archive lifecycle actions (freeze/unfreeze)
- audit root generation results

Recommendations:
- Use structured JSON logs
- Redact sensitive values
- Set appropriate retention policies
- Use alerting on anomalous patterns (login spikes, export spikes, queue backlog)

---

## Incident response

If you suspect compromise:

1. **Contain**
   - Block ingress / rotate credentials
   - Disable webhook deliveries
   - Disable LLM integration temporarily
2. **Preserve evidence**
   - Snapshot logs and DB (read-only copy)
   - Export relevant audit trails
3. **Eradicate**
   - Patch and redeploy
   - Rotate all secrets
4. **Recover**
   - Restore from known-good backups if needed
   - Rebuild indexes/audit proofs if integrity is uncertain
5. **Postmortem**
   - Document cause and mitigation
   - Add regressions tests and monitoring

See also: `docs/security/incident-response.md`.

---

## Security testing

Recommended testing layers:

- Static analysis (CodeQL)
- Linting and type checking
- Unit tests for:
  - canonical JSON stability
  - hashing and Merkle correctness
  - RBAC policies
  - rate limiting behavior
- E2E tests for:
  - auth flows
  - export endpoints
  - archive lifecycle flows
- Fuzz tests (optional) for parsers and JSON canonicalization

---

## Hardening recommendations

### Network

- Terminate TLS at ingress
- Restrict API to authenticated users only
- Use WAF rules if public
- Block outbound egress except required providers

### Runtime

- Run containers as non-root
- Enable seccomp/AppArmor profiles
- Set CPU/memory limits
- Use read-only filesystem where possible
- Drop Linux capabilities

### Kubernetes

- Use separate namespaces
- Use NetworkPolicies
- Use PodSecurity admission (baseline/restricted)
- Use dedicated service accounts with minimal permissions
- Store secrets in Secret Manager and mount via CSI

---

## FAQ

### Is Winmem a security product?

No. Winmem is an archival/auditing runtime that improves verifiability and durability, but it does not guarantee safety of any token or project.

### Does Winmem store private keys?

By default, Winmem should not store private keys. However, your deployment configuration may include secrets. Use redaction and secret managers.

### Does LLM summarization leak data?

It can, depending on what you send. If you enable LLM, treat it as an external processor and minimize content. Consider local models for sensitive deployments.

### Can audit proofs be tampered with?

Audit proofs rely on canonical hashing and Merkle roots. If an attacker gains write access to your storage, they may tamper with stored proofs. Mitigate via:
- access controls
- backups
- optional on-chain anchoring
- signed exports

---

## Contact

- Website: https://winmem.tech/
- X: https://x.com/Winmemlabs
