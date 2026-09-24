# Performance Baseline (Agent Mode)

Data pomiaru: 2026-09-24
Srodowisko: build produkcyjny Astro (`npm.cmd run build`)

## JS payload per route (dist)

| Route | JS files | Total JS (KB) |
|---|---:|---:|
| `/` | 4 | 229.21 |
| `/budownictwo` | 2 | 218.15 |
| `/elektryka` | 2 | 218.15 |
| `/faq` | 3 | 224.50 |
| `/kontakt` | 3 | 224.53 |
| `/o-firmie` | 2 | 218.15 |
| `/polityka-prywatnosci` | 2 | 218.15 |
| `/realizacje` | 2 | 218.15 |
| `/regulamin` | 2 | 218.15 |
| `/relokacja` | 2 | 218.15 |
| `/spawanie` | 2 | 218.15 |
| `/udt` | 2 | 218.15 |
| `/uslugi-techniczne` | 2 | 218.15 |
| `/wynajem` | 2 | 218.15 |

## Najwieksze chunki JS

| Chunk | Size (KB) |
|---|---:|
| `client.CDnvi2g3.js` | 207.95 |
| `proxy.DIen78GF.js` | 118.10 |
| `ContactForm.CJZzLSCt.js` | 11.84 |
| `Navbar.D8K0gKuw.js` | 10.20 |
| `react.BqBvWGiZ.js` | 8.51 |
| `FaqSection.BTxejBAP.js` | 6.46 |
| `ContactPage.DUsr1k3L.js` | 6.38 |
| `FaqPage.2g8bJ538.js` | 6.35 |

## Notatka

Plik wygenerowany automatycznie przez `scripts/perf-baseline.ps1`.
