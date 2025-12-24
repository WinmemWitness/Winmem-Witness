# Contributing to Winmem

Thanks for considering contributing.

## Ways to contribute

- bug reports (with reproducible steps)
- documentation improvements
- new parsers (Solana programs)
- storage backends
- UI improvements (retro Windows UI)
- performance and reliability fixes

## Development setup

Prereqs:
- Node 20+
- pnpm
- Docker (for local stack)
- Rust + Solana toolchain (optional, for on-chain program)

```bash
./scripts/bootstrap.sh
cp .env.example .env
pnpm dev:up
```

## Repo conventions

- TypeScript everywhere (Node + web)
- `packages/*` contain reusable libraries
- `apps/*` contain deployable services
- prefer pure functions and deterministic outputs in core/crypto layers
- add tests for parsers and canonical hashing changes

## Commit style

We use Conventional Commits enforced by commitlint:

- feat: new feature
- fix: bug fix
- docs: documentation changes
- chore: tooling or maintenance
- refactor: refactor without behavior change
- test: tests
- ci: CI workflows

Examples:
- `feat(api): add archive export endpoint`
- `fix(worker): prevent duplicate root batches`

## Pull requests

- keep PRs focused
- include tests if behavior changes
- update docs when user-facing behavior changes
- run:
  - `./scripts/lint.sh`
  - `./scripts/test.sh`

## Code of Conduct

By participating, you agree to `CODE_OF_CONDUCT.md`.

## Contact

Website: https://winmem.tech/
X: https://x.com/Winmemlabs
