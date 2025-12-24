#!/usr/bin/env bash
set -euo pipefail

# This script demonstrates a simple key rotation workflow.
# In production, use a secret manager and rotate keys through your control plane.

LEN="${1:-32}"
NEW_ADMIN="$(openssl rand -hex ${LEN})"
NEW_READONLY="$(openssl rand -hex ${LEN})"

echo "WINMEM_API_KEY_ADMIN=${NEW_ADMIN}"
echo "WINMEM_API_KEY_READONLY=${NEW_READONLY}"

echo ""
echo "Store these values in your secret manager and restart services."
