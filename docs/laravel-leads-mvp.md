# Laravel MVP: leady, ustawienia strony, FAQ i usługi

## Status dokumentu

Ten dokument nie opisuje już wyłącznie planu. W aktualnym repo istnieje działające MVP backendu w katalogu `backend/`.

Co jest już wdrożone:

- endpoint `POST /api/v1/leads`
- endpoint `GET /api/v1/site-settings`
- endpoint `GET /api/v1/faqs`
- endpoint `GET /api/v1/service-offerings`
- panel Filament pod `GET /admin`
- zasób `Leady` w Filament
- zasób `Ustawienia strony` w Filament
- zasób `FAQ` w Filament
- zasób `Usługi` w Filament
- dispatcher preview rebuildu do GitHub Actions po zmianach treści
- eksporter statycznych snapshotów preview do `src/generated/` dla GitHub Pages
- walidacja requestu przez `StoreLeadRequest`
- zapis leadów do sqlite
- klasyfikacja honeypot `website` jako spam
- lokalne logowanie do panelu Filament ograniczone przez `FILAMENT_ADMIN_EMAILS`
- singleton ustawień strony zapisujący bazowe dane kontaktowe i SEO
- modele FAQ i katalogu usług z domyślną treścią startową
- centralny dispatcher rebuildu preview skonfigurowany przez env
- lokalny przepływ end-to-end z Astro do Laravel został zweryfikowany
- repo zawiera pakiet startowy do wdrożenia VPS: szablony Nginx, backup sqlite i healthcheck

Co nadal pozostaje do wdrożenia:

- bardziej szczegółowe ustawienia sekcji i dalszych treści
- maile, webhooki i dalszy workflow operacyjny
- finalne spięcie wdrożenia na VPS jako oddzielona warstwa backendowa

## Lokalizacja implementacji

Najważniejsze pliki w aktualnym repo:

- `backend/routes/api.php`
- `backend/routes/web.php`
- `backend/app/Providers/Filament/AdminPanelProvider.php`
- `backend/app/Models/User.php`
- `backend/app/Filament/Resources/Leads/LeadResource.php`
- `backend/app/Filament/Resources/SiteSettings/SiteSettingResource.php`
- `backend/app/Filament/Resources/FaqItems/FaqItemResource.php`
- `backend/app/Filament/Resources/ServiceOfferings/ServiceOfferingResource.php`
- `backend/app/Http/Requests/StoreLeadRequest.php`
- `backend/app/Http/Requests/UpdateSiteSettingRequest.php`
- `backend/app/Http/Controllers/Api/V1/LeadController.php`
- `backend/app/Http/Controllers/Api/V1/SiteSettingController.php`
- `backend/app/Http/Controllers/Api/V1/FaqController.php`
- `backend/app/Http/Controllers/Api/V1/ServiceOfferingController.php`
- `backend/app/Models/Lead.php`
- `backend/app/Models/SiteSetting.php`
- `backend/app/Models/FaqItem.php`
- `backend/app/Models/ServiceOffering.php`
- `backend/app/Observers/ContentSyncObserver.php`
- `backend/app/Services/FrontendRebuildDispatcher.php`
- `backend/app/Services/StaticPreviewSnapshotExporter.php`
- `backend/config/frontend_rebuild.php`
- `backend/config/preview_snapshot.php`
- `backend/database/migrations/2026_05_06_142001_create_leads_table.php`
- `backend/database/migrations/2026_05_06_170000_create_site_settings_table.php`
- `backend/database/migrations/2026_05_06_180000_create_faq_items_table.php`
- `backend/database/migrations/2026_05_06_180100_create_service_offerings_table.php`
- `backend/tests/Feature/Feature/LeadSubmissionTest.php`
- `backend/tests/Feature/SiteSettingApiTest.php`
- `backend/tests/Feature/FaqApiTest.php`
- `backend/tests/Feature/ServiceOfferingApiTest.php`

## Zakres MVP

Backend zapewnia teraz:

- publiczny endpoint `POST /api/v1/leads`
- publiczny endpoint `GET /api/v1/site-settings`
- publiczny endpoint `GET /api/v1/faqs`
- publiczny endpoint `GET /api/v1/service-offerings`
- panel Filament z logowaniem pod `GET /admin/login`
- operacyjną listę leadów z edycją statusu i notatek
- edycję singletonu ustawień strony pod `GET /admin/settings`
- edycję FAQ pod `GET /admin/faq-items`
- edycję katalogu usług pod `GET /admin/service-offerings`
- automatyczny dispatch webhooka preview rebuildu po zapisach treści, o ile env backendu go włączy
- automatyczny eksport snapshotów preview po zapisach treści, o ile env backendu go włączy
- walidację danych wejściowych zgodną z frontendem Astro
- zapis do tabeli `leads`
- oznaczanie honeypot jako `spam`
- singleton `site_settings` dla danych kontaktowych i bazowych ustawień SEO
- tabele `faq_items` i `service_offerings` z domyślną treścią startową materializowaną przy pierwszym użyciu

## Model danych `leads`

Aktualnie tabela obejmuje między innymi:

- `public_id`
- `full_name`
- `company`
- `phone`
- `email`
- `service`
- `message`
- `consent`
- `source_page`
- `source_context`
- `source_site`
- `source_url`
- `referrer`
- `locale`
- `user_agent`
- `ip_address`
- `status`
- `is_spam`
- `spam_reason`
- `notes`

