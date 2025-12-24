#!/usr/bin/env bash
set -euo pipefail

# Winmem repo scripts
# - safe defaults (set -euo pipefail)
# - helpful diagnostics
# - consistent tooling via pnpm + turbo

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

log()  { printf "\033[0;36m[winmem]\033[0m %s\n" "$*"; }
warn() { printf "\033[0;33m[winmem]\033[0m %s\n" "$*" >&2; }
err()  { printf "\033[0;31m[winmem]\033[0m %s\n" "$*" >&2; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { err "Missing required command: $1"; exit 1; }
}

cd "$ROOT_DIR"

log "Release pipeline (local helper)"

need_cmd pnpm
need_cmd git

# This script is designed to be used by CI, but can be used locally to validate:
# - clean git state
# - build
# - test
# - version bump (optional)
# - package publish (optional, typically CI-only)

if [[ -n "$(git status --porcelain)" ]]; then
  err "Working tree is not clean. Commit or stash changes before releasing."
  exit 1
fi

log "Running lint..."
./scripts/lint.sh

log "Running tests..."
./scripts/test.sh

log "Building..."
./scripts/build.sh

warn "Publish step is intentionally omitted for safety."
warn "In CI, publishing should be handled by a dedicated workflow with scoped tokens."

log "Release checks complete."
