#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: restore-db.sh <backup.sql.gz>"
  exit 1
fi

BACKUP="$1"
DB_URL="${DATABASE_URL:-postgresql://winmem:winmem@localhost:5432/winmem}"

echo "[winmem] Restoring database from ${BACKUP}"

gunzip -c "${BACKUP}" | psql "${DB_URL}"

echo "[winmem] Restore complete."
