#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:8787}"
ADMIN_KEY="${WINMEM_API_KEY_ADMIN:-dev_admin_key_change_me}"

echo "[winmem] Seeding demo data into ${API_URL}"

curl -sS -X POST "${API_URL}/v1/projects" \
  -H "Content-Type: application/json" \
  -H "X-WINMEM-API-KEY: ${ADMIN_KEY}" \
  -d '{
    "name": "Demo Project",
    "description": "A seeded demo project for local testing.",
    "cluster": "mainnet-beta"
  }' | jq .

echo "[winmem] Seed complete."
