---
name: project-audit
description: 'Use when auditing the Multiserwis Usługi project, reviewing current stack, checking Astro architecture, evaluating SEO and performance readiness, validating GitHub Pages deployment, or deciding whether this repo should stay on Astro or move to another self-hosted stack.'
argument-hint: 'Zakres audytu, np. stack, SEO, treść, architektura, deploy, rekomendacja zmian'
user-invocable: true
---

# Audyt projektu Multiserwis Usługi

## Kiedy używać

Użyj tego skilla, gdy trzeba:

- szybko przypomnieć sobie stan projektu po przerwie
- ocenić obecny stack technologiczny
- sprawdzić zgodność z priorytetami SEO, wydajności i self-hostingu
- ocenić opłacalność migracji z Astro na inny stack
- zweryfikować, czy GitHub Pages i repo są spójne z kodem źródłowym

## Procedura

1. Sprawdź pliki bazowe projektu:
   - `package.json`
   - `astro.config.mjs`
   - `.github/workflows/deploy.yml`
   - `README.md`

2. Zmapuj strukturę źródeł:
   - `src/pages`
   - `src/screens`
   - `src/components`
   - `src/layouts`

3. Oceń stronę biznesowo:
   - jakie usługi są sprzedawane
   - jaka jest nisza i grupa docelowa
   - jak działa cross-sell do strony szkoleniowej
   - jakie są główne CTA i przewagi konkurencyjne

4. Oceń stronę technicznie:
   - poziom hydracji i użycie React
   - gotowość SEO
   - placeholdery, brakujące strony i niespójności danych
   - gotowość formularzy i analityki

5. Oceń stack decyzyjnie:
   - czy obecny Astro stack jest wystarczający
   - czy potrzebny jest backend
   - czy ewentualny Laravel ma uzasadnienie biznesowe
   - czy warto rozdzielać marketing site i system operacyjny/panel

6. Zwróć wynik w 5 blokach:
   - stan repo
   - stack i architektura
   - biznes i treść
   - ryzyka / braki
   - rekomendacja dalszego kierunku

## Zasady oceny

- Priorytet mają rozwiązania self-hosted, open source i szybkie.
- Nie rekomenduj migracji tylko z powodów estetycznych albo przyzwyczajenia do innego stacku.
- Dla tej klasy projektu prostota i niski narzut operacyjny są ważniejsze niż rozbudowana architektura backendowa.
- Jeśli frontend spełnia wymagania marketingowe, preferuj dopracowanie jakości nad przebudowę całego stacku.