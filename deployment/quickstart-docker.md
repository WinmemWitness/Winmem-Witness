# Quickstart: Docker Compose

## Requirements
- Docker >= 24
- Docker Compose v2
- Node 20+ (for CLI usage)

## Steps

```bash
cp .env.example .env
docker compose -f infra/docker/docker-compose.yml up -d
```

## Services
- API: http://localhost:8080
- Web: http://localhost:3000
- Grafana: http://localhost:3001
- Prometheus: http://localhost:9090

## Notes
Docker Compose is recommended for local testing and small-scale deployments.
