# Multiserwis Usługi

Marketingowa strona usługowa dla firmy z branży przemysłowej. Projekt jest przygotowany jako szybki statyczny frontend oparty o Astro i publikowany na GitHub Pages jako środowisko podglądowe dla klienta.

## Linki projektu

- Repozytorium GitHub: https://github.com/Webisko/multiserwis-uslugi
- Podgląd GitHub Pages: https://webisko.github.io/multiserwis-uslugi/
- Powiązana strona szkoleniowa klienta: https://szkolenia-multiserwis.pl/

## Aktualny stack

- Astro 5
- React 19 do komponentów interaktywnych
- Tailwind CSS 3
- Framer Motion do animacji i efektów hero/FAQ
- Laravel 13 jako backend MVP leadów, ustawień strony i panelu Filament w katalogu `backend/`
- GitHub Actions do wdrożenia na GitHub Pages
- Statyczny output Astro (`astro build`)
- Self-hosted-friendly assety i analityka sterowana env

## Uruchomienie lokalne

Wymagania:

- Node.js 20+
- PHP 8.4+ dla lokalnego backendu Laravel

Instalacja i start:

```powershell
npm install
npm run dev
```

Jeżeli PowerShell blokuje `npm.ps1`, użyj:

```powershell
npm.cmd run dev
npm.cmd run check
npm.cmd run build
npm.cmd run build:production
npm.cmd run verify
```

Domyślny adres developerski:

- http://localhost:3000/multiserwis-uslugi/

## Lokalny full flow: frontend + backend

Aktualne repo zawiera także backend MVP Laravel w katalogu [backend](backend), obsługujący leady, bazowe ustawienia kontaktowe i SEO strony oraz panel operacyjny Filament.

Minimalny lokalny przepływ:

```powershell
npm.cmd run backend:migrate
npm.cmd run backend:export-preview
npm.cmd run backend:serve
npm.cmd run dev
```

Lokalne adresy robocze:

- frontend Astro: http://127.0.0.1:3000/multiserwis-uslugi/
- backend API Laravel: http://127.0.0.1:8081/api/v1/leads
- backend API ustawień: http://127.0.0.1:8081/api/v1/site-settings
- backend API FAQ: http://127.0.0.1:8081/api/v1/faqs
- backend API usług: http://127.0.0.1:8081/api/v1/service-offerings
- panel Filament: http://127.0.0.1:8081/admin
- panel leadów: http://127.0.0.1:8081/admin/leads
- panel ustawień strony: http://127.0.0.1:8081/admin/settings
- panel FAQ: http://127.0.0.1:8081/admin/faq-items
- panel usług: http://127.0.0.1:8081/admin/service-offerings

Uwagi środowiskowe:

- lokalny frontend korzysta z `.env.local`
- backend zapisuje leady do `backend/database/database.sqlite`
- repo zawiera lokalne `php.ini` w [.tools/php.ini](.tools/php.ini), żeby uruchamiać Composer i Laravel bez ręcznej konfiguracji rozszerzeń PHP
- backendowe skrypty `npm` automatycznie próbują wykryć lokalny `php.exe`; jeżeli trzeba wymusić konkretną binarkę, ustaw `PHP_BIN`

## Preview bez VPS: snapshoty dla GitHub Pages

Ponieważ GitHub Pages jest tutaj tylko środowiskiem podglądowym, a repo nie ma jeszcze publicznego VPS/API, frontend Astro potrafi teraz korzystać z lokalnie eksportowanych snapshotów JSON z Laravela.

Praktyczny workflow:

```powershell
npm.cmd run backend:export-preview
npm.cmd run build:preview
```

Co się dzieje:

- Laravel eksportuje aktualne ustawienia strony do `src/generated/site-settings.snapshot.json`
- Laravel eksportuje aktualne FAQ i usługi do `src/generated/site-content.snapshot.json`
- Astro podczas buildu próbuje najpierw użyć API, a jeżeli go nie ma, bierze dane z tych snapshotów
- zapis treści w Filament może automatycznie odświeżyć snapshoty lokalnie, a opcjonalnie także wywołać rebuild preview przez GitHub Actions

Ten mechanizm służy tylko preview i pracy lokalnej. Docelowe wdrożenie produkcyjne nadal zakłada publiczny frontend Astro i backend Laravel na własnym VPS.

## Zmienne środowiskowe

Przykładowe zmienne są w [.env.example](.env.example).

Najważniejsze z nich:

