# Helm Charts

Winmem Helm chart is located at `infra/helm/winmem`.

## Local Lint

```bash
helm lint infra/helm/winmem
```

## Template Render

```bash
helm template winmem infra/helm/winmem -f infra/helm/winmem/values.yaml
```

## Notes

- Provide `external.databaseUrl` and `external.redisUrl` for real deployments.
- Do not commit production secrets into values files.
