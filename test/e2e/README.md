# End-to-end tests

These tests assume Docker is available and can boot the full stack:
- postgres
- redis
- api
- worker
- web (optional)

They validate:
- health endpoints
- auth token flow
- project creation + ingestion
- audit root generation
- export snapshot download

Run:
```bash
pnpm test:e2e
```