- `PUBLIC_CONTACT_API_URL` - docelowy endpoint Laravel do zapisu leadów
- `SITE_ENVIRONMENT` - tryb buildu frontendu (`preview` dla GitHub Pages, `production` dla VPS)
- `PUBLIC_SITE_URL` - publiczny adres frontendu używany przez Astro do canonicali, sitemap i assetów
- `PUBLIC_SITE_BASE_PATH` - base path frontendu (`/multiserwis-uslugi` dla preview, `/` dla produkcji)
- `SITE_SETTINGS_API_URL` - serwerowy endpoint Astro do pobierania ustawień kontaktowych i SEO z Laravel
- `PUBLIC_SITE_SETTINGS_API_URL` - opcjonalny publiczny fallback dla tego samego endpointu
- `FAQS_API_URL` - serwerowy endpoint Astro do pobierania pytań FAQ z Laravel
- `SERVICE_OFFERINGS_API_URL` - serwerowy endpoint Astro do pobierania katalogu usług z Laravel
- `FILAMENT_ADMIN_EMAILS` - lista adresów e-mail uprawnionych do logowania do panelu Filament po stronie backendu
- `STATIC_PREVIEW_EXPORT_ENABLED` - flaga backendu Laravel do lokalnego eksportu snapshotów preview do `src/generated/`
- `PUBLIC_ENABLE_ANALYTICS` - flaga włączenia analityki w danym środowisku
- `PUBLIC_UMAMI_SCRIPT_URL` - adres skryptu Umami
- `PUBLIC_UMAMI_WEBSITE_ID` - identyfikator strony w Umami

Jeżeli `PUBLIC_CONTACT_API_URL` nie jest ustawione, formularz działa w uczciwym trybie preview i nie udaje produkcyjnej wysyłki.

Jeżeli `SITE_SETTINGS_API_URL` nie jest ustawione, frontend najpierw próbuje użyć `src/generated/site-settings.snapshot.json`, a dopiero potem lokalnych danych domyślnych z [src/data/company.ts](src/data/company.ts).

Jeżeli `FAQS_API_URL` lub `SERVICE_OFFERINGS_API_URL` nie są ustawione, frontend najpierw próbuje użyć `src/generated/site-content.snapshot.json`, a dopiero potem lokalnych danych domyślnych dla GitHub Pages preview.

Panel Filament używa logowania pod `/admin/login`. Lokalny dostęp jest ograniczany przez `FILAMENT_ADMIN_EMAILS`, a użytkownika można utworzyć komendą `php artisan make:filament-user`.

Jeżeli w backendzie ustawisz `FRONTEND_REBUILD_ENABLED=true` oraz poprawny `FRONTEND_REBUILD_GITHUB_TOKEN`, zapis treści w panelu Filament może wywołać `repository_dispatch` do workflow preview na GitHub Actions.

## Deployment

Preview jest obsługiwane przez GitHub Actions z pliku [.github/workflows/deploy.yml](.github/workflows/deploy.yml). Build trafia do `dist/`, a następnie jest publikowany na GitHub Pages. Produkcyjny bundle można zbudować osobno przez [.github/workflows/build-production.yml](.github/workflows/build-production.yml) albo lokalnie przez `npm.cmd run build:production`.

Repo zawiera też workflow [.github/workflows/deploy-production.yml](.github/workflows/deploy-production.yml), który potrafi wypchnąć release na VPS przez SSH i aktywować go serwerowym skryptem release switching.

Najważniejsze ustawienia:

- `site: https://webisko.github.io`
- `base: /multiserwis-uslugi`

Split środowisk:

- `preview`: GitHub Pages, `SITE_ENVIRONMENT=preview`, `PUBLIC_SITE_URL=https://webisko.github.io`, `PUBLIC_SITE_BASE_PATH=/multiserwis-uslugi`
- `production`: VPS lub docelowy hosting, `SITE_ENVIRONMENT=production`, `PUBLIC_SITE_URL=https://twoja-domena`, `PUBLIC_SITE_BASE_PATH=/`

Konfiguracja jest w [astro.config.mjs](astro.config.mjs).

## Struktura projektu

- [src/pages](src/pages) - routing Astro
- [src/screens](src/screens) - widoki stron w React
- [src/components](src/components) - sekcje i komponenty współdzielone
- [src/layouts](src/layouts) - layout Astro
- [src/styles/global.css](src/styles/global.css) - style globalne
- [src/data/company.ts](src/data/company.ts) - wspólny model danych marki, kontaktu i SEO wraz z providerem dla React
- [src/lib/siteSettings.ts](src/lib/siteSettings.ts) - pobieranie ustawień strony z backendu Laravel
- [src/lib/siteContent.ts](src/lib/siteContent.ts) - pobieranie FAQ i usług z backendu Laravel z fallbackiem preview
- [src/generated](src/generated) - snapshoty JSON używane przez preview build bez publicznego API
- [backend](backend) - backend Laravel MVP dla leadów, ustawień strony i panelu Filament
- [backend/app/Filament](backend/app/Filament) - zasoby i strony panelu Filament
- [backend/config/frontend_rebuild.php](backend/config/frontend_rebuild.php) - konfiguracja dispatchera rebuildu frontendu
- [backend/config/preview_snapshot.php](backend/config/preview_snapshot.php) - konfiguracja lokalnego eksportu snapshotów preview
- [docs/vps-deployment.md](docs/vps-deployment.md) - instrukcja docelowego wdrożenia na VPS
- [deploy/vps](deploy/vps) - szablony Nginx, skrypty backupu/healthcheck i timery systemd dla VPS
- [.github/workflows/deploy-production.yml](.github/workflows/deploy-production.yml) - produkcyjny deploy na VPS przez SSH
- [deploy/vps/env](deploy/vps/env) - przykładowe pliki env dla produkcji
- [.tools/php.ini](.tools/php.ini) - lokalna konfiguracja PHP potrzebna do Composera i backendu
- [uslugi_uporządkowane.md](uslugi_uporządkowane.md) - materiał źródłowy do architektury treści
- [UMAMI_SETUP.md](UMAMI_SETUP.md) - notatki wdrożeniowe dla analityki Umami
- [docs/implementation-plan.md](docs/implementation-plan.md) - plan wdrożenia
- [docs/lead-api-contract.md](docs/lead-api-contract.md) - kontrakt API dla leadów
- [docs/laravel-leads-mvp.md](docs/laravel-leads-mvp.md) - szkic backendu Laravel + Filament

