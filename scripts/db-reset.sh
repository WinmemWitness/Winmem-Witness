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

log "Resetting database (DANGEROUS)"

need_cmd pnpm

: "${WINMEM_ENV:=dev}"
if [[ "$WINMEM_ENV" == "prod" ]]; then
  err "Refusing to reset DB in prod. Set WINMEM_ENV=dev."
  exit 1
fi

warn "This will drop and recreate the database schema for your current DATABASE_URL."
warn "Proceeding in 5 seconds... (Ctrl+C to abort)"
sleep 5

if [[ -d "packages/storage/prisma" ]]; then
  (cd packages/storage && pnpm -s prisma:reset)
else
  err "packages/storage/prisma not found. Cannot reset."
  exit 1
fi

log "Database reset complete."
