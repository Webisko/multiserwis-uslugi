# Wdrożenie VPS: Astro + Laravel + Filament

## Cel

Ten dokument materializuje Fazę 5 planu wdrożenia. Nie jest to jeszcze pełny automatyczny deploy produkcyjny, ale repo zawiera już gotowy pakiet startowy dla własnego VPS:

- rozdział domen frontendu, API i panelu administracyjnego
- szablony Nginx
- przykładowe timery systemd
- skrypt backupu sqlite
- prosty healthcheck HTTP

Pliki pomocnicze znajdują się w katalogu `deploy/vps/`.

## Rekomendowana topologia

Minimalny, prosty wariant produkcyjny:

- frontend marketingowy Astro: `https://<PRIMARY_DOMAIN>`, statyczny katalog `dist/`
- backend API Laravel: `https://api.<PRIMARY_DOMAIN>`
- panel Filament: `https://admin.<PRIMARY_DOMAIN>`
- opcjonalnie analityka Umami: osobna usługa lub osobna subdomena, jeśli będzie wdrażana

W tym modelu Astro pozostaje szybkim frontendem statycznym, a Laravel obsługuje API i panel administracyjny. Nie dokładamy SSR ani wspólnego runtime Node na produkcji.

## Proponowany układ katalogów na serwerze

```text
/var/www/multiserwis/
  frontend/
    current -> releases/<release-id>
    releases/
      <release-id>/
        dist/
  backend/
    current -> releases/<release-id>
    releases/
      <release-id>/
        backend/
    shared/
      .env
      database/
        database.sqlite
      storage/
  deploy/
    vps/
      nginx/
      scripts/
      systemd/

/var/backups/multiserwis/
```

## Wymagania serwera

- Ubuntu 24.04 LTS lub inna świeża dystrybucja z Nginx
- PHP 8.4 + php-fpm
- Node.js 20+ do budowy frontendu
- Composer 2
- sqlite3 CLI do bezpiecznych backupów bazy sqlite
- certbot lub inny mechanizm TLS

## Produkcyjny build frontendu

Lokalnie lub w CI:

```powershell
npm.cmd ci
npm.cmd run build:production
```

W produkcji Astro powinno dostać co najmniej:

- `SITE_ENVIRONMENT=production`
- `PUBLIC_SITE_URL=https://<PRIMARY_DOMAIN>`
- `PUBLIC_SITE_BASE_PATH=/`
- `PUBLIC_CONTACT_API_URL=https://api.<PRIMARY_DOMAIN>/api/v1/leads`
- `SITE_SETTINGS_API_URL=https://api.<PRIMARY_DOMAIN>/api/v1/site-settings`
- `FAQS_API_URL=https://api.<PRIMARY_DOMAIN>/api/v1/faqs`
- `SERVICE_OFFERINGS_API_URL=https://api.<PRIMARY_DOMAIN>/api/v1/service-offerings`

## Produkcyjny runtime backendu

Repo używa aktualnie sqlite, więc najprostszy produkcyjny start to nadal sqlite na VPS, z regularnym backupem. Backend powinien mieć między innymi:

- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://api.<PRIMARY_DOMAIN>`
- `FILAMENT_ADMIN_EMAILS=` z realną listą kont
- `FRONTEND_URL=https://<PRIMARY_DOMAIN>`

Webhook preview rebuild pozostaje opcjonalny. Do produkcji nie trzeba go włączać, jeśli nie ma jeszcze finalnego auto-deployu.

## Sekwencja wdrożenia backendu

Przykładowa sekwencja po stronie VPS:

