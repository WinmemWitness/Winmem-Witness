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

log "Running tests..."

need_cmd pnpm

# Unit + integration
if pnpm -s -w run | grep -q "test"; then
  pnpm -s test
else
  warn "No root test script found; trying turbo test..."
  if command -v turbo >/dev/null 2>&1; then
    turbo test
  else
    err "No test runner available. Add a root 'test' script or install turbo."
    exit 1
  fi
fi

# Optional e2e
if pnpm -s -w run | grep -q "test:e2e"; then
  log "Running e2e tests..."
  pnpm -s test:e2e
else
  warn "No test:e2e script found; skipping e2e."
fi

log "Tests complete."
