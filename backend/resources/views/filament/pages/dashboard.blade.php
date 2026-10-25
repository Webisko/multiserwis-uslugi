<x-filament-panels::page class="fi-page-dashboard">
    {{-- 1. HERO BANNER (matching Szkolenia CMS structure) --}}
    <div class="ms-dash-hero">
        <div>
            <div class="ms-dash-hero-badge">
                <span>✨</span>
                <span>Multiserwis Kutno &bull; Panel zarządzania usługami</span>
            </div>
            <h1 class="ms-dash-hero-title">
                Dzień dobry,<br>administratorze 👋
            </h1>
            <p class="ms-dash-hero-desc">
                Strona usługowa działa stabilnie. Masz obecnie <strong>{{ $activeServicesCount }} aktywnych usług</strong> w ofercie
                oraz <strong>{{ $newLeadsCount }} {{ $newLeadsCount === 1 ? 'nowe zapytanie' : 'nowych zapytań' }}</strong> oczekujących na kontakt.
            </p>
        </div>

        <div class="ms-dash-hero-actions">
            <a href="{{ $urls['createService'] }}" class="ms-btn-primary">
                <span>⊕</span>
                <span>Dodaj nową usługę</span>
            </a>
            <a href="{{ $urls['createFaq'] }}" class="ms-btn-secondary">
                <span>❓</span>
                <span>Dodaj pytanie i odpowiedź</span>
            </a>
            <a href="{{ $urls['listLeads'] }}" class="ms-btn-secondary">
                <span>📋</span>
                <span>Przeglądaj zapytania</span>
            </a>
        </div>
    </div>

    {{-- 2. FOUR KPI CARDS ROW --}}
    <div class="ms-kpi-grid">
        {{-- Card 1: Zapytania --}}
        <a href="{{ $urls['listLeads'] }}" class="ms-kpi-card">
            <div class="ms-kpi-top">
                <span class="ms-kpi-label">Zapytania od klientów</span>
                <div class="ms-kpi-icon" style="background-color:rgba(59,130,246,0.12);color:#2563eb;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                </div>
            </div>
            <div class="ms-kpi-value">{{ $totalLeadsCount }}</div>
            <div class="ms-kpi-meta">
                <span style="color:#16a34a;font-weight:700;">● {{ $newLeadsCount }} nowych</span>
                <span>&bull;</span>
                <span style="color:#d97706;font-weight:700;">{{ $inProgressLeadsCount }} w realizacji</span>
            </div>
        </a>

        {{-- Card 2: Usługi --}}
        <a href="{{ $urls['listServices'] }}" class="ms-kpi-card">
            <div class="ms-kpi-top">
                <span class="ms-kpi-label">Aktywne usługi</span>
                <div class="ms-kpi-icon" style="background-color:rgba(245,158,11,0.14);color:#d97706;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                </div>
            </div>
            <div class="ms-kpi-value">{{ $activeServicesCount }}</div>
            <div class="ms-kpi-meta">
                <span style="color:#d97706;font-weight:700;">Relokacje, wynajem, UDT</span>
                <span>&bull;</span>
                <span>{{ $featuredServicesCount }} na str. głównej</span>
            </div>
        </a>

        {{-- Card 3: Pytania i odpowiedzi --}}
        <a href="{{ $urls['listFaqs'] }}" class="ms-kpi-card">
            <div class="ms-kpi-top">
                <span class="ms-kpi-label">Pytania i odpowiedzi</span>
                <div class="ms-kpi-icon" style="background-color:rgba(16,185,129,0.12);color:#059669;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>
            </div>
            <div class="ms-kpi-value">{{ $activeFaqsCount }}</div>
            <div class="ms-kpi-meta">
                <span><strong>{{ $featuredFaqsCount }}</strong> wyróżnionych</span>
                <span>&bull;</span>
                <span>{{ $faqCategoriesCount }} kategorii</span>
            </div>
        </a>

        {{-- Card 4: Infolinia i kontakt --}}
        <a href="{{ $urls['editSettings'] }}" class="ms-kpi-card">
            <div class="ms-kpi-top">
                <span class="ms-kpi-label">Infolinia serwisowa</span>
                <div class="ms-kpi-icon" style="background-color:rgba(168,85,247,0.12);color:#9333ea;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                </div>
            </div>
            <div class="ms-kpi-value" style="font-size:24px;">{{ $settings->services_phone_value }}</div>
            <div class="ms-kpi-meta">
                <span style="color:#16a34a;font-weight:700;">↑ Dyżur 24/7</span>
                <span>&bull;</span>
                <span>{{ $settings->contact_email }}</span>
            </div>
        </a>
    </div>

    {{-- 3. TWO-COLUMN BOTTOM SECTION --}}
    <div class="ms-bottom-grid">
        {{-- Left Column: Service Portfolio & Scope Coverage --}}
        <div class="ms-panel-card">
            <div class="ms-panel-header">
                <div>
                    <div class="ms-panel-eyebrow">Struktura oferty</div>
                    <h2 class="ms-panel-title">Zakres usług i aktywność na stronie</h2>
                </div>
                <a href="{{ $urls['listServices'] }}" class="ms-panel-link">
                    Wszystkie usługi &rarr;
                </a>
            </div>

            <div>
                @foreach($serviceBreakdown as $srv)
                    <div class="ms-bar-row">
                        <div class="ms-bar-top">
                            <a href="{{ $srv['edit_url'] }}" class="ms-bar-name">
                                {{ $srv['title'] }}
                            </a>
                            <span class="ms-bar-stat">
                                {{ $srv['highlights_count'] }} pkt zakresu
                                @if($srv['leads_count'] > 0)
                                    &bull; {{ $srv['leads_count'] }} zapytań
                                @endif
                                ({{ $srv['is_featured'] ? 'strona główna' : 'podstrona' }})
                            </span>
                        </div>
                        <div class="ms-bar-track">
                            <div class="ms-bar-fill" style="width: {{ $srv['percent'] }}%;"></div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- Right Column: Latest B2B Inquiries (or Key Service Areas if no leads yet) --}}
        <div class="ms-panel-card">
            <div class="ms-panel-header">
                <div>
                    <div class="ms-panel-eyebrow">Obsługa klientów</div>
                    <h2 class="ms-panel-title">
                        {{ $latestLeads->isNotEmpty() ? 'Ostatnie zapytania z formularza' : 'Główne obszary wykonawcze' }}
                    </h2>
                </div>
                <a href="{{ $latestLeads->isNotEmpty() ? $urls['listLeads'] : $urls['listServices'] }}" class="ms-panel-link">
                    Wszystkie &rarr;
                </a>
            </div>

            <div>
                @if($latestLeads->isNotEmpty())
                    @foreach($latestLeads as $idx => $lead)
                        <a href="{{ \App\Filament\Resources\Leads\LeadResource::getUrl('edit', ['record' => $lead]) }}" class="ms-list-item">
                            <div class="ms-list-left">
                                <div class="ms-list-num">{{ $idx + 1 }}</div>
                                <div style="min-width:0;">
                                    <div class="ms-list-title">{{ $lead->full_name }} {{ $lead->company ? '• '.$lead->company : '' }}</div>
                                    <div class="ms-list-sub">{{ $lead->service }} &bull; {{ $lead->phone }}</div>
                                </div>
                            </div>
                            <span class="ms-list-badge">
                                {{ match($lead->status) { 'new' => 'Nowy', 'in_progress' => 'W realizacji', 'done' => 'Zamknięty', default => $lead->status } }}
                            </span>
                        </a>
                    @endforeach
                @else
                    @foreach($serviceBreakdown->take(5)->values() as $idx => $srv)
                        <a href="{{ $srv['edit_url'] }}" class="ms-list-item">
                            <div class="ms-list-left">
                                <div class="ms-list-num">{{ $idx + 1 }}</div>
                                <div style="min-width:0;">
                                    <div class="ms-list-title">{{ $srv['title'] }}</div>
                                    <div class="ms-list-sub">Podstrona: {{ $srv['page_path'] ?: '/' }} &bull; {{ $srv['highlights_count'] }} punktów oferty</div>
                                </div>
                            </div>
                            <span class="ms-list-badge">{{ $srv['highlights_count'] }}</span>
                        </a>
                    @endforeach
                @endif
            </div>
        </div>
    </div>
</x-filament-panels::page>
