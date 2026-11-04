# Umami Analytics - Self-Hosted na serwerze SEOHost

## 1. Architektura i Konfiguracja Produkcyjna

W projekcie **Multiserwis** analityka Umami działa w modelu **Self-Hosted** bezpośrednio na serwerze SEOHost (`h108.seohost.pl`) pod dedykowaną subdomeną:

- **Adres panelu i skryptu:** `https://stats.multiserwis.tech`
- **Adres trackera:** `https://stats.multiserwis.tech/script.js`
- **Website ID (multiserwis.tech):** `d8f4510b-b152-47d5-8664-92e106d8713a`
- **Baza danych:** MariaDB 11.4 (`srv127364_uslugi` na `localhost:3306`)
- **Środowisko uruchomieniowe:** CloudLinux NodeJS Selector v20 + Phusion Passenger / LiteSpeed

---

## 2. Kluczowe zalety dla klienta

- ✅ **100% Cookieless i RODO:** Zero ciasteczek profilujących, zero banera cookies na starcie.
- ✅ **Pełna suwerenność danych:** Wszystkie dane o wizytach trafiają do bazy MariaDB klienta na SEOHost.
- ✅ **Brak limitu odsłon:** Brak ograniczeń SaaS (np. 10 000 zdarzeń/miesiąc).
- ✅ **Prestiżowy adres:** Skrypt analityczny ładuje się z własnej subdomeny `stats.multiserwis.tech`.

---

## 3. Parametry Środowiskowe Frontendu (Astro)

Podczas produkcyjnego buildu (`npm.cmd run build:production`) zmienne są automatycznie wstrzykiwane przez `scripts/run-astro-build.mjs`:

```env
PUBLIC_ENABLE_ANALYTICS=true
PUBLIC_UMAMI_SCRIPT_URL=https://stats.multiserwis.tech/script.js
PUBLIC_UMAMI_WEBSITE_ID=d8f4510b-b152-47d5-8664-92e106d8713a
PUBLIC_UMAMI_DOMAINS=multiserwis.tech
```

---

## 4. Dostęp do Panelu Administracyjnego Umami

- **URL:** `https://stats.multiserwis.tech`
- **Domyślny login:** `admin`
- **Domyślne hasło:** `umami` (zalecana zmiana w profilu po pierwszym logowaniu)
