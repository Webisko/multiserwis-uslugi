#!/usr/bin/env bash

set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/multiserwis/backend/current/backend}"
DB_PATH="${DB_PATH:-$APP_ROOT/database/database.sqlite}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/multiserwis}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

mkdir -p "$BACKUP_DIR"

if ! command -v sqlite3 >/dev/null 2>&1; then
    echo "sqlite3 CLI nie jest dostępne. Zainstaluj sqlite3 przed uruchomieniem backupu." >&2
    exit 1
fi

if [ ! -f "$DB_PATH" ]; then
    echo "Nie znaleziono bazy sqlite pod ścieżką: $DB_PATH" >&2
    exit 1
fi

TARGET_DB="$BACKUP_DIR/database-$TIMESTAMP.sqlite"
sqlite3 "$DB_PATH" ".backup '$TARGET_DB'"
gzip -f "$TARGET_DB"

find "$BACKUP_DIR" -type f -name 'database-*.sqlite.gz' -mtime "+$RETENTION_DAYS" -delete

echo "Backup sqlite zapisany do: $TARGET_DB.gz"