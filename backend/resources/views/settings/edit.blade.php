<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ustawienia strony | Multiserwis Leads API</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #09111f;
        --panel: rgba(11, 23, 38, 0.88);
        --panel-border: rgba(255, 255, 255, 0.08);
        --text: #f5f7fb;
        --muted: #aab8cf;
        --accent: #ff7a18;
        --success: #1fb980;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", "Helvetica Neue", sans-serif;
        color: var(--text);
        background:
          radial-gradient(circle at top right, rgba(255, 122, 24, 0.24), transparent 32%),
          linear-gradient(180deg, #0b1730 0%, var(--bg) 100%);
      }
      .wrap { max-width: 1280px; margin: 0 auto; padding: 48px 24px 64px; }
      .header { display: flex; justify-content: space-between; gap: 24px; align-items: end; margin-bottom: 32px; }
      h1 { margin: 0 0 8px; font-size: clamp(2rem, 4vw, 3rem); }
      p { margin: 0; color: var(--muted); }
      .panel { background: var(--panel); border: 1px solid var(--panel-border); border-radius: 24px; padding: 24px; backdrop-filter: blur(16px); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28); }
      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
      .section { margin-bottom: 28px; }
      .section h2 { margin: 0 0 16px; font-size: 1.1rem; }
      label { display: block; margin-bottom: 6px; font-size: 0.9rem; color: var(--muted); }
      input, textarea { width: 100%; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.18); color: var(--text); padding: 12px 14px; font: inherit; }
      textarea { min-height: 120px; resize: vertical; }
      .actions { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 24px; }
      .button { border: 0; border-radius: 999px; background: var(--accent); color: #1e140a; font-weight: 700; padding: 14px 20px; cursor: pointer; }
      .links { display: flex; gap: 16px; }
      .links a { color: var(--muted); text-decoration: none; }
      .links a:hover { color: var(--text); }
      .status { color: #dff7ed; background: rgba(31, 185, 128, 0.16); border: 1px solid rgba(31, 185, 128, 0.2); padding: 10px 14px; border-radius: 12px; margin-bottom: 20px; }
      .error { color: #ffd6d6; margin-top: 6px; font-size: 0.85rem; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } .header, .actions { flex-direction: column; align-items: start; } }
    </style>
  </head>
  <body>
    <main class="wrap">
      <div class="header">
        <div>
          <p>Panel operacyjny MVP</p>
          <h1>Ustawienia strony</h1>
          <p>Kontroluj dane kontaktowe, branding i podstawowe SEO z jednego rekordu w bazie.</p>
        </div>
        <div class="links">
          <a href="/admin/leads">Leady</a>
          <a href="/api/v1/site-settings" target="_blank" rel="noopener noreferrer">API ustawień</a>
        </div>
      </div>

      <section class="panel">
        @if (session('status'))
          <div class="status">{{ session('status') }}</div>
        @endif

        <form method="post" action="{{ route('admin.settings.update') }}">
          @csrf
          <div class="section">
            <h2>Branding i linki</h2>
            <div class="grid">
              <div><label for="site_name">Nazwa firmy</label><input id="site_name" name="site_name" value="{{ old('site_name', $settings->site_name) }}">@error('site_name')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="base_path">Base path frontendu</label><input id="base_path" name="base_path" value="{{ old('base_path', $settings->base_path) }}">@error('base_path')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="brand_mark">Skrót marki</label><input id="brand_mark" name="brand_mark" value="{{ old('brand_mark', $settings->brand_mark) }}">@error('brand_mark')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="brand_primary">Główna część logo</label><input id="brand_primary" name="brand_primary" value="{{ old('brand_primary', $settings->brand_primary) }}">@error('brand_primary')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="brand_accent">Akcent marki</label><input id="brand_accent" name="brand_accent" value="{{ old('brand_accent', $settings->brand_accent) }}">@error('brand_accent')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="training_site_url">URL strony szkoleniowej</label><input id="training_site_url" name="training_site_url" value="{{ old('training_site_url', $settings->training_site_url) }}">@error('training_site_url')<div class="error">{{ $message }}</div>@enderror</div>
            </div>
          </div>

          <div class="section">
            <h2>Kontakt i mapa</h2>
            <div class="grid">
              <div><label for="street">Ulica</label><input id="street" name="street" value="{{ old('street', $settings->street) }}">@error('street')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="postal_code">Kod pocztowy</label><input id="postal_code" name="postal_code" value="{{ old('postal_code', $settings->postal_code) }}">@error('postal_code')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="city">Miasto</label><input id="city" name="city" value="{{ old('city', $settings->city) }}">@error('city')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="contact_email">E-mail</label><input id="contact_email" name="contact_email" value="{{ old('contact_email', $settings->contact_email) }}">@error('contact_email')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="services_phone_label">Etykieta telefonu usług</label><input id="services_phone_label" name="services_phone_label" value="{{ old('services_phone_label', $settings->services_phone_label) }}">@error('services_phone_label')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="services_phone_value">Telefon usług</label><input id="services_phone_value" name="services_phone_value" value="{{ old('services_phone_value', $settings->services_phone_value) }}">@error('services_phone_value')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="services_phone_href">Href telefonu usług</label><input id="services_phone_href" name="services_phone_href" value="{{ old('services_phone_href', $settings->services_phone_href) }}">@error('services_phone_href')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="training_phone_label">Etykieta telefonu szkoleń</label><input id="training_phone_label" name="training_phone_label" value="{{ old('training_phone_label', $settings->training_phone_label) }}">@error('training_phone_label')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="training_phone_value">Telefon szkoleń</label><input id="training_phone_value" name="training_phone_value" value="{{ old('training_phone_value', $settings->training_phone_value) }}">@error('training_phone_value')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="training_phone_href">Href telefonu szkoleń</label><input id="training_phone_href" name="training_phone_href" value="{{ old('training_phone_href', $settings->training_phone_href) }}">@error('training_phone_href')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="opening_days">Dni pracy</label><input id="opening_days" name="opening_days" value="{{ old('opening_days', $settings->opening_days) }}">@error('opening_days')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="opening_details">Godziny pracy</label><input id="opening_details" name="opening_details" value="{{ old('opening_details', $settings->opening_details) }}">@error('opening_details')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="map_query">Fraza mapy</label><input id="map_query" name="map_query" value="{{ old('map_query', $settings->map_query) }}">@error('map_query')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="emergency_note">Notatka awaryjna</label><input id="emergency_note" name="emergency_note" value="{{ old('emergency_note', $settings->emergency_note) }}">@error('emergency_note')<div class="error">{{ $message }}</div>@enderror</div>
              <div style="grid-column: 1 / -1;"><label for="map_embed_url">Embed mapy</label><textarea id="map_embed_url" name="map_embed_url">{{ old('map_embed_url', $settings->map_embed_url) }}</textarea>@error('map_embed_url')<div class="error">{{ $message }}</div>@enderror</div>
              <div style="grid-column: 1 / -1;"><label for="map_directions_url">Link dojazdu</label><input id="map_directions_url" name="map_directions_url" value="{{ old('map_directions_url', $settings->map_directions_url) }}">@error('map_directions_url')<div class="error">{{ $message }}</div>@enderror</div>
            </div>
          </div>

          <div class="section">
            <h2>SEO</h2>
            <div class="grid">
              <div><label for="seo_site_name">Nazwa serwisu</label><input id="seo_site_name" name="seo_site_name" value="{{ old('seo_site_name', $settings->seo_site_name) }}">@error('seo_site_name')<div class="error">{{ $message }}</div>@enderror</div>
              <div><label for="seo_og_image_url">OG image URL</label><input id="seo_og_image_url" name="seo_og_image_url" value="{{ old('seo_og_image_url', $settings->seo_og_image_url) }}">@error('seo_og_image_url')<div class="error">{{ $message }}</div>@enderror</div>
              <div style="grid-column: 1 / -1;"><label for="seo_default_title">Domyślny tytuł SEO</label><input id="seo_default_title" name="seo_default_title" value="{{ old('seo_default_title', $settings->seo_default_title) }}">@error('seo_default_title')<div class="error">{{ $message }}</div>@enderror</div>
              <div style="grid-column: 1 / -1;"><label for="seo_default_description">Domyślny opis SEO</label><textarea id="seo_default_description" name="seo_default_description">{{ old('seo_default_description', $settings->seo_default_description) }}</textarea>@error('seo_default_description')<div class="error">{{ $message }}</div>@enderror</div>
            </div>
          </div>

          <div class="actions">
            <div class="links">
              <a href="/admin/leads">Przejdź do leadów</a>
            </div>
            <button class="button" type="submit">Zapisz ustawienia</button>
          </div>
        </form>
      </section>
    </main>
  </body>
</html>
