# Quickstart (Docker)

This guide brings up Winmem locally using Docker Compose.

## Requirements

- Docker Desktop / Docker Engine
- Node.js 20+
- pnpm 9+

## Steps

1. Clone repository

```bash
git clone https://github.com/<your-org>/winmem.git
cd winmem
```

2. Configure environment

```bash
cp .env.example .env
# edit .env as needed
```

3. Start services

```bash
pnpm install
pnpm turbo run build
docker compose -f infra/docker/docker-compose.yml up -d
```

4. Verify health

```bash
curl http://localhost:8787/health
```

5. Open UI (if enabled)

- http://localhost:3000

## Common Issues

- Port conflicts: change service ports in compose or stop conflicting services.
- Slow RPC: use a dedicated provider or increase timeouts.
- Database migrations: run `pnpm turbo run db:migrate`.

## Next

- Configure your first project manifest.
- Read [Self-Hosting](./self-hosting.md) for production recommendations.
