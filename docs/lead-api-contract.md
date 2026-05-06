# Kontrakt API: leady kontaktowe

## Cel

Ten dokument definiuje minimalny kontrakt integracyjny między frontendem Astro a backendem Laravel dla formularzy kontaktowych i zapytań ofertowych.

Założenia:

- frontend pozostaje lekki i statyczny
- backend odpowiada za zapis leadów, walidację, statusy i ewentualną wysyłkę e-maili
- kontrakt obejmuje tylko leady sprzedażowe, bez pełnego CMS-a

## Endpoint MVP

### Zapis nowego leada

- metoda: `POST`
- endpoint produkcyjny: `/api/v1/leads`
- content type: `application/json`

### Konfiguracja frontendu

Frontend Astro korzysta z publicznej zmiennej środowiskowej:

- `PUBLIC_CONTACT_API_URL`

Jeżeli zmienna nie jest ustawiona, formularz działa nadal w uczciwym trybie preview i nie udaje zapisu do backendu.

## Przykładowy request

```json
{
  "fullName": "Jan Kowalski",
  "company": "ABC Industrial Sp. z o.o.",
  "phone": "+48 730 202 000",
  "email": "jan.kowalski@abc-industrial.pl",
  "service": "Relokacja Maszyn",
  "message": "Potrzebujemy relokacji dwóch linii produkcyjnych w czerwcu w okolicach Kutna.",
  "consent": true,
  "source": {
    "page": "/kontakt",
    "context": "contact-page",
    "site": "multiserwis-uslugi",
    "url": "https://twoja-domena.pl/kontakt",
    "referrer": "https://google.com/"
  },
  "meta": {
    "locale": "pl-PL",
    "userAgent": "Mozilla/5.0",
    "submittedAt": "2026-05-06T13:00:00.000Z"
  },
  "website": ""
}
```

## Pola requestu

### Wymagane

- `fullName`: string, min. 2 znaki, max. 120
- `phone`: string, min. 9 cyfr po oczyszczeniu
- `email`: poprawny adres e-mail
- `service`: string, jedna z dozwolonych kategorii lub `Inne`
- `message`: string, min. 20 znaków, max. 5000
- `consent`: boolean, musi być `true`
- `source.page`: string
- `source.context`: string

### Opcjonalne

- `company`: string, max. 160
- `source.site`
- `source.url`
- `source.referrer`
- `meta.locale`
- `meta.userAgent`
- `meta.submittedAt`

### Techniczne / antyspam

- `website`: honeypot; jeśli nie jest puste, backend powinien odrzucić zgłoszenie lub oznaczyć je jako spam

## Odpowiedzi API

### Sukces: `201 Created`

```json
{
  "data": {
    "id": "lead_01JT0Y8S7N5B2YZ1QFJ8A4K8E9",
    "status": "new",
    "createdAt": "2026-05-06T13:00:00.000Z"
  },
  "message": "Zapytanie zostało zapisane. Skontaktujemy się możliwie szybko."
}
```

### Błąd walidacji: `422 Unprocessable Entity`

```json
{
  "message": "Dane formularza są nieprawidłowe.",
  "errors": {
    "email": [
      "Podaj poprawny adres e-mail."
    ],
    "message": [
      "Wiadomość musi zawierać co najmniej 20 znaków."
    ]
  }
}
```

### Wykryty spam: `422` lub `202`

Rekomendacja MVP:

- dla niepustego `website` zwracaj neutralną odpowiedź sukcesu bez zapisu do głównej kolejki operacyjnej
- nie ujawniaj frontowi, że reguła antyspamowa została uruchomiona

## Model danych po stronie Laravel

### Tabela `leads`

- `id`
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
- `created_at`
- `updated_at`

## Statusy operacyjne leada

- `new`
- `in_progress`
- `qualified`
- `won`
- `lost`
- `spam`

## Reguły backendowe

- walidacja po stronie Laravel jest obowiązkowa niezależnie od walidacji frontendowej
- logika antyspamowa nie może polegać wyłącznie na froncie
- warto logować IP i `user_agent` do diagnostyki nadużyć
- odpowiedź API ma być krótka i stabilna, bez zwracania danych panelowych

## Integracja z frontendem Astro

Docelowy przepływ:

1. Reactowy `ContactForm` wysyła JSON do `/api/v1/leads`
2. Po `201` frontend pokazuje komunikat sukcesu
3. Po `422` frontend mapuje błędy na pola formularza
4. Po `5xx` frontend pokazuje komunikat techniczny i zachęca do kontaktu telefonicznego

## Zakres poza MVP

Na później, ale nie w pierwszym wdrożeniu:

- reCAPTCHA lub alternatywa self-hosted
- automatyczne powiadomienia e-mail i webhooki
- scoring leadów
- integracja z CRM
- wielojęzyczność lub wiele formularzy o różnych typach biznesowych