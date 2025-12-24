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

log "Running linters..."

need_cmd pnpm

# TypeScript lint + formatting checks
if pnpm -s -w run | grep -q "lint"; then
  pnpm -s lint
else
  warn "No root lint script found; attempting turbo lint..."
  if command -v turbo >/dev/null 2>&1; then
    turbo lint
  else
    err "No lint runner available. Add a root 'lint' script or install turbo."
    exit 1
  fi
fi

log "Lint complete."
