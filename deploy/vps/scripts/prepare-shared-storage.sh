#!/usr/bin/env bash

set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/multiserwis}"
BACKEND_SHARED_DIR="$APP_ROOT/backend/shared"

mkdir -p "$APP_ROOT/frontend/releases" \
         "$APP_ROOT/backend/releases" \
         "$BACKEND_SHARED_DIR/storage/app" \
         "$BACKEND_SHARED_DIR/storage/framework/cache" \
         "$BACKEND_SHARED_DIR/storage/framework/sessions" \
         "$BACKEND_SHARED_DIR/storage/framework/views" \
         "$BACKEND_SHARED_DIR/storage/logs" \
         "$BACKEND_SHARED_DIR/database"

if [ ! -f "$BACKEND_SHARED_DIR/database/database.sqlite" ]; then
    touch "$BACKEND_SHARED_DIR/database/database.sqlite"
fi

echo "Przygotowano katalogi releases/shared w: $APP_ROOT"
echo "Upewnij się jeszcze, że istnieje plik: $BACKEND_SHARED_DIR/.env"