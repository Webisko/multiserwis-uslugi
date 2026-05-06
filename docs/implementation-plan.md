# Plan wdrożenia: Multiserwis Usługi

## Status na dziś

Szacowany postęp początkowego planu wdrożeniowego: `100%` w zakresie repo, lokalnego workflow i tymczasowego preview na GitHub Pages.

To oznacza, że pierwotny etap uruchomienia i uporządkowania projektu jest domknięty. Otwarte pozostają już tylko zadania infrastrukturalne zależne od realnego VPS oraz dalszy rozwój funkcjonalny wykraczający poza plan startowy.

Stan etapów:

- Faza 1: zakończona
- Faza 2: zrealizowana koncepcyjnie i architektonicznie
- Faza 3: backend MVP wdrożony w repo dla leadów, bazowych ustawień strony, FAQ, usług i panelu Filament
- Faza 4: lokalna integracja frontendu z API działa end-to-end dla leadów, ustawień kontaktowych i SEO oraz backend-managed FAQ/usług, a GitHub Pages preview ma już także statyczny fallback ze snapshotów eksportowanych z Laravel
- Faza 5: przygotowana repozytoryjnie, ale jej wykonanie zależy od otrzymania realnego VPS

## Wniosek operacyjny

Na dziś można uznać, że początkowy plan został wykonany. Kolejne prace nie są już "domykaniem podstaw", tylko wejściem w następny etap rozwoju projektu.

## Cel

Najpierw porządkujemy i optymalizujemy obecne repo Astro, a dopiero potem dokładamy backend Laravel + Filament jako warstwę operacyjną. Publiczny frontend pozostaje w Astro, backend przejmuje leady, ustawienia SEO i kontrolowane treści.

## Faza 1: Stabilizacja i cleanup obecnego repo

### 1. Dane firmy i kontakt

- done: ujednolicono telefony, e-mail, adres i godziny pracy
- done: przeniesiono dane do wspólnego źródła
- done: usunięto większość placeholderów i kluczowych niespójności w CTA

### 2. Strony prawne i linki systemowe

- done: dodano politykę prywatności
- done: dodano regulamin
- done: usunięto martwe linki w stopce i głównej nawigacji

### 3. Formularze i UX kontaktu

- done: zastąpiono formularze jedną wspólną implementacją
- done: przygotowano formularz do przyszłego podpięcia API Laravel
- done: dodano walidację, stan wysyłki i komunikaty sukcesu/błędu
- done: placeholder mapy zastąpiono realnym blokiem dojazdu

### 4. SEO i analityka

- done: dodano canonicale, robots i sitemap
- done: dodano podstawowe Open Graph i Twitter meta
- done: dodano schema.org dla firmy i strony usługowej
- done: przygotowano self-hosted Umami przez konfigurację środowiskową

### 5. Wydajność i kod

- done: ograniczono zbędną hydratację React
- done: usunięto martwy kod i ślady porzuconej architektury
- done: ujednolicono główne konwencje w `src/pages`, `src/screens` i `src/components` na poziomie potrzebnym do obecnego etapu

## Faza 2: Projekt docelowej architektury

### 1. Podział odpowiedzialności

- Astro: warstwa publiczna, szybki frontend marketingowy
- Laravel: API, logika leadów, konfiguracja treści i SEO
- Filament: panel operacyjny i konfiguracyjny

### 2. Organizacja repo

Rekomendacja startowa:

- obecne repo zostaje frontendem Astro
- backend Laravel + Filament powstaje jako osobne repo

Alternatywa później:

- monorepo z `frontend/` i `backend/`

### 3. Model publikacji

- Astro działa jako SSG
- Laravel jest źródłem danych
- po zmianach w panelu webhook uruchamia rebuild frontendu

## Faza 3: Backend MVP

Status: zrealizowane MVP backendu leadów, singletonu ustawień strony, FAQ i usług w katalogu `backend/`, z działającym panelem Filament dla kluczowych zasobów.

### 1. Modele i zasoby

- done: leady / inquiry
- done: dane kontaktowe firmy
- done: ustawienia globalne SEO
- done: FAQ
- done: usługi
- ustawienia stron i sekcji
- certyfikaty

### 2. Panel Filament

- done: lista leadów w panelu Filament
- done: statusy leadów
- done: notatki operacyjne
- done: edycja kontaktu i bazowych ustawień strony w panelu Filament
- done: edycja bazowych ustawień SEO w panelu Filament
- done: edycja FAQ i usług

### 3. API

- done: zapis formularza kontaktowego
- done: walidacja danych
- done: odczyt bazowych ustawień kontaktowych i SEO
- done: odczyt FAQ
- done: odczyt usług
- wysyłka e-maili
- dalsze treści konfiguracyjne poza FAQ/usługami

## Faza 4: Integracja frontendu z backendem

Status: lokalne połączenie działa dla leadów, ustawień strony, FAQ i usług; preview/production są już rozdzielone na poziomie buildu, a webhook rebuild do preview jest przygotowany.

- done: podmieniono preview submit na prawdziwe API w środowisku lokalnym
- done: frontend pobiera bazowe dane kontaktowe i SEO z backendu
- done: wprowadzono spójny snapshot `companyData` dla SSR i hydracji React na publicznych stronach
- done: frontend pobiera FAQ i katalog usług z backendu z fallbackiem dla GitHub Pages preview
- done: dodać webhook rebuild po zmianach w panelu
- done: przygotować rozdział środowisk preview i production na poziomie buildów
- done: dodać lokalny eksport snapshotów z Laravel do repo, aby GitHub Pages preview odzwierciedlał treści zarządzane w Filament bez publicznego API

## Faza 5: Wdrożenie docelowe na VPS

Status: przygotowane szablony, instrukcja wdrożeniowa i workflow release, ale bez finalnego spięcia z realnym VPS.

- frontend Astro na domenie publicznej
- backend API na subdomenie technicznej
- panel Filament na osobnej subdomenie administracyjnej
- reverse proxy na Nginx
- backup bazy, logi i monitoring

Co jest już przygotowane w repo:

- done: pakiet szablonów Nginx dla frontendu, API i panelu
- done: bazowy backup sqlite przez skrypt i timer systemd
- done: prosty healthcheck HTTP przez skrypt i timer systemd
- done: instrukcja wdrożenia VPS w `docs/vps-deployment.md`
- done: workflow produkcyjnego deployu przez SSH z aktywacją release
- done: przykłady env produkcyjnych i skrypt rollbacku release

## Zasady decyzyjne

- nie robimy blogowego CMS-a
- nie przepisujemy frontendu do Blade bez realnej potrzeby
- nie dokładamy SSR bez wyraźnego uzasadnienia biznesowego
- preferujemy prostotę, wydajność i pełną kontrolę na własnym VPS

## Kolejność dalszych prac

To są już kolejne etapy rozwoju projektu, a nie elementy niedomkniętego planu startowego.

1. Podstawić realne domeny, TLS, sekrety i ścieżki na wybranym VPS
2. Wykonać pierwszy realny rollout na VPS i potwierdzić reload usług
3. Dodać maile, webhooki i operacyjne workflowy obsługi leadów
4. Dodać dalsze treści zarządzalne po stronie backendu, jeśli będą biznesowo potrzebne
5. Rozważyć rozdział frontendu i backendu na osobne repo po ustabilizowaniu wdrożenia produkcyjnego
