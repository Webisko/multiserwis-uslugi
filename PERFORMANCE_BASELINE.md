# Performance Baseline (Agent Mode)

Data pomiaru: 2026-02-17
Srodowisko: build produkcyjny Astro (`npm.cmd run build`)

## JS payload per route (dist)

| Route | JS files | Total JS (KB) |
|---|---:|---:|
| `/` | 3 | 242.55 |
| `/budownictwo` | 2 | 188.09 |
| `/elektryka` | 2 | 188.09 |
| `/faq` | 3 | 197.41 |
| `/kontakt` | 2 | 188.09 |
| `/o-firmie` | 2 | 188.09 |
| `/polityka-prywatnosci` | 2 | 188.09 |
| `/realizacje` | 2 | 188.09 |
| `/regulamin` | 2 | 188.09 |
| `/relokacja` | 2 | 188.09 |
| `/spawanie` | 2 | 188.09 |
| `/udt` | 2 | 188.09 |
| `/uslugi-techniczne` | 2 | 188.09 |
| `/wynajem` | 2 | 188.09 |

## Najwieksze chunki JS

| Chunk | Size (KB) |
|---|---:|
| `client.Dc9Vh3na.js` | 182.25 |
| `proxy.p4EQ8y8y.js` | 113.86 |
| `HomePage.cMxSljoT.js` | 54.46 |
| `FaqPage.YJWjnfXb.js` | 9.32 |
| `index.DiEladB3.js` | 7.66 |
| `Navbar.FfStkgNZ.js` | 5.85 |
| `createLucideIcon.B2rlqQHU.js` | 3.22 |
| `phone.8BNEkqRm.js` | 0.74 |

## Notatka

Plik wygenerowany automatycznie przez `scripts/perf-baseline.ps1`.
