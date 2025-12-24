# CLI Examples

This page provides practical workflows for operators and developers.

## Example: Local Docker Quickstart

```bash
git clone https://github.com/<your-org>/winmem.git
cd winmem
cp .env.example .env
pnpm install
pnpm -C packages/cli build
pnpm -C packages/cli link --global

mkdir ~/winmem-home && cd ~/winmem-home
winmem init
winmem up
winmem status
```

## Example: Add a Program Project

```bash
winmem add-project --file ./projects/program-project.yaml
```

## Example: Backfill a Time Window

```bash
winmem backfill --project proj_123 --from-slot 250000000 --to-slot 250500000
```

## Example: Trigger an Export

```bash
winmem export --project proj_123 --format tar.gz
```

## Example: Verify a Memory Entry Locally

```bash
winmem verify --memory mem_123 --output ./verification-report.json
```

## Example: Rotate API Keys

```bash
winmem keys rotate --role project --project proj_123
```
