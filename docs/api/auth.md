# Authentication

Winmem supports API key authentication by default.

## API Key Header

All authenticated requests include:

- Header: `X-WINMEM-API-KEY: <token>`

## Key Scoping

Recommended key types:
- Admin keys: operator-only
- Tenant owner keys: tenant scope
- Project keys: limited to one project
- Read-only keys: auditing and dashboards

## Rotation

- Rotate keys regularly (at least every 90 days).
- Revoke keys immediately after suspected leakage.
- Avoid embedding keys in client-side apps.

## Transport Security

- Use HTTPS in production.
- Set `Strict-Transport-Security` headers at the edge.

## Example

```bash
curl -H "X-WINMEM-API-KEY: $WINMEM_API_KEY" http://localhost:8787/v1/projects
```
