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

log "Generating OpenAPI spec..."

need_cmd pnpm
need_cmd node

# Assumes apps/api exposes a generator script that merges route metadata into openapi.yaml.
# If you keep OpenAPI manually, this script can validate formatting instead.

TARGET="docs/api/openapi.yaml"

# Prefer api package generator if present
if [[ -f "apps/api/package.json" ]] && cat apps/api/package.json | grep -q "generate:openapi"; then
  (cd apps/api && pnpm -s generate:openapi)
else
  warn "apps/api generate:openapi script not found; validating existing OpenAPI file..."
  if [[ ! -f "$TARGET" ]]; then
    err "Missing $TARGET"
    exit 1
  fi
  # Minimal check: file is not empty
  if [[ ! -s "$TARGET" ]]; then
    err "$TARGET is empty."
    exit 1
  fi
fi

log "OpenAPI generation/validation complete."
