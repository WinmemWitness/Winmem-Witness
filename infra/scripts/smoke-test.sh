#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:8787}"
READONLY_KEY="${WINMEM_API_KEY_READONLY:-dev_readonly_key_change_me}"

echo "[winmem] Smoke testing API at ${API_URL}"

curl -sS "${API_URL}/health" | cat
echo ""

curl -sS "${API_URL}/v1/projects?limit=1" \
  -H "X-WINMEM-API-KEY: ${READONLY_KEY}" | cat
echo ""

echo "[winmem] Smoke test complete."
