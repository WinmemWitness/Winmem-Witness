# CLI Commands

This document describes the core CLI interface. Commands may evolve; refer to `winmem --help` for the latest output.

## Core

- `winmem init` — initialize a deployment directory and config
- `winmem up` — start the stack (Docker)
- `winmem down` — stop the stack (Docker)
- `winmem status` — show service health and project stats
- `winmem logs` — tail logs (API/worker)
- `winmem add-project` — register a project
- `winmem remove-project` — remove a project
- `winmem export` — create an export artifact
- `winmem backup` — backup database and manifests
- `winmem doctor` — diagnose environment issues

## Examples

### Initialize

```bash
mkdir winmem-home
cd winmem-home
winmem init
```

### Start

```bash
winmem up
```

### Add a project

```bash
winmem add-project --file ./projects/my-project.yaml
```

### Tail logs

```bash
winmem logs --service api
winmem logs --service worker
```

### Export snapshot

```bash
winmem export --project proj_123 --format tar.gz
```
