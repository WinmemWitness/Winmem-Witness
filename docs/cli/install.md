# CLI Installation

The Winmem CLI (`winmem`) is the recommended way to deploy and operate a self-hosted stack.

## Requirements

- Node.js 20+
- pnpm 9+
- Docker (for quickstart)
- Optional: Kubernetes + Helm (for production)

## Install from Source (recommended for early versions)

```bash
git clone https://github.com/<your-org>/winmem.git
cd winmem
pnpm install
pnpm -C packages/cli build
pnpm -C packages/cli link --global
winmem --help
```

## Install from npm (when published)

```bash
npm i -g @winmem/cli
winmem --help
```

## Verify Installation

```bash
winmem version
winmem doctor
```

## Shell Completion (optional)

```bash
winmem completion bash > /etc/bash_completion.d/winmem
```
