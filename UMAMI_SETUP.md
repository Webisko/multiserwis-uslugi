# Umami Analytics - Instrukcja Wdrożenia

## Czym jest Umami?

Umami to **open-source** narzędzie analityczne, które:

- ✅ Nie wymaga zgody na ciasteczka (RODO-friendly)
- ✅ Szanuje prywatność użytkowników
- ✅ Daje pełną kontrolę nad danymi
- ✅ Jest lekkie i szybkie

## Rekomendowany wariant

W tym projekcie rekomendowany jest wariant **self-hosted**, zgodny z założeniem pełnej kontroli nad infrastrukturą i danymi.

### Self-hosted Umami (rekomendacja)

Wymaga: VPS (np. Hetzner, DigitalOcean) + Docker

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/umami-software/umami.git
cd umami

# 2. Skopiuj przykładowy plik env
cp .env.example .env

# 3. Edytuj .env i ustaw DATABASE_URL (PostgreSQL)
nano .env

# 4. Uruchom z Docker Compose
docker-compose up -d

# 5. Otwórz http://twoj-serwer:3000
# Login: admin / umami
```

## Aktywacja na stronie

Repo zawiera teraz przykładowe zmienne środowiskowe w `.env.example`:

- `PUBLIC_ENABLE_ANALYTICS`
- `PUBLIC_CONTACT_API_URL`
- `PUBLIC_UMAMI_SCRIPT_URL`
- `PUBLIC_UMAMI_WEBSITE_ID`

Przykład dla self-hosted:

```env
PUBLIC_ENABLE_ANALYTICS=true
PUBLIC_UMAMI_SCRIPT_URL=https://analytics.twoja-domena.pl/script.js
PUBLIC_UMAMI_WEBSITE_ID=abc123-twoje-id
```

Mechanizm aktywacji jest już w repo i działa tylko wtedy, gdy:

- `PUBLIC_ENABLE_ANALYTICS=true`
- ustawione są oba parametry Umami

Rekomendacja środowiskowa:

- preview / GitHub Pages: `PUBLIC_ENABLE_ANALYTICS=false`
- produkcja: `PUBLIC_ENABLE_ANALYTICS=true`

Dzięki temu nie zbierasz przypadkowo ruchu testowego z preview.

## Weryfikacja

1. Uruchom stronę: `npm.cmd run dev`
2. Otwórz w przeglądarce
3. Sprawdź panel Umami - powinieneś zobaczyć wizytę w czasie rzeczywistym

## Zalety vs Google Analytics

| Cecha           | Umami self-hosted     | Google Analytics  |
| --------------- | --------------------- | ----------------- |
| Prywatność      | ✅ Pełna              | ❌ Dane u Google  |
| RODO            | ✅ Prostsze wdrożenie | ⚠️ Wymaga analizy bannera |
| Szybkość        | ✅ Lekki skrypt       | ❌ Cięższy skrypt |
| Własność danych | ✅ Twoje              | ❌ Google         |
| Koszty          | ✅ W ramach VPS       | ✅ Darmowe        |


## Wsparcie

- Dokumentacja: https://umami.is/docs
- GitHub: https://github.com/umami-software/umami