## Endpoint API

### `POST /api/v1/leads`

Zachowanie:

- poprawne zgłoszenie zwraca `201`
- honeypot zwraca neutralny `202`, ale zapisuje rekord jako `spam`
- błąd walidacji zwraca `422`

Przykładowa odpowiedź sukcesu:

```json
{
  "data": {
    "id": "lead_01kqyvaafaxerh44ebnr37brtd",
    "status": "new",
    "createdAt": "2026-05-06T14:33:22.000000Z"
  },
  "message": "Zapytanie zostało zapisane. Skontaktujemy się możliwie szybko."
}
```

### `GET /api/v1/site-settings`

Zachowanie:

- zwraca `200`
- udostępnia payload z sekcjami `company` i `seo`
- frontend Astro może użyć go po stronie serwera i wstrzyknąć jeden snapshot do hydracji React

### `GET /api/v1/faqs`

Zachowanie:

- zwraca `200`
- udostępnia pełną listę pytań FAQ, listę kategorii i grupy wyróżnione na stronę główną
- przy pierwszym użyciu potrafi zmaterializować domyślne rekordy startowe

### `GET /api/v1/service-offerings`

Zachowanie:

- zwraca `200`
- udostępnia katalog usług, cross-sell szkoleniowy i opcje do formularza kontaktowego
- przy pierwszym użyciu potrafi zmaterializować domyślne rekordy startowe

## Panel operacyjny MVP

Panel Filament i jego zasoby służą teraz do:

- potwierdzenia, że lead faktycznie trafił do bazy
- przeglądu najnowszych zgłoszeń
- zmiany statusu leada i prowadzenia notatek operacyjnych
- edycji bazowych danych kontaktowych i ustawień SEO
- edycji FAQ i katalogu usług używanych przez frontend Astro
- szybkiej pracy operacyjnej przed wdrożeniem kolejnych zasobów (sekcje, certyfikaty, webhooki)

To nie jest jeszcze pełny docelowy panel administracyjny, ale Filament jest już wdrożony i używalny dla kluczowych obszarów.

## Lokalny runtime

Repo zawiera lokalne wsparcie środowiskowe:

- `backend/database/database.sqlite` jako lokalna baza
- `.tools/php.ini` jako lokalna konfiguracja PHP pod Composer i Laravel
- `.env.local` w głównym repo do spięcia Astro z lokalnym API

Praktyczne komendy lokalne:

```powershell
npm.cmd run backend:migrate
npm.cmd run backend:export-preview
npm.cmd run backend:serve
npm.cmd run dev
```

Domyślne lokalne adresy:

- frontend: `http://127.0.0.1:3000/multiserwis-uslugi/`
- API: `http://127.0.0.1:8081/api/v1/leads`
- settings API: `http://127.0.0.1:8081/api/v1/site-settings`
- FAQ API: `http://127.0.0.1:8081/api/v1/faqs`
- services API: `http://127.0.0.1:8081/api/v1/service-offerings`
- panel: `http://127.0.0.1:8081/admin`
- leady: `http://127.0.0.1:8081/admin/leads`
- ustawienia: `http://127.0.0.1:8081/admin/settings`
- FAQ: `http://127.0.0.1:8081/admin/faq-items`
- usługi: `http://127.0.0.1:8081/admin/service-offerings`

Lokalny dostęp do panelu:

- dozwolone adresy e-mail są sterowane przez `FILAMENT_ADMIN_EMAILS`
- użytkownika można utworzyć komendą `php artisan make:filament-user`
- w tym środowisku testy feature zostały zweryfikowane bezpośrednio przez `vendor/bin/phpunit`, ponieważ `artisan test` potrafił zgubić część rozszerzeń PHP uruchamianych z repo-local `php.ini`
- preview rebuild można włączyć przez `FRONTEND_REBUILD_ENABLED=true` i token GitHub o uprawnieniach do `repository_dispatch`
- lokalny eksport snapshotów do GitHub Pages preview można sterować przez `STATIC_PREVIEW_EXPORT_ENABLED=true`

## GitHub Pages preview bez publicznego API

Na obecnym etapie repo nie wymaga jeszcze publicznego VPS, aby klient widział aktualne treści w preview. Backend Laravel potrafi wyeksportować lokalne dane do statycznych plików JSON, które są potem konsumowane przez Astro podczas buildu preview.

Mechanizm działa następująco:

- `npm.cmd run backend:export-preview` zapisuje aktualny snapshot ustawień, FAQ i usług do `src/generated/`
- `src/lib/siteSettings.ts` i `src/lib/siteContent.ts` najpierw próbują pobrać dane z API Laravel, ale jeżeli endpointy nie są dostępne, czytają snapshoty z repo
- po zapisach w Filament observer może odświeżyć snapshoty lokalnie i opcjonalnie uruchomić preview rebuild przez GitHub Actions

To jest rozwiązanie stricte pod GitHub Pages preview i development lokalny. Produkcja nadal powinna korzystać z realnego backendu Laravel na VPS.

## Kolejny etap

Najbardziej naturalny następny krok to spisać i wdrożyć docelowy deploy VPS: reverse proxy, osobne domeny/subdomeny, backupy, monitoring i automatyzację produkcyjnego release.
