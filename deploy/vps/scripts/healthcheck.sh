#!/usr/bin/env bash

set -euo pipefail

FRONTEND_URL="${FRONTEND_URL:-https://<PRIMARY_DOMAIN>/healthz}"
API_URL="${API_URL:-https://api.<PRIMARY_DOMAIN>/api/v1/site-settings}"
ADMIN_URL="${ADMIN_URL:-https://admin.<PRIMARY_DOMAIN>/admin/login}"

check_url() {
    local name="$1"
    local url="$2"

    echo "Sprawdzam: $name -> $url"
    curl --fail --show-error --silent --location "$url" >/dev/null
}

check_url "frontend" "$FRONTEND_URL"
check_url "api" "$API_URL"
check_url "admin" "$ADMIN_URL"

echo "Healthcheck zakończony sukcesem."