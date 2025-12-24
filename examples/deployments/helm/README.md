# Helm example

For real Helm charts, see `infra/helm/winmem`.

This folder shows a minimal values file and a simple install command.

```bash
helm repo add winmem https://example.invalid/charts
helm install winmem winmem/winmem -f values.example.yaml -n winmem --create-namespace
```
