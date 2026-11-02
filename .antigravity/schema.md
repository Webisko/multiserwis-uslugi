# Schemat bazy danych (Multiserwis Usługi)

Data aktualizacji: 2026-11-02
Driver: SQLite (`database/database.sqlite`) / MySQL docelowo

---

## Tabele domenowe

### 1. `leads` (Zapytania ofertowe / Leady)
Tabela gromadząca zapytania z formularzy kontaktowych.
- `id` (integer, primary key, autoincrement)
- `public_id` (varchar, unique) — niezgadywalny identyfikator ULID (`lead_...`)
- `full_name` (varchar(120)) — imię i nazwisko
- `company` (varchar(160), nullable) — nazwa firmy
- `phone` (varchar(40)) — numer telefonu klienta (min. 9 cyfr)
- `email` (varchar(160)) — adres e-mail
- `service` (varchar(80)) — nazwa wybranej usługi
- `message` (text) — treść zapytania (min. 20 znaków)
- `consent` (tinyint(1)) — zgoda RODO
- `source_page` (varchar(255)) — ścieżka podstrony wysyłającej
- `source_context` (varchar(120)) — kontekst formularza
- `source_site` (varchar(120), nullable) — identyfikator serwisu
- `source_url` (text, nullable) — pełny adres URL
- `referrer` (text, nullable) — źródło przekierowania
- `locale` (varchar(20), nullable) — język klienta
- `user_agent` (text, nullable) — przeglądarka klienta
- `ip_address` (varchar(45), nullable) — IP zgłoszenia
- `status` (varchar(32), index, default: `'new'`) — status w CRM (`new`, `contacted`, `in_progress`, `closed`, `spam`)
- `is_spam` (tinyint(1), index, default: 0) — flaga bota / honeypota
- `spam_reason` (varchar(120), nullable) — przyczyna (`honeypot`)
- `notes` (text, nullable) — notatki wewnętrzne zespołu
- `assigned_user_id` (integer, nullable, foreign key -> `users.id`, `onDelete: set null`) — przypisany pracownik
- `created_at`, `updated_at` (datetime)

### 2. `site_settings` (Ustawienia globalne strony i SEO)
Pojedynczy rekord konfiguracyjny (Singleton / Current).
- `id` (integer, primary key, autoincrement)
- `site_name` (varchar) — nazwa strony
- `brand_mark` (varchar) — nazwa marki
- `brand_primary`, `brand_accent` (varchar) — kolory przewodnie
- `base_path` (varchar, default: `'/'`) — ścieżka bazowa serwisu
- `training_site_url` (varchar) — odnośnik do serwisu szkoleń
- `street`, `postal_code`, `city` (varchar) — dane adresowe
- `services_phone_label`, `services_phone_value`, `services_phone_href` (varchar) — główny telefon usługowy
- `services_secondary_phone_value`, `services_secondary_phone_href` (varchar, nullable) — drugi telefon
- `training_phone_label`, `training_phone_value`, `training_phone_href` (varchar) — telefon do szkoleń
- `contact_email` (varchar) — główny e-mail kontaktowy
- `opening_days`, `opening_details` (varchar) — godziny pracy biura
- `emergencyNote` (varchar, nullable) — informacja o dyżurze 24/7
- `map_query`, `map_embed_url`, `map_directions_url` (text) — dane mapy Google
- `seo_default_title`, `seo_default_description`, `seo_site_name` (varchar) — domyślne tagi SEO
- `seo_og_image_url` (text) — domyślna grafika OpenGraph
- `created_at`, `updated_at` (datetime)

### 3. `faq_items` (Baza wiedzy / Pytania i odpowiedzi)
- `id` (integer, primary key, autoincrement)
- `question` (varchar) — treść pytania
- `answer` (text) — treść odpowiedzi
- `category` (varchar) — kategoria (np. Ogólne, Wynajem, Relokacja)
- `sort_order` (integer, default: 0) — kolejność wyświetlania
- `is_active` (tinyint(1), default: 1) — status publikacji
- `is_featured` (tinyint(1), default: 0) — wyróżnienie na stronie głównej
- `created_at`, `updated_at` (datetime)

### 4. `service_offerings` (Katalog usług)
- `id` (integer, primary key, autoincrement)
- `slug` (varchar, unique) — unikalny slug usługi
- `title` (varchar) — tytuł usługi
- `short_description` (varchar) — krótki opis
- `highlights` (text / json) — lista punktów / atutów
- `page_path` (varchar, nullable) — ścieżka do dedykowanej podstrony
- `contact_label` (varchar) — etykieta w formularzu zapytań
- `training_text`, `training_link_label` (varchar, nullable) — odsyłacz do szkoleń
- `sort_order` (integer, default: 0) — kolejność
- `is_active` (tinyint(1), default: 1) — status aktywności
- `is_featured` (tinyint(1), default: 0) — wyróżnienie
- `created_at`, `updated_at` (datetime)

### 5. `portfolio_items` (Realizacje i projekty)
- `id` (integer, primary key, autoincrement)
- `title` (varchar(180)) — nazwa realizacji
- `slug` (varchar(200), unique) — unikalny slug
- `category` (varchar(120)) — kategoria prac
- `location` (varchar(120), nullable) — miejscowość / lokalizacja
- `short_description` (varchar(255), nullable) — opis
- `highlights` (text / json) — kluczowe punkty projektu
- `image_url` (varchar(255), nullable) — zdjęcie realizacji
- `sort_order` (integer, default: 10) — kolejność
- `is_featured` (tinyint(1), default: 1) — wyróżnienie
- `is_active` (tinyint(1), default: 1) — widoczność
- `created_at`, `updated_at` (datetime)

### 6. `users` (Konta użytkowników i zespół CMS)
- `id` (integer, primary key, autoincrement)
- `name` (varchar) — imię i nazwisko
- `email` (varchar, unique) — login e-mail
- `email_verified_at` (datetime, nullable)
- `password` (varchar) — hashowane hasło bcrypt
- `remember_token` (varchar, nullable)
- `job_title` (varchar(120), nullable) — stanowisko
- `phone` (varchar(40), nullable) — telefon służbowy
- `role` (varchar(40), default: `'admin'`) — uprawnienia (`admin`, `manager`, `staff`)
- `is_active` (tinyint(1), default: 1) — blokada konta
- `receives_lead_notifications` (tinyint(1), default: 1) — powiadomienia o nowych leadach
- `created_at`, `updated_at` (datetime)

### 7. `notifications` (Powiadomienia w bazie dla Filamentu)
- `id` (uuid, primary key)
- `type` (varchar)
- `notifiable_type`, `notifiable_id` (morphs)
- `data` (text)
- `read_at` (timestamp, nullable)
- `created_at`, `updated_at` (datetime)
