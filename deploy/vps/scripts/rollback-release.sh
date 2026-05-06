#!/usr/bin/env bash

set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/multiserwis}"
TARGET_RELEASE_ID="${1:-}"
FRONTEND_RELEASES_DIR="$APP_ROOT/frontend/releases"
BACKEND_RELEASES_DIR="$APP_ROOT/backend/releases"
FRONTEND_CURRENT_LINK="$APP_ROOT/frontend/current"
BACKEND_CURRENT_LINK="$APP_ROOT/backend/current"

if [ -z "$TARGET_RELEASE_ID" ]; then
    echo "Użycie: $0 <release-id>" >&2
    exit 1
fi

if [ ! -d "$FRONTEND_RELEASES_DIR/$TARGET_RELEASE_ID/dist" ]; then
    echo "Nie znaleziono release frontendu: $FRONTEND_RELEASES_DIR/$TARGET_RELEASE_ID" >&2
    exit 1
fi

if [ ! -f "$BACKEND_RELEASES_DIR/$TARGET_RELEASE_ID/backend/artisan" ]; then
    echo "Nie znaleziono release backendu: $BACKEND_RELEASES_DIR/$TARGET_RELEASE_ID" >&2
    exit 1
fi

ln -sfn "$FRONTEND_RELEASES_DIR/$TARGET_RELEASE_ID" "$FRONTEND_CURRENT_LINK"
ln -sfn "$BACKEND_RELEASES_DIR/$TARGET_RELEASE_ID" "$BACKEND_CURRENT_LINK"

if command -v systemctl >/dev/null 2>&1; then
    systemctl reload nginx || true
    systemctl reload php8.4-fpm || true
fi

echo "Rollback wykonany do release: $TARGET_RELEASE_ID"