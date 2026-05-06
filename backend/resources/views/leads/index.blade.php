<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Leady | Multiserwis Leads API</title>
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
        --danger: #ef5350;
        --warning: #f6c65b;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: "Segoe UI", "Helvetica Neue", sans-serif;
        background:
          radial-gradient(circle at top right, rgba(255, 122, 24, 0.24), transparent 32%),
          linear-gradient(180deg, #0b1730 0%, var(--bg) 100%);
        color: var(--text);
      }

      .wrap {
        max-width: 1280px;
        margin: 0 auto;
        padding: 48px 24px 64px;
      }

      .header {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        align-items: end;
        margin-bottom: 32px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: clamp(2rem, 4vw, 3rem);
      }

      p {
        margin: 0;
        color: var(--muted);
      }

      .panel {
        background: var(--panel);
        border: 1px solid var(--panel-border);
        border-radius: 24px;
        overflow: hidden;
        backdrop-filter: blur(16px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
      }

      .table-wrap {
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 980px;
      }

      th,
      td {
        padding: 16px 18px;
        text-align: left;
        vertical-align: top;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }

      th {
        font-size: 0.78rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--muted);
        background: rgba(255, 255, 255, 0.03);
      }

      td strong {
        display: block;
        margin-bottom: 4px;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        padding: 6px 12px;
        font-size: 0.8rem;
        font-weight: 700;
      }

      .pill-new {
        color: #dff7ed;
        background: rgba(31, 185, 128, 0.18);
      }

      .pill-spam {
        color: #fff0c7;
        background: rgba(246, 198, 91, 0.16);
      }

      .pill-other {
        color: #ffd6d6;
        background: rgba(239, 83, 80, 0.16);
      }

      .meta {
        display: grid;
        gap: 8px;
      }

      .muted {
        color: var(--muted);
      }

      .message {
        max-width: 32rem;
        line-height: 1.55;
        white-space: pre-wrap;
      }

      .footer {
        padding: 18px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        color: var(--muted);
      }

      @media (max-width: 760px) {
        .wrap {
          padding: 32px 16px 48px;
        }

        .header {
          flex-direction: column;
          align-items: start;
        }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <div class="header">
        <div>
          <p>Panel operacyjny MVP</p>
          <h1>Leady kontaktowe</h1>
          <p>Lista zapisanych zapytań z formularzy Astro. Widok tymczasowy do czasu wdrożenia pełnego panelu Filament.</p>
        </div>
        <p>Liczba rekordów na stronie: {{ $leads->count() }}</p>
      </div>

      <section class="panel">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Kontakt</th>
                <th>Usługa</th>
                <th>Wiadomość</th>
                <th>Status</th>
                <th>Źródło</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              @forelse ($leads as $lead)
                <tr>
                  <td>
                    <strong>{{ $lead->public_id }}</strong>
                    <span class="muted">{{ $lead->ip_address ?: 'brak IP' }}</span>
                  </td>
                  <td>
                    <strong>{{ $lead->full_name }}</strong>
                    <div class="meta">
                      <span>{{ $lead->email }}</span>
                      <span>{{ $lead->phone }}</span>
                      <span class="muted">{{ $lead->company ?: 'Brak firmy' }}</span>
                    </div>
                  </td>
                  <td>{{ $lead->service }}</td>
                  <td class="message">{{ $lead->message }}</td>
                  <td>
                    <span class="pill {{ $lead->status === 'new' ? 'pill-new' : ($lead->status === 'spam' ? 'pill-spam' : 'pill-other') }}">
                      {{ $lead->status }}
                    </span>
                    @if ($lead->spam_reason)
                      <div class="muted" style="margin-top: 8px;">{{ $lead->spam_reason }}</div>
                    @endif
                  </td>
                  <td>
                    <div class="meta">
                      <span>{{ $lead->source_context }}</span>
                      <span class="muted">{{ $lead->source_page }}</span>
                      <span class="muted">{{ $lead->source_site ?: 'brak site' }}</span>
                    </div>
                  </td>
                  <td>
                    <strong>{{ optional($lead->created_at)->format('Y-m-d') }}</strong>
                    <span class="muted">{{ optional($lead->created_at)->format('H:i:s') }}</span>
                  </td>
                </tr>
              @empty
                <tr>
                  <td colspan="7">Brak leadów w bazie.</td>
                </tr>
              @endforelse
            </tbody>
          </table>
        </div>
        <div class="footer">
          <span>Backend MVP Laravel zapisuje leady do sqlite i wystawia API pod `/api/v1/leads`.</span>
          <span>{{ $leads->firstItem() ?? 0 }}-{{ $leads->lastItem() ?? 0 }} / {{ $leads->total() }}</span>
        </div>
      </section>
    </main>
  </body>
</html>
