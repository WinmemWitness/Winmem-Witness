#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="${1:-./backups}"
TS="$(date +%Y%m%d_%H%M%S)"
mkdir -p "${OUT_DIR}"

DB_URL="${DATABASE_URL:-postgresql://winmem:winmem@localhost:5432/winmem}"

echo "[winmem] Backing up database to ${OUT_DIR}/winmem_${TS}.sql.gz"

# Requires pg_dump available on host.
pg_dump "${DB_URL}" | gzip > "${OUT_DIR}/winmem_${TS}.sql.gz"

echo "[winmem] Backup done."
