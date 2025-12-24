# Multi-Tenancy

Multi-tenancy allows multiple organizations/projects to share a single Winmem deployment.

## Goals

- isolate tenants securely
- limit blast radius
- enforce quotas and rate limits
- support project-scoped credentials

## Isolation Model

- tenant ID is a mandatory partition key for all records
- API enforces tenant scoping and RBAC
- optional: separate DB schemas per tenant (advanced)
- separate blob storage prefixes per tenant

## Quotas

- max projects per tenant
- max ingestion rate
- max storage size
- export frequency limits
- LLM usage limits

## Operational Practices

- never reuse admin keys
- audit tenant permission changes
- maintain per-tenant encryption keys (optional)
- separate worker queues by tenant to prevent starvation

## Recommended MVP Approach

- shared Postgres with strict tenant_id constraints
- shared Redis with namespaced keys
- project-scoped API keys
- per-tenant rate limits at API and worker layers