## Aktualny stan projektu

Status etapu początkowego:

- początkowy plan wdrożeniowy dla repo, lokalnego backendu i tymczasowego preview na GitHub Pages jest zrealizowany
- dalsze prace dotyczą już osobnego etapu: realnego wdrożenia VPS i dalszego rozwoju funkcjonalnego

Co jest gotowe:

- główna architektura frontendu i routing
- działający build produkcyjny
- automatyczny deploy na GitHub Pages
- główna treść usług i sekcji sprzedażowych
- ujednolicone dane kontaktowe i branding
- strony prawne, robots.txt i sitemap
- schema.org, meta OG/Twitter i self-hosted assety social/favicons
- formularz kontaktowy gotowy pod `PUBLIC_CONTACT_API_URL` z bezpiecznym fallbackiem preview
- Umami aktywowane przez env bez zbierania ruchu z preview
- CTA i domknięcia kontaktowe na najważniejszych podstronach usługowych i informacyjnych
- działający backend Laravel MVP w `backend/` z endpointem `POST /api/v1/leads`
- działający backend ustawień strony z endpointem `GET /api/v1/site-settings`
- działający panel Filament pod `/admin` z zasobami `Leady` i `Ustawienia strony`
- działające modele, endpointy i zasoby Filament dla `FAQ` oraz `Usługi`
- lokalny zapis leadów do sqlite i operacyjna edycja statusów/notatek w panelu
- frontend pobiera z backendu bazowe dane kontaktowe i SEO oraz przekazuje jeden snapshot do SSR i hydracji React
- frontend może pobierać z backendu FAQ i katalog usług, z bezpiecznym fallbackiem preview dla GitHub Pages
- frontend ma jawny split buildów `preview` / `production`
- backend potrafi wywołać webhook rebuildu preview przez GitHub `repository_dispatch`
- preview GitHub Pages może konsumować backend-managed treści przez commitowane snapshoty eksportowane lokalnie z Laravel
- repo zawiera już bazowy pakiet deploymentowy VPS: reverse proxy, backup sqlite i healthcheck HTTP
- repo zawiera produkcyjny workflow deployu na VPS z release activation przez SSH
- repo zawiera też gotowe przykłady env produkcyjnych i prosty rollback release
- potwierdzony lokalny przepływ end-to-end: formularz Astro -> API Laravel -> sqlite

Co wymaga dopracowania:

- formularz zapisuje leady lokalnie i może działać produkcyjnie po ustawieniu właściwego `PUBLIC_CONTACT_API_URL`, ale nie ma jeszcze maili, webhooków i workflowów operacyjnych
- produkcyjny deploy na VPS wymaga już głównie podstawienia sekretów i danych środowiskowych; workflow i skrypty release są w repo
- backend nie ma jeszcze bardziej granularnych treści konfiguracyjnych poza singletonem ustawień strony, FAQ i usługami
- finalne dane prawne i środowiskowe wymagają jeszcze akceptacji przed produkcją
- finalne wdrożenie VPS nadal wymaga podstawienia realnych domen, TLS, praw dostępu i automatyzacji release

## Założenia projektowe

- priorytet: szybkość, SEO, Core Web Vitals i prostota utrzymania
- tylko rozwiązania self-hosted lub open source
- brak zależności od SaaS jako kluczowego elementu architektury
- dokumentacja w tym repo powinna być prowadzona po polsku
- GitHub Pages jest środowiskiem podglądowym, ale docelowe rozwiązanie ma działać na własnym VPS

## Notatka architektoniczna

Na dziś projekt działa już w praktycznym wariancie monorepo do developmentu: Astro jako frontend marketingowy oraz Laravel jako backend MVP leadów i ustawień strony. Docelowo nadal sensowny pozostaje rozdział na osobny frontend i osobny backend/panel operacyjny na VPS, ale ten repozytoryjny etap pośredni pozwala już testować i rozwijać realny przepływ leadów, ustawień i SEO end-to-end.

## Dodatkowe komendy jakościowe

- `npm.cmd run check` - sprawdzenie projektu Astro
- `npm.cmd run build` - build preview używany domyślnie w repo
- `npm.cmd run verify` - szybka walidacja `check + build`
- `npm.cmd run preview` - lokalny podgląd zbudowanej wersji
