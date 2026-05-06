# Instrukcje dla repo Multiserwis Usługi

## Kontekst projektu

- To jest strona usługowa B2B dla firmy z branży przemysłowej.
- Repozytorium GitHub: `https://github.com/Webisko/multiserwis-uslugi`.
- Podgląd dla klienta działa przez GitHub Pages: `https://webisko.github.io/multiserwis-uslugi/`.
- Powiązana strona szkoleniowa klienta: `https://szkolenia-multiserwis.pl/`.
- GitHub Pages jest środowiskiem podglądowym frontendu, nie docelowym środowiskiem aplikacyjnym.

## Priorytety techniczne

- Najważniejsze są: szybkość ładowania, SEO, Core Web Vitals, bezpieczeństwo i prostota wdrożenia.
- Preferuj rozwiązania self-hosted, open source i możliwe do uruchomienia na własnym VPS.
- Nie proponuj SaaS jako kluczowego elementu architektury, chyba że użytkownik poprosi o porównanie.
- Dla prostych stron marketingowych preferuj możliwie statyczną architekturę.

## Priorytety projektowe

- Dokumentację i notatki projektowe twórz po polsku.
- Zachowuj sprzedażowy charakter strony, ale unikaj marketingowego lania wody.
- Zachowuj powiązania cross-sell z ofertą szkoleń tylko tam, gdzie są logicznie uzasadnione.
- Jeśli w kodzie są placeholdery, jawnie je oznaczaj i wskazuj jako dług techniczny.

## Workflow analityczny

- Przy analizie repo pracuj krótkimi seriami i szybko raportuj wnioski zamiast długo zbierać szeroki kontekst.
- Najpierw sprawdzaj: `package.json`, `astro.config.mjs`, `src/pages`, `src/screens`, deployment i kluczowe dane biznesowe.
- Po 3-5 odczytach lub narzędziach przekaż użytkownikowi krótki postęp i następny krok.
- Jeśli środowisko Windows blokuje `npm.ps1`, używaj `npm.cmd`.
- Jeśli `git` nie jest dostępny w PATH, używaj bezpośredniej ścieżki do `git.exe` albo czytaj `.git/config`.

## Decyzje architektoniczne

- Nie proponuj migracji z Astro tylko dlatego, że istnieje Laravel lub backendowy standard w innych projektach.
- Zmiana stacku musi być uzasadniona realnym wymaganiem biznesowym, a nie samą spójnością z innymi projektami.
- Dla tego repo domyślny kierunek to: szybki frontend statyczny i minimalna ilość hydracji.
- Jeśli pojawi się backend, rekomenduj oddzielenie warstwy marketingowej od panelu/systemu operacyjnego.

## Na co zwracać uwagę

- niespójności między buildem `dist/` a kodem `src/`
- linki do nieistniejących stron
- dane kontaktowe i CTA
- brakujące elementy SEO: meta, canonical, schema, polityki, robots, sitemap
- zbyt szerokie użycie `client:load` i zbędną hydratację React

## Zasady edycji

- Wprowadzaj zmiany minimalne i celowane.
- Nie dodawaj niepowiązanych refaktorów.
- Nie zmieniaj detali projektu graficznego bez wyraźnej potrzeby lub polecenia.
- Preferuj modyfikacje istniejących komponentów i stron zamiast dokładania nowych abstrakcji.
- Zachowuj spójny styl klas Tailwinda i istniejących konwencji kodu.
- Nie dodawaj nowych zależności bez wyraźnego uzasadnienia.

## Walidacja zmian

- Po zmianach we frontendzie domyślnie uruchamiaj `npm.cmd run check` oraz `npm.cmd run build`.
- Jeśli PowerShell blokuje `npm`, używaj `npm.cmd`.

## Tryb pracy agenta

- Zakładaj, że użytkownik pracuje agentowo i oczekuje automatyzacji, a nie ręcznego klikania po środowisku.
- Preferuj powtarzalne skrypty, zadania i workflowy zamiast jednorazowych instrukcji.
