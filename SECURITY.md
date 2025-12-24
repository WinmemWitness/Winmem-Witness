# Security Policy

Winmem takes security seriously. If you discover a vulnerability, please report it responsibly.

## Supported versions

Winmem is under active development. Security patches are released on the latest `main` branch and tagged releases.

## Reporting a vulnerability

Please report security issues privately.

- Preferred: open a GitHub Security Advisory (if available on the repo)
- Alternative: contact the team on X: https://x.com/Winmemlabs

Include:
- affected version / commit
- steps to reproduce
- impact analysis (what can an attacker do?)
- any proof-of-concept

## Security design goals

- **Least privilege**: API keys and secrets scoped to the minimum required operations.
- **Auditability**: privileged actions are logged and can be exported.
- **Defense in depth**: RBAC, rate limiting, input validation, and redaction.
- **Secure by default**: safe configuration templates and guidance.

## Key areas

- Authentication: JWT and optional API tokens
- Authorization: RBAC for admin/operator/viewer
- Data handling: redaction policy for secrets/PII
- Storage: Postgres + Redis; optional blob storage
- Supply chain: dependency review + CodeQL + SCA

## Coordinated disclosure

We will acknowledge receipt of a report within 72 hours and provide an estimated timeline for mitigation after triage.
