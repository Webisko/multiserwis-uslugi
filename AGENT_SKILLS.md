# Agent Skills (lokalne, bez internetu)

Ten repo ma już wszystko, czego potrzeba do pracy agentowej. Nie trzeba pobierać żadnych zewnętrznych „skills”.

## 1) `verify:agent` (gate jakości)
- Co robi: `check + build`
- Komenda: `npm.cmd run verify`
- Task VS Code: `verify:agent`

## 2) `smoke:routes` (szybki test tras po preview)
- Co robi: sprawdza kluczowe URL-e i zwraca błąd, jeśli któraś trasa nie odpowiada.
- Wymaga: uruchomionego preview na `http://127.0.0.1:4322/multiserwis-uslugi`
- Komendy:
  1. `npm.cmd run preview -- --host 127.0.0.1 --port 4322`
  2. `npm.cmd run smoke:routes`
- Task VS Code: `smoke:routes`

## 3) `perf:baseline` (odtworzenie baseline wydajności)
- Co robi: generuje `PERFORMANCE_BASELINE.md` na podstawie `dist`.
- Wymaga: aktualnego builda (`npm.cmd run build`).
- Komenda: `npm.cmd run perf:baseline`
- Task VS Code: `perf:baseline`

## 4) `release:gate` (jeden przycisk przed publikacją)
- Co robi: `verify` -> tymczasowy `preview` -> `smoke:routes` -> zatrzymanie preview.
- Komenda: `npm.cmd run release:gate`
- Task VS Code: `release:gate`
- Kiedy używać: bezpośrednio przed push/PR.

## 5) `check:ui-pages` (spójność podstron)
- Co robi: sprawdza, czy podstrony Astro mają wspólny szkielet (`Navbar` + `Footer`).
- Komenda: `npm.cmd run check:ui-pages`
- Task VS Code: `check:ui-pages`
- Kiedy używać: po dodaniu nowej podstrony.

## Proponowany flow przed PR
1. `npm.cmd run release:gate`
2. (opcjonalnie) `npm.cmd run perf:baseline`

## Dlaczego to lepsze niż „skill z internetu”
- jest dopasowane do `base` tego repo (`/multiserwis-uslugi`),
- działa z Twoim Windows/PowerShell,
- nie dokłada zależności i ryzyk aktualizacji zewnętrznych narzędzi.