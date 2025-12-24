#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

echo "[winmem] Starting dev stack..."

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required"
  exit 1
fi

docker compose -f infra/docker/docker-compose.dev.yml up -d --build

echo "[winmem] Dev stack started."
echo "API: http://localhost:8787"
echo "Web: http://localhost:3000"
