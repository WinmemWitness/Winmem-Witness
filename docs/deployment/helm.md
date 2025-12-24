# Helm

Winmem provides a Helm chart under `infra/helm/winmem`.

## Install

```bash
helm repo add winmem https://<your-org>.github.io/winmem
helm repo update
helm install winmem winmem/winmem -n winmem --create-namespace -f values.prod.yaml
```

## Values

Key values typically include:
- image tags for api/worker/web
- ingress configuration
- external database and redis connection strings
- resources and autoscaling
- persistence settings for exports
- env vars and secrets

## Upgrade

```bash
helm upgrade winmem winmem/winmem -n winmem -f values.prod.yaml
```

## Rollback

```bash
helm rollback winmem 1 -n winmem
```

## CI Publishing

See `.github/workflows/helm-release.yml`.
