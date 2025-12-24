# Kubernetes

This guide outlines a Kubernetes deployment using the manifests in `infra/k8s/` or the Helm chart.

## Prerequisites

- Kubernetes 1.27+
- Ingress controller (nginx, traefik, etc.)
- cert-manager (recommended)
- External Postgres and Redis (recommended)

## Deployment Options

1. Raw manifests (kustomize overlays)
2. Helm chart (`infra/helm/winmem`)

## Key Configuration

- `DATABASE_URL` (Secret)
- `REDIS_URL` (Secret)
- `WINMEM_RPC_URL` (ConfigMap/Secret)
- `WINMEM_API_KEY_*` (Secrets)
- resource limits for API and Worker
- HPA policies for scale

## Observability

- export traces to Tempo/Jaeger
- export metrics to Prometheus
- export logs to Loki/ELK

## Rolling Updates

- workers should be able to resume from checkpoints
- ensure job idempotency before scaling up
- use PodDisruptionBudgets for API

## Security

- run containers as non-root
- read-only root filesystem where possible
- network policies restricting DB/Redis access
