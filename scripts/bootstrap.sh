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

log "Bootstrapping Winmem repo..."

need_cmd node
need_cmd corepack || true

# Ensure pnpm via corepack
if command -v corepack >/dev/null 2>&1; then
  log "Enabling corepack..."
  corepack enable >/dev/null 2>&1 || true
fi

need_cmd pnpm
need_cmd git

# Optional tools
if ! command -v turbo >/dev/null 2>&1; then
  warn "turbo not found (will use pnpm scripts). Consider: pnpm add -g turbo"
fi

log "Installing dependencies..."
pnpm install --frozen-lockfile=false

log "Preparing environment templates..."
if [[ ! -f ".env" && -f ".env.example" ]]; then
  cp .env.example .env
  log "Created .env from .env.example"
else
  log ".env already exists (skipping)."
fi

log "Running initial build (fast path)..."
pnpm -s build || warn "Initial build failed (this may be expected before services are configured)."

log "Bootstrap complete."
