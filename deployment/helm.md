# Helm Deployment

Winmem ships with an official Helm chart.

## Install

```bash
helm install winmem infra/helm/winmem -f values.prod.yaml
```

## Configuration
All services can be configured via values.yaml.
Secrets should be injected externally.
