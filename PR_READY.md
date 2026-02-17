# PR Title
Final polish: agent-only workflow + nowe podstrony + UI/UX mobile readiness

# PR Body
## Dlaczego
Domykamy projekt przed publikacją: workflow agentowy, komplet podstron, jakość techniczna, spójny design oraz responsywność mobilna.

## Co zmieniono
- Agent-only i automatyzacja:
  - dodane policy i taski workspace (`.vscode/*`),
  - dodane instrukcje repo (`AGENT_WORKSPACE.md`, `AGENT_SKILLS.md`, `.github/copilot-instructions.md`),
  - dodane skrypty walidacyjne (`release-gate`, `smoke-routes`, `check:ui-pages`, `perf:baseline`).
- Stabilizacja techniczna:
  - Node 20 (`.nvmrc`), `@astrojs/check`, skrypty `check/verify`,
  - cleanup kodu i naprawa zgłoszonych problemów IDE,
  - redukcja zbędnej hydracji React na podstronach statycznych.
- Rozbudowa serwisu:
  - dodane nowe podstrony: `realizacje`, `polityka-prywatnosci`, `regulamin`.
- Spójność UI/UX:
  - nowy wspólny hero podstron (`PageHeader`) + dedykowane tła,
  - ujednolicone klasy komponentowe (`page-section`, `offer-card`, `offer-cta`),
  - copywriting/CTA polish na kluczowych ekranach,
  - poprawa navbara (bez „Strona Główna”, dodane „Realizacje”, lepsze breakpointy i brak łamania etykiet).
- Mobile micro-polish:
  - dopracowanie ekranów `<390px` (spacing, hero, karty, formularze, rozmiary CTA).

## Wpływ
- Spójny, powtarzalny proces pracy i walidacji przed publikacją.
- Lepsza czytelność i konwersyjność treści (copy + CTA).
- Stabilna responsywność na małych ekranach bez regresji funkcjonalnych.

## Walidacja
- `npm.cmd run check` ✅
- `npm.cmd run build` ✅
- `npm.cmd run release:gate` ✅
- `smoke:routes` ✅ (`13/13`)
- Problems w IDE: `0` ✅

## Ryzyko i uwagi
- Strony prawne są w wersji roboczej (oznaczone w treści) i wymagają finalnej akceptacji klienta.
- Pozostają pola „do potwierdzenia” dla danych biznesowych (zasięg, ubezpieczenia, godziny).

## Pliki pomocnicze
- Szczegółowy changelog: `PR_CHANGELOG.md`
- Baseline wydajności: `PERFORMANCE_BASELINE.md`