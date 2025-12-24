# Self-Hosting

This guide covers production-oriented considerations.

## Minimum Production Checklist

- TLS termination at the edge (Ingress, reverse proxy, or cloud LB)
- Dedicated Postgres with backups and PITR
- Redis with persistence and eviction controls
- Dedicated Solana RPC provider(s) with rate limits
- Centralized logs and metrics (OTel + Prometheus)
- Restricted admin access (VPN / allowlists)
- Secrets managed via KMS/Vault

## Recommended Topology

- API: 2+ replicas behind a load balancer
- Worker: 2+ replicas with queue partitioning
- Indexer (optional): scale independently for backfills
- Web: static or SSR behind the same ingress
- Postgres: managed service recommended
- Redis: managed service recommended

## Secrets

Do not store secrets in Git.
Use:
- Kubernetes secrets + external secret managers
- cloud secret managers

## RPC Strategy

- Maintain a pool of RPC endpoints.
- Use a "fast path" provider and a "verification path" provider.
- Retries and timeouts should be bounded.

## Backups

- Postgres daily backups + WAL archiving
- Blob storage lifecycle rules
- Regular restore drills

## Updates

- Use rolling updates.
- Keep schema migrations backward-compatible where possible.
