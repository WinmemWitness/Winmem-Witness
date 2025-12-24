# Permissions

Winmem supports multiple deployment modes:
- single-tenant (simple)
- multi-tenant (shared infrastructure with strict boundaries)

This document describes recommended permissions for services and users.

## Service Accounts

### API service
- Read/write access to Postgres (project registry, events, memories, proofs).
- Read/write access to Redis (rate limits, locks, queues if API enqueues jobs).
- Access to blob storage for exports (write) and downloads (read).
- Ability to validate tokens and enforce RBAC.

### Worker service
- Read/write access to Postgres (raw refs, events, memories, proofs, archives).
- Read/write access to Redis queues and locks.
- Egress access to Solana RPC endpoints.
- Optional egress access to LLM provider.

### Web service
- Read-only access to API endpoints (through API token or public endpoints).
- No direct DB access.

## User Roles

### Owner (tenant-level)
- Manage tenant settings, keys, quotas.
- Create/update/delete projects within tenant.
- Configure sources and policies.
- Trigger exports and archive actions.

### Maintainer (project-level)
- Read/write on projects they maintain.
- Manage project sources/policies.
- Trigger backfills and exports for their projects.

### Auditor (read-only)
- Read access to projects/events/memories/proofs.
- Export read-only snapshots (if allowed).
- Cannot mutate projects or policies.

### Viewer (public)
- Limited read access to public projects.
- No access to secrets or internal metrics.

## RBAC Recommendations

- Prefer short-lived tokens where possible.
- Scope API keys to tenant and role.
- Support project-scoped keys for automation.

## API Key Types

- `WINMEM_API_KEY_ADMIN`: full control, use only for operators.
- `WINMEM_API_KEY_TENANT_OWNER`: tenant management.
- `WINMEM_API_KEY_PROJECT`: scoped to one project for CI/deploy pipelines.
- `WINMEM_API_KEY_READONLY`: auditing and dashboards.

## Auditing Permission Changes

- Log all permission changes with:
  - actor ID
  - target principal
  - timestamp
  - diff of scopes
- Include request IDs and source IPs in logs.