```bash
cd /var/www/multiserwis/backend/current/backend
composer install --no-dev --optimize-autoloader
php artisan key:generate --force
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Jeżeli produkcja ma działać na sqlite, należy wcześniej utworzyć plik bazy i nadać prawa zapisu katalogom `database/` oraz `storage/`.

## Automatyzacja release

Repo zawiera teraz także mechanizm aktywacji release i workflow produkcyjnego deployu:

- `deploy/vps/scripts/prepare-shared-storage.sh`
- `deploy/vps/scripts/activate-release.sh`
- `deploy/vps/scripts/rollback-release.sh`
- `.github/workflows/deploy-production.yml`

Model działania:

- GitHub Actions buduje frontend production i instaluje zależności backendu
- artefakty są wysyłane przez `rsync` na VPS do katalogów `frontend/releases/<release-id>` i `backend/releases/<release-id>`
- serwerowy skrypt aktywuje release, podłącza `shared/.env`, `shared/storage`, `shared/database/database.sqlite`, odpala migracje i przełącza symlink `current`
- po aktywacji następuje `reload nginx` i `reload php8.4-fpm`, jeśli systemd jest dostępny

## Jednorazowe przygotowanie serwera

Po pierwszym skopiowaniu plików `deploy/vps/` na serwer uruchom:

```bash
chmod +x /var/www/multiserwis/deploy/vps/scripts/*.sh
APP_ROOT=/var/www/multiserwis /var/www/multiserwis/deploy/vps/scripts/prepare-shared-storage.sh
```

Następnie utwórz plik:

```text
/var/www/multiserwis/backend/shared/.env
```

To jest właściwy produkcyjny `.env` dla Laravel, współdzielony między kolejnymi release'ami.

Repo zawiera też gotowe wzorce env do skopiowania i dopasowania:

- `deploy/vps/env/frontend.production.env.example`
- `deploy/vps/env/backend.production.env.example`

## Sekrety GitHub Actions do produkcyjnego deployu

Workflow `.github/workflows/deploy-production.yml` oczekuje:

- `VPS_HOST`
- `VPS_SSH_USER`
- `VPS_SSH_PRIVATE_KEY`

Opcjonalnie możesz też zmienić input `app_root`, jeśli aplikacja nie siedzi w `/var/www/multiserwis`.

## Reverse proxy i TLS

Repo zawiera szablony:

- `deploy/vps/nginx/frontend.conf.template`
- `deploy/vps/nginx/api.conf.template`
- `deploy/vps/nginx/admin.conf.template`

Zakładany model:

- frontend jest serwowany jako statyczne pliki z Nginx
- API i panel wskazują na ten sam katalog `backend/public`, ale działają pod osobnymi `server_name`
- TLS i certyfikaty należy uzupełnić po podstawieniu domen

## Backup i monitoring

Repo zawiera:

- `deploy/vps/scripts/backup-sqlite.sh`
- `deploy/vps/scripts/healthcheck.sh`
- `deploy/vps/scripts/prepare-shared-storage.sh`
- `deploy/vps/scripts/activate-release.sh`
- `deploy/vps/scripts/rollback-release.sh`
- `deploy/vps/systemd/multiserwis-backup.service`
- `deploy/vps/systemd/multiserwis-backup.timer`
- `deploy/vps/systemd/multiserwis-healthcheck.service`
- `deploy/vps/systemd/multiserwis-healthcheck.timer`

To nie jest jeszcze pełny monitoring aplikacyjny, ale daje bazowy poziom operacyjny:

- codzienny backup sqlite
- retencję kopii
- prostą kontrolę dostępności frontendu, API i panelu

## Co jest nadal ręczne

- podstawienie realnych domen i ścieżek VPS
- konfiguracja TLS
- utworzenie użytkowników systemowych i praw do katalogów
- finalna decyzja, czy produkcja zostaje na sqlite, czy przechodzi na MySQL/PostgreSQL
- wpisanie sekretów GitHub Actions i pierwsze uruchomienie workflow produkcyjnego deployu

## Szybki rollback

Jeżeli ostatni release wymaga cofnięcia, można przełączyć symlink `current` ręcznie:

```bash
APP_ROOT=/var/www/multiserwis /var/www/multiserwis/deploy/vps/scripts/rollback-release.sh <release-id>
```

Rollback nie uruchamia migracji w dół. Zakłada, że poprzedni release nadal jest kompatybilny ze stanem bazy.

## Co jest tylko dla preview

- GitHub Pages jako środowisko podglądowe
- `SITE_ENVIRONMENT=preview`
- webhook `repository_dispatch` do przebudowy preview po zmianach treści

## Co jest dla produkcji

- build `npm.cmd run build:production`
- `PRIMARY_DOMAIN`, `api.<PRIMARY_DOMAIN>`, `admin.<PRIMARY_DOMAIN>`
- Nginx + php-fpm + backupy + timery systemd
- workflow `.github/workflows/deploy-production.yml`
- release activation przez `activate-release.sh`

## Następny krok po tym etapie

Po przygotowaniu tych szablonów kolejnym logicznym zadaniem jest już nie dokumentacja, tylko realna automatyzacja release na wybrany VPS:

- SSH deploy lub runner na serwerze
- przejście z szablonowego deployu na realne sekrety i pierwszy rollout na VPS
- ewentualne przejście z sqlite na bazę sieciową, jeśli skala leadów lub operacji tego wymusi