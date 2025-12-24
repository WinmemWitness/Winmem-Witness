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

log "Building all packages/apps..."

need_cmd pnpm

# Prefer turbo for build graph if available
if command -v turbo >/dev/null 2>&1; then
  turbo build
else
  pnpm -s build
fi

log "Build complete."
