# PR Changelog

## Executive Summary (krótka wersja do PR)
- Uporządkowano repo pod tryb agent-only: polityki workspace, taski i skrypty automatyzujące walidację.
- Ustabilizowano środowisko (Node 20, `check/verify/release:gate`) i usunięto problemy jakościowe z IDE.
- Ograniczono zbędną hydratację React na podstronach statycznych, zachowując interaktywność tam, gdzie jest potrzebna.
- Rozbudowano serwis o brakujące podstrony: `realizacje`, `polityka-prywatnosci`, `regulamin`.
- Ujednolicono wygląd podstron przez wspólne klasy UI (`page-section`, `offer-card`, `offer-cta`) i nowy `PageHeader`.
- Dopracowano copy i CTA pod sprzedaż oraz czytelność treści na kluczowych ekranach.
- Wdrożono micro-polish mobilny dla ekranów `<390px` (hero, spacing, karty, formularze).

## Executive Summary (ultra-short, 3 punkty)
- Agent-only i release workflow są domknięte i powtarzalne.
- Frontend jest lżejszy oraz spójny wizualnie na wszystkich podstronach.
- Projekt jest gotowy do publikacji (`release:gate` przechodzi).

## Zakres
Kompleksowe domknięcie migracji i polishu: od infrastruktury agentowej i walidacji, przez wydajność hydracji, po finalny UX/copy i responsywność mobilną.

## Co zmieniono (konkrety)
- **Workflow agentowy / VS Code**
  - Dodano: `.vscode/extensions.json`, `.vscode/settings.json`, `.vscode/tasks.json`, `AGENT_WORKSPACE.md`, `AGENT_SKILLS.md`, `.github/copilot-instructions.md`.
  - Dodano skrypty: `scripts/check-page-consistency.ps1`, `scripts/smoke-routes.ps1`, `scripts/perf-baseline.ps1`, `scripts/release-gate.ps1`, `scripts/cleanup-extensions.ps1`.

- **Stabilność środowiska i walidacja**
  - Dodano `.nvmrc` (Node 20), `@astrojs/check`, skrypty `check`, `verify`, `release:gate`, `smoke:routes`, `check:ui-pages`, `perf:baseline`.
  - Uporządkowano `tsconfig.json` i `README.md`.

- **Wydajność (hydracja React)**
  - Usunięto `client:load` z ekranów statycznych podstron.
  - `index.astro`: `Footer` renderowany statycznie.
  - Pozostawiono hydratację dla elementów interaktywnych (`Navbar`, sekcje dynamiczne, FAQ).

- **Nowe podstrony**
  - Dodano trasy i ekrany: `realizacje`, `polityka-prywatnosci`, `regulamin`.

- **UI/UX i content polish**
  - Przebudowano wspólny hero podstron (`PageHeader`) + dedykowane tła.
  - Ujednolicono sekcje i karty przez klasy globalne.
  - Uspójniono copy, nagłówki i CTA na podstronach ofertowych i informacyjnych.
  - Zaktualizowano navbar: usunięto „Strona Główna”, dodano „Realizacje”, poprawiono breakpointy desktop/mobile i `nowrap` etykiet.
  - Dodano micro-polish dla `<390px` w `global.css` oraz dopięto hooki klas w hero.

## Wynik walidacji
- `npm.cmd run check` ✅
- `npm.cmd run build` ✅
- `npm.cmd run release:gate` ✅
- `smoke:routes` ✅ (`13/13`)
- Problems w IDE: `0` ✅

## Ryzyko / uwagi
- Strony `polityka-prywatnosci` i `regulamin` są oznaczone jako wersje robocze i wymagają finalnej akceptacji klienta/prawnika.
- W FAQ i podstronach pozostają oznaczenia „do potwierdzenia” dla danych biznesowych (zasięg, ubezpieczenia relokacji, godziny).
