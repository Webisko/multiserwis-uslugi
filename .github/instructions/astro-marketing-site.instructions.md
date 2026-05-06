---
description: "Use when working on Astro pages, React screens, SEO, content architecture, performance, deployment, or frontend changes in this industrial services marketing site. Covers self-hosted priorities, Polish documentation, GitHub Pages preview, and low-hydration decisions."
name: "Astro Marketing Site Rules"
applyTo: "src/**"
---

# Zasady pracy dla tego frontendu

## Architektura

- Traktuj ten projekt jako szybki frontend marketingowy, nie jako aplikację produktową.
- Preferuj rendering statyczny i ograniczaj hydratację tylko do elementów, które naprawdę wymagają interakcji.
- Jeśli można coś zrobić w czystym Astro lub HTML/CSS, nie dokładaj React bez potrzeby.

## SEO i wydajność

- Każda zmiana powinna być oceniona pod kątem SEO i Core Web Vitals.
- Unikaj ciężkich bibliotek i niepotrzebnego JavaScript po stronie klienta.
- Przy zmianach struktury stron pilnuj: tytułu, opisu, nagłówków, linkowania wewnętrznego i logicznego CTA.
- Jeśli dodajesz obrazy, preferuj zasoby zoptymalizowane i przewidywalne źródła.

## Treść

- Zachowuj język polski i ton profesjonalny, techniczny, konkretny.
- To jest strona dla firmy świadczącej usługi przemysłowe: wynajem sprzętu, relokacje, UDT, elektryka, spawanie, budownictwo.
- Powiązana domena szkoleniowa ma być wspominana jako logiczny cross-sell, nie jako dominujący temat strony.

## Integracje i backend

- Nie zakładaj obecności backendu, bazy danych ani zewnętrznych API bez potwierdzenia w repo.
- Jeżeli formularz nie ma backendu, nie udawaj pełnej funkcjonalności. Oznacz to jasno w analizie lub implementacji.
- Preferowane są rozwiązania self-hosted i open source.

## Jakość zmian

- Przy zmianach treści lub SEO sprawdzaj także stopkę, nawigację, strony docelowe i spójność linków.
- Przy zmianach architektonicznych wskazuj, czy coś służy tylko GitHub Pages preview, czy też docelowemu wdrożeniu na VPS.