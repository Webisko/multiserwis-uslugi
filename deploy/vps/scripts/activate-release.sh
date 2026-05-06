#!/usr/bin/env bash

set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/multiserwis}"
RELEASE_ID="${1:-}"
FRONTEND_RELEASE_DIR="$APP_ROOT/frontend/releases/$RELEASE_ID"
BACKEND_RELEASE_DIR="$APP_ROOT/backend/releases/$RELEASE_ID"
FRONTEND_CURRENT_LINK="$APP_ROOT/frontend/current"
BACKEND_CURRENT_LINK="$APP_ROOT/backend/current"
BACKEND_SHARED_DIR="$APP_ROOT/backend/shared"
PHP_BIN="${PHP_BIN:-php}"
KEEP_RELEASES="${KEEP_RELEASES:-5}"

if [ -z "$RELEASE_ID" ]; then
    echo "Użycie: $0 <release-id>" >&2
    exit 1
fi

if [ ! -d "$FRONTEND_RELEASE_DIR/dist" ]; then
    echo "Brakuje katalogu frontendu dla release: $FRONTEND_RELEASE_DIR/dist" >&2
    exit 1
fi

if [ ! -f "$BACKEND_RELEASE_DIR/backend/artisan" ]; then
    echo "Brakuje backendu Laravel dla release: $BACKEND_RELEASE_DIR/backend" >&2
    exit 1
fi

mkdir -p "$BACKEND_SHARED_DIR/storage/app" \
         "$BACKEND_SHARED_DIR/storage/framework/cache" \
         "$BACKEND_SHARED_DIR/storage/framework/sessions" \
         "$BACKEND_SHARED_DIR/storage/framework/views" \
         "$BACKEND_SHARED_DIR/storage/logs" \
         "$BACKEND_SHARED_DIR/database"

if [ ! -f "$BACKEND_SHARED_DIR/.env" ]; then
    echo "Brakuje współdzielonego pliku .env: $BACKEND_SHARED_DIR/.env" >&2
    exit 1
fi

if [ ! -f "$BACKEND_SHARED_DIR/database/database.sqlite" ]; then
    touch "$BACKEND_SHARED_DIR/database/database.sqlite"
fi

rm -rf "$BACKEND_RELEASE_DIR/backend/storage"
ln -sfn "$BACKEND_SHARED_DIR/storage" "$BACKEND_RELEASE_DIR/backend/storage"

rm -f "$BACKEND_RELEASE_DIR/backend/.env"
ln -sfn "$BACKEND_SHARED_DIR/.env" "$BACKEND_RELEASE_DIR/backend/.env"

mkdir -p "$BACKEND_RELEASE_DIR/backend/database"
rm -f "$BACKEND_RELEASE_DIR/backend/database/database.sqlite"
ln -sfn "$BACKEND_SHARED_DIR/database/database.sqlite" "$BACKEND_RELEASE_DIR/backend/database/database.sqlite"

pushd "$BACKEND_RELEASE_DIR/backend" >/dev/null
"$PHP_BIN" artisan migrate --force
"$PHP_BIN" artisan config:cache
"$PHP_BIN" artisan route:cache
"$PHP_BIN" artisan view:cache
popd >/dev/null

ln -sfn "$FRONTEND_RELEASE_DIR" "$FRONTEND_CURRENT_LINK"
ln -sfn "$BACKEND_RELEASE_DIR" "$BACKEND_CURRENT_LINK"

if command -v systemctl >/dev/null 2>&1; then
    systemctl reload nginx || true
    systemctl reload php8.4-fpm || true
fi

find "$APP_ROOT/frontend/releases" -mindepth 1 -maxdepth 1 -type d | sort | head -n -"$KEEP_RELEASES" | xargs -r rm -rf
find "$APP_ROOT/backend/releases" -mindepth 1 -maxdepth 1 -type d | sort | head -n -"$KEEP_RELEASES" | xargs -r rm -rf

echo "Release $RELEASE_ID został aktywowany."