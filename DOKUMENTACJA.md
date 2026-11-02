# Dokumentacja techniczna — Multiserwis Usługi

Kompleksowa dokumentacja systemu dla serwisu marketingowego i ofertowego **Multiserwis Sp. z o.o.** (`multiserwis.tech`) oraz panelu administracyjnego CMS (`panel.multiserwis.tech`).

---

## 1. Założenia, cel biznesowy i profil projektu
* **Klient:** MULTISERWIS KUTNO SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ (NIP: 7752676330, REGON: 541108550, KRS: 0001160280).
* **Branża:** Usługi dla przemysłu (wynajem żurawi i podestów ruchomych, relokacje maszyn i linii technologicznych, konserwacja i dozór UDT, spawalnictwo, konstrukcje stalowe, instalacje elektryczne i automatyka).
* **Cel projektu:** Nowoczesna, superszybka strona marketingowa pozyskująca zapytania ofertowe (lead generation) z automatycznym trasowaniem do właściwych działów technicznych, panelem zarządzania treścią CMS dla zespołu biurowego oraz bezciasteczkową analityką ruchu.
* **Typ architektury:** Architektura rozdzielona (decoupled / Jamstack) — w pełni statyczny frontend Astro (SSG) zintegrowany z API i panelem FilamentPHP na backendzie Laravel.

---

## 2. Stos technologiczny i architektura
* **Frontend:**
  * **Framework:** Astro 7 (statyczny generator SSG)
  * **Komponenty interaktywne:** React 19 (React Islands / `@astrojs/react`)
  * **Stylowanie:** Tailwind CSS 4 (`@tailwindcss/vite`)
  * **Animacje i ikony:** Framer Motion, Lucide React
  * **Czcionki lokalne:** Oswald (700), Inter (400, 700) w formatach `.woff2` (100% lokalnie, brak Google Fonts)
  * **Język:** TypeScript 5.8
* **Backend & Panel CMS:**
  * **Framework:** Laravel 13
  * **Panel administracyjny:** FilamentPHP v5
  * **Środowisko:** PHP 8.3+ / 8.4+
  * **Baza danych:** SQLite (lokalnie/preview) / MySQL (produkcyjnie)
* **Analityka i zgodność prawna:**
  * **Analityka:** Umami Analytics (cookieless, zgodne z RODO, zero zewnętrznych skryptów śledzących)
  * **Prawodawstwo:** Zgodność z wymogami UE/PL, RODO, brak dark patterns, pełne dane rejestrowe w stopce.

---

## 3. Struktura katalogów i kluczowych plików
```
multiserwis-uslugi/
├── .agents/skills/              # Lokalne skille agenta (SSH SEOHost itp.)
├── .antigravity/schema.md       # Aktualny schemat bazy danych
├── backend/                     # Aplikacja Laravel 13 + FilamentPHP
│   ├── app/
│   │   ├── Filament/            # Zasoby i strony panelu administracyjnego
│   │   │   ├── Pages/Dashboard.php
│   │   │   └── Resources/       # FaqItems, Leads, PortfolioItems, ServiceOfferings, SiteSettings, Users
│   │   ├── Http/Controllers/Api/V1/ # Kontrolery REST API (LeadController, SiteSettingController itd.)
│   │   ├── Mail/                # Klasy wiadomości m.in. LeadReceivedMail
│   │   ├── Models/              # Modele Eloquent (Lead, SiteSetting, FaqItem, ServiceOffering, PortfolioItem)
│   │   └── Observers/           # ContentSyncObserver (automatyczny eksport snapshotów i dispatch rebuilda)
│   ├── database/migrations/     # Migracje schematu bazy danych
│   ├── routes/api.php           # Trasy API v1
│   └── tests/Feature/           # Zestaw testów automatycznych PHPUnit
├── public/                      # Statyczne zasoby publiczne (fonty woff2, ikony, obrazy WebP, llms.txt)
├── scripts/                     # Skrypty pomocnicze (buildy, deploy, testy, dev server)
├── src/                         # Źródła frontendu Astro
│   ├── components/              # Komponenty UI i sekcje (ContactForm, Navbar, Footer, Hero itp.)
│   ├── data/company.ts          # Centralne dane firmy i kontakty
│   ├── generated/               # Snapshoty JSON generowane z CMS dla trybu preview
│   ├── layouts/Layout.astro     # Główny layout (SEO, OpenGraph, JSON-LD, czcionki, llms)
│   ├── lib/                     # Logika pobierania danych (siteContent.ts, siteSettings.ts)
│   └── pages/                   # Podstrony Astro (index, o-firmie, wynajem, relokacja, udt, spawanie, kontakt)
├── astro.config.mjs             # Konfiguracja Astro
└── package.json                 # Skrypty i zależności projektu
```

---

## 4. Baza danych i modele Eloquent
Główne tabele i modele (szczegóły w `.antigravity/schema.md`):
* **`leads` (`App\Models\Lead`):**
  * Zapytania ofertowe z formularzy.
  * Klucz publiczny `public_id` generowany z ULID (`lead_...`).
  * Relacja `assigned_user_id` do tabeli `users` z regułą `nullOnDelete()` (usunięcie pracownika nie kasuje historii leadów).
  * Indeksy na `status`, `is_spam` i `public_id`.
* **`site_settings` (`App\Models\SiteSetting`):**
  * Singleton konfiguracji serwisu (dane teleadresowe, godziny pracy, odnośnik do platformy szkoleń, meta tagi SEO).
* **`service_offerings` (`App\Models\ServiceOffering`):**
  * Usługi przemysłowe, punkty atutów (`highlights` jako json/array), relacja z formularzem kontaktowym.
* **`portfolio_items` (`App\Models\PortfolioItem`):**
  * Realizacje, zdjęcia, lokalizacje i punkty kluczowe projektów.
* **`faq_items` (`App\Models\FaqItem`):**
  * Baza pytań i odpowiedzi podzielona na kategorie.
* **`users` (`App\Models\User`):**
  * Konta personelu z rolami (`admin`, `manager`, `staff`) i flagą odbioru powiadomień.

---

## 5. Panel administracyjny Filament CMS (`/admin`)
* **Dostęp:** Dedykowana subdomena `https://panel.multiserwis.tech/admin`.
* **Zasoby:**
  * **Zapytania (`Leads`):** Przeglądanie nadesłanych zapytań, zmiana statusu (`new`, `contacted`, `in_progress`, `closed`, `spam`), notatki zespołu, przypisywanie opiekuna.
  * **Ustawienia (`SiteSettings`):** Edycja telefonów, e-maili działowych, adresu, godzin otwarcia i domyślnych tagów SEO.
  * **Usługi (`ServiceOfferings`):** Zarządzanie opisami i kolejnością oferty.
  * **Realizacje (`PortfolioItems`):** Dodawanie wpisów do portfolio ze zdjęciami.
  * **FAQ (`FaqItems`):** Zarządzanie bazą pytań i odpowiedzi.
  * **Zespół (`Users`):** Zarządzanie uprawnieniami użytkowników.
* **Automatyczna synchronizacja:**
  * Każdy zapis rekordu uruchamia `ContentSyncObserver`, który eksportuje aktualne snapshoty JSON do `src/generated/` i wywołuje odświeżenie danych.

---

## 6. Moduły biznesowe, ścieżka leadowa i logika działania
* **Formularz kontaktowy (`ContactForm.tsx`):**
  * Działa wieloaspektowo: obsługuje zapytania ogólne oraz dedykowany tryb wynajmu maszyn (sprzęt, lokalizacja, termin, czas trwania, operator).
  * Klient otrzymuje informację zwrotną w czasie rzeczywistym.
* **Inteligentne trasowanie leadów (`resolveLeadRecipient`):**
  * Zapytania o wynajem maszyn ➔ `wynajem@multiserwis.tech`
  * Zapytania o elektrykę i automatykę ➔ `automatyka@multiserwis.tech`
  * Zapytania o spawalnictwo, konstrukcje stalowe i technologię ➔ `technologia@multiserwis.tech`
  * Zapytania o relokacje, montaż, UDT i ogólne ➔ `biuro@multiserwis.tech`
* **Odporność na awarie SMTP:**
  * Całość wysyłki e-maili i notyfikacji działa w blokach `try...catch` — potencjalny przestój serwera pocztowego nie blokuje przyjęcia zgłoszenia ani nie wyświetla błędu 500 użytkownikowi.

---

## 7. Endpointy API, bezpieczeństwo i ochrona antyspamowa
* **Publiczne endpointy API (`/api/v1/`):**
  * `POST /api/v1/leads` — składanie zapytań ofertowych.
  * `GET /api/v1/site-settings` — globalne ustawienia serwisu.
  * `GET /api/v1/faqs` — lista pytań i odpowiedzi.
  * `GET /api/v1/service-offerings` — oferta usług.
  * `GET /api/v1/portfolio-items` — lista realizacji.
* **Ochrona Anti-IDOR:**
  * Endpoint `POST /api/v1/leads` zwraca wyłącznie losowy `public_id` (ULID). Brak publicznych metod GET dla poszczególnych leadów.
* **Antyspam (`Human-First Defense`):**
  * Ukryte pole Honeypot (`website`) niewidoczne dla ludzi. Wypełnienie przez bota oznacza lead jako spam (`is_spam = true`), pomija wysyłkę e-maili i powiadomień oraz zwraca `202 Accepted`.
  * Walidacja numeru telefonu (min. 9 cyfr po oczyszczeniu), formatu adresu e-mail i minimalnej długości wiadomości.
* **CORS:**
  * W `cors.php` dostęp ograniczony do domen `multiserwis.tech`, `www.multiserwis.tech` oraz środowisk lokalnych.

---

## 8. Konfiguracja środowiska (`.env`), integracje i polecenia konsolowe
* **Kluczowe zmienne w `.env` backendu:**
  * `APP_NAME`, `APP_ENV`, `APP_KEY`, `APP_DEBUG`, `APP_URL`
  * `MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM_ADDRESS`
  * `MAIL_DEPT_BIURO`, `MAIL_DEPT_WYNAJEM`, `MAIL_DEPT_AUTOMATYKA`, `MAIL_DEPT_TECHNOLOGIA`, `MAIL_DEPT_SZKOLENIA`
  * `FRONTEND_URL`
* **Zmienne frontendu Astro (`.env`):**
  * `PUBLIC_CONTACT_API_URL` — adres endpointu składania leadów (np. `https://panel.multiserwis.tech/api/v1/leads`)
  * `PUBLIC_UMAMI_WEBSITE_ID`, `PUBLIC_UMAMI_SCRIPT_URL` — konfiguracja analityki Umami
* **Polecenia konsolowe (`artisan` / `npm`):**
  * `npm run check` — weryfikacja typów TypeScript i Astro.
  * `npm run build` — kompilacja produkcyjna statycznego frontendu do `dist/`.
  * `npm run backend:serve` — start lokalnego serwera PHP/Laravel.
  * `npm run backend:test` — uruchomienie testów automatycznych PHPUnit.
  * `npm run backend:export-preview` — eksport aktualnych danych z bazy do snapshotów JSON w `src/generated/`.

---

## 9. Wdrożenie produkcyjne (Deployment, serwer SEOHost, SSH)
* **Serwer:** SEOHost (`h108.seohost.pl`, port SSH `57185`, użytkownik `srv127364`).
* **Ścieżki:**
  * Frontend: `/home/srv127364/domains/multiserwis.tech/public_html`
  * Backend kod: `/home/srv127364/domains/panel.multiserwis.tech/backend`
  * Backend public: `/home/srv127364/domains/panel.multiserwis.tech/public_html`
* **Skrypty wdrożeniowe:**
  * `scripts/deploy-staging-seohost.ps1`
  * `scripts/deploy-production-seohost.ps1`
* **Bezpieczeństwo wdrożeń:**
  * Przed migracją bazy obowiązkowa kopia zapasowa (`database.sqlite.bak`).
  * Zakaz nadpisywania `storage/app/` oraz produkcyjnego pliku `.env`.

---

## 10. Rejestr zmian (Changelog) i status testów
* **2026-11-02 — Pełny 6-Stopniowy Audyt Inżynieryjny:**
  * Przeprowadzono weryfikację bezpieczeństwa, ścieżki leadowej, modeli, API, RODO, SEO i kompilacji.
  * Testy backendowe PHPUnit: **20/20 testów zielonych (PASS)**, 59 asercji.
  * Sprawdzenie typów Astro (`astro check`): **59 plików, 0 błędów, 0 ostrzeżeń**.
  * Kompilacja produkcyjna Astro (`npm run build`): **15 podstron statycznych wygenerowanych pomyślnie**.
  * Wygenerowano plik schematu bazy danych `.antigravity/schema.md` oraz żywą dokumentację projektu `DOKUMENTACJA.md`.
* **2026-11-02 — Wdrożenie poprawek poaudytowych:**
  * **Bezpieczeństwo kont personelu:** Usunięto zahardkodowane hasła z `DatabaseSeeder.php`; hasło początkowe wczytywane z `ADMIN_INITIAL_PASSWORD` lub generowane losowo (zabezpieczenie przed resetowaniem haseł personelu w CMS).
  * **Ochrona API (`Rate Limiting`):** Dodano middleware `throttle:15,1` na trasie `POST /api/v1/leads` oraz nowy automatyczny test Feature sprawdzający limit 429.
  * **Strefa czasowa i lokalizacja:** Ustawiono `'timezone' => 'Europe/Warsaw'` oraz domyślne `locale` na `'pl'` w `config/app.php`.
  * **Polonizacja Filament CMS:** Dodano polskie slugi we wszystkich zasobach: `/admin/ustawienia`, `/admin/zapytania`, `/admin/pytania-i-odpowiedzi`, `/admin/realizacje`, `/admin/uslugi`, `/admin/zespol`.
  * **UX formularza:** Zastąpiono testowy placeholder telefonu wzorcem firmowym `+48 730 101 000` w `ContactForm.tsx`.
  * **Wyniki testów końcowych:**
    * PHPUnit: **21/21 testów zielonych (PASS)**, 60 asercji.
    * Astro check: **59 plików, 0 błędów, 0 ostrzeżeń**.
    * Astro build: **15 stron statycznych wygenerowanych w 1.9s**.
