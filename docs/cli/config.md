# CLI Configuration

Winmem uses two layers of configuration:
- environment variables (`.env`)
- runtime manifests (`winmem.yaml`, `project.yaml`)

## .env

Common variables:

- `DATABASE_URL`
- `REDIS_URL`
- `WINMEM_RPC_URL`
- `WINMEM_API_KEY_ADMIN`
- `WINMEM_LOG_LEVEL`

## winmem.yaml

The deployment manifest that configures:
- service ports
- storage backends
- queue settings
- observability endpoints
- default policies

## project.yaml

Each project manifest defines:
- cluster
- sources (addresses/program IDs)
- retention policy
- sampling settings
- archive rules

## Validation

The CLI should validate config before deployment:
- required fields
- correct Solana cluster values
- retention bounds
- sampling percent range (0-100)
- rate limits

## Safe Defaults

- no public admin endpoints
- strict log redaction
- conservative ingestion concurrency
