<?php

namespace App\Models;

use App\Services\FrontendRebuildDispatcher;
use App\Services\StaticPreviewSnapshotExporter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class PortfolioItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category',
        'location',
        'short_description',
        'highlights',
        'image_url',
        'sort_order',
        'is_featured',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'highlights' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function ensureDefaultsExist(): void
    {
        if (! Schema::hasTable('portfolio_items') || static::query()->exists()) {
            return;
        }

        app(StaticPreviewSnapshotExporter::class)->runWithoutExporting(function (): void {
            app(FrontendRebuildDispatcher::class)->runWithoutDispatching(function (): void {
                foreach (static::defaults() as $record) {
                    static::query()->create($record);
                }
            });
        });
    }

    public static function defaults(): array
    {
        return [
            [
                'slug' => 'wynajem-zurawi-i-podestow-przemyslowych',
                'title' => 'Wynajem maszyn i sprzętu dźwigowego',
                'category' => 'Wynajem maszyn',
                'location' => 'Kutno i centralna Polska',
                'short_description' => 'Obsługa dźwigowa i podnośnikowa prac montażowych oraz serwisowych na czynnych zakładach przemysłowych.',
                'highlights' => [
                    'Projekty wsparcia prac na wysokości i transportu ciężkiego',
                    'Wynajem żurawi samochodowych (35t–90t) i podestów z operatorem',
                    'Podesty nożycowe i przegubowe do prac instalacyjnych na halach',
                ],
                'image_url' => null,
                'sort_order' => 10,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'slug' => 'relokacja-linii-i-maszyn-produkcyjnych',
                'title' => 'Relokacje maszyn i linii produkcyjnych',
                'category' => 'Relokacja maszyn',
                'location' => 'Zakłady produkcyjne (Polska)',
                'short_description' => 'Kompleksowe przeniesienie parku maszynowego z zachowaniem ciągłości technologicznej zakładu.',
                'highlights' => [
                    'Demontaż, transport specjalistyczny i ponowny montaż urządzeń',
                    'Wprowadzanie gabarytów na halę z użyciem sprzętu VersaLift i rolek',
                    'Poziomowanie, podłączenie mediów i uruchomienia po relokacji',
                ],
                'image_url' => null,
                'sort_order' => 20,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'slug' => 'konserwacja-i-odbiory-udt',
                'title' => 'Obsługa UDT i przeglądy konserwacyjne',
                'category' => 'UDT i serwis',
                'location' => 'Woj. łódzkie i mazowieckie',
                'short_description' => 'Stały nadzór konserwatorski nad flotą wózków, podestów ruchomych i suwnic wraz z udziałem w badaniach UDT.',
                'highlights' => [
                    'Kompleksowa obsługa formalna rejestracji urządzeń w UDT',
                    'Okresowe przeglądy konserwacyjne i wpisy do dzienników konserwacji',
                    'Przygotowanie techniczne maszyn i asysta podczas odbiorów inspektorskich',
                ],
                'image_url' => null,
                'sort_order' => 30,
                'is_featured' => true,
                'is_active' => true,
            ],
            [
                'slug' => 'spawalnictwo-i-konstrukcje-stalowe',
                'title' => 'Spawalnictwo i konstrukcje przemysłowe',
                'category' => 'Spawalnictwo i montaż',
                'location' => 'Obiekty przemysłowe i logistyczne',
                'short_description' => 'Prefabrykacja oraz montaż konstrukcji stalowych, podestów obsługowych i rurociągów technologicznych.',
                'highlights' => [
                    'Naprawy bieżące i modernizacje elementów stalowych na zakładach',
                    'Wykonawstwo konstrukcji wsporczych, antresol i barier ochronnych',
                    'Spawanie rurociągów i zbiorników metodami TIG oraz MIG/MAG',
                ],
                'image_url' => null,
                'sort_order' => 40,
                'is_featured' => true,
                'is_active' => true,
            ],
        ];
    }

    public function resolveImageUrl(): ?string
    {
        if (! filled($this->image_url)) {
            return null;
        }

        if (str_starts_with($this->image_url, 'http://') || str_starts_with($this->image_url, 'https://') || str_starts_with($this->image_url, '/')) {
            return $this->image_url;
        }

        return url(Storage::disk('public')->url($this->image_url));
    }

    public function toFrontendPayload(): array
    {
        return [
            'id' => (string) $this->getKey(),
            'slug' => $this->slug,
            'title' => $this->title,
            'category' => $this->category,
            'location' => $this->location,
            'description' => $this->short_description,
            'items' => $this->highlights ?? [],
            'imageUrl' => $this->resolveImageUrl(),
            'isFeatured' => (bool) $this->is_featured,
            'sortOrder' => (int) $this->sort_order,
        ];
    }
}
