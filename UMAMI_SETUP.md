# Umami Analytics - Instrukcja Wdrożenia

## Czym jest Umami?

Umami to **open-source** narzędzie analityczne, które:

- ✅ Nie wymaga zgody na ciasteczka (RODO-friendly)
- ✅ Szanuje prywatność użytkowników
- ✅ Daje pełną kontrolę nad danymi
- ✅ Jest lekkie i szybkie

## Opcje Wdrożenia

### Opcja 1: Umami Cloud (Najszybsza)

1. Przejdź na https://umami.is/
2. Załóż darmowe konto (do 100k pageviews/miesiąc)
3. Dodaj nową stronę
4. Skopiuj **Website ID**

### Opcja 2: Self-hosted (Pełna Kontrola)

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

## Aktywacja na Stronie

Po uzyskaniu **Website ID**:

1. Otwórz plik: `src/layouts/Layout.astro`
2. Znajdź zakomentowaną linię:

```html
<!-- <script defer src="https://cloud.umami.is/script.js" data-website-id="YOUR-WEBSITE-ID"></script> -->
```

3. Odkomentuj i wklej swoje ID:

```html
<script
  defer
  src="https://cloud.umami.is/script.js"
  data-website-id="abc123-twoje-id"
></script>
```

4. Jeśli używasz self-hosted, zmień URL:

```html
<script
  defer
  src="https://analytics.twoja-domena.pl/script.js"
  data-website-id="abc123"
></script>
```

## Weryfikacja

1. Uruchom stronę: `npm run dev`
2. Otwórz w przeglądarce
3. Sprawdź panel Umami - powinieneś zobaczyć wizytę w czasie rzeczywistym

## Zalety vs Google Analytics

| Cecha           | Umami               | Google Analytics  |
| --------------- | ------------------- | ----------------- |
| Prywatność      | ✅ Pełna            | ❌ Dane u Google  |
| RODO            | ✅ Nie wymaga zgody | ⚠️ Wymaga bannera |
| Szybkość        | ✅ ~2KB             | ❌ ~45KB          |
| Własność danych | ✅ Twoje            | ❌ Google         |
| Koszty          | ✅ Darmowe          | ✅ Darmowe        |

## Wsparcie

- Dokumentacja: https://umami.is/docs
- GitHub: https://github.com/umami-software/umami
