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

log "Generating types..."

need_cmd pnpm

# Typical type generation steps might include:
# - Prisma client
# - OpenAPI types
# - Zod schema outputs
# - SDK type bundles

# Prisma (storage)
if [[ -f "packages/storage/package.json" ]] && cat packages/storage/package.json | grep -q "prisma:generate"; then
  log "Generating Prisma client..."
  (cd packages/storage && pnpm -s prisma:generate)
else
  warn "No packages/storage prisma:generate script found; skipping."
fi

# OpenAPI types (sdk-js)
if [[ -f "packages/sdk-js/package.json" ]] && cat packages/sdk-js/package.json | grep -q "generate"; then
  log "Generating SDK types..."
  (cd packages/sdk-js && pnpm -s generate)
else
  warn "No packages/sdk-js generate script found; skipping."
fi

log "Type generation complete."
