# multiserwis-uslugi

Strona firmowa zbudowana na Astro + React + Tailwind, deployowana na GitHub Pages.

## Stack
- Astro 5
- React 19
- Tailwind CSS 3
- TypeScript

## Wymagania
- Node.js 20 (zgodnie z `.nvmrc` i CI)
- npm

## Start lokalny
1. Zainstaluj zależności:
   - `npm ci`
2. Uruchom dev server:
   - Windows PowerShell: `npm.cmd run dev`
   - Inne shelle: `npm run dev`

## Komendy
- `npm run check` – sprawdzenie typów i projektu Astro
- `npm run build` – build produkcyjny
- `npm run verify` – check + build (zalecane po zmianach)
- `npm run preview` – podgląd builda lokalnie

## Deploy
- Deploy odbywa się przez GitHub Actions do GitHub Pages (branch `main`).
- Konfiguracja `site` i `base` jest w `astro.config.mjs`.

## Analityka
- Konfiguracja Umami znajduje się w `UMAMI_SETUP.md`.

## Tryb agentowy
- Workflow i polityka rozszerzeń: `AGENT_WORKSPACE.md`.
