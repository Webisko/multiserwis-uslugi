<?php

namespace App\Models;

use App\Services\FrontendRebuildDispatcher;
use App\Services\StaticPreviewSnapshotExporter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceOffering extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'short_description',
        'highlights',
        'page_path',
        'contact_label',
        'training_text',
        'training_link_label',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'highlights' => 'array',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public static function ensureDefaultsExist(): void
    {
        if (static::query()->exists()) {
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
                'slug' => 'relokacja',
                'title' => 'Relokacja Maszyn',
                'short_description' => 'Kompleksowe przenoszenie linii produkcyjnych.',
                'highlights' => [
                    'Demontaż maszyn i urządzeń',
                    'Załadunek i transport specjalistyczny',
                    'Relokacje na terenie zakładu i zewnętrzne',
                    'Ponowny montaż i poziomowanie',
                    'Rozruch technologiczny po relokacji',
                ],
                'page_path' => '/relokacja',
                'contact_label' => 'Relokacja Maszyn',
                'training_text' => null,
                'training_link_label' => null,
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 10,
            ],
            [
                'slug' => 'wynajem',
                'title' => 'Wynajem Maszyn',
                'short_description' => 'Profesjonalny sprzęt z możliwością wynajmu z operatorem.',
                'highlights' => [
                    'Podesty: nożycowe (do 18m), przegubowe, teleskopowe',
                    'Żurawie samochodowe (35t, 45t, 60t, 90t)',
                    'Ładowarki teleskopowe i wózki widłowe',
                    'Specjalistyczny sprzęt (np. VersaLift)',
                    'Podnośniki koszowe na pojazdach',
                ],
                'page_path' => '/wynajem',
                'contact_label' => 'Wynajem Maszyn',
                'training_text' => 'Potrzebujesz uprawnień UDT na wózki lub żurawie?',
                'training_link_label' => 'Oferta szkoleń UDT',
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 20,
            ],
            [
                'slug' => 'spawanie',
                'title' => 'Usługi Spawalnicze',
                'short_description' => 'Naprawy bieżące i konstrukcje stalowe.',
                'highlights' => [
                    'Naprawy: maszyn, zbiorników, rurociągów',
                    'Konstrukcje: hale, antresole, podesty',
                    'Spawanie wszystkich gatunków stali',
                    'Wszystkie metody (MIG/MAG, TIG, Elektryczne)',
                    'Doradztwo przy nietypowych zleceniach',
                ],
                'page_path' => '/spawanie',
                'contact_label' => 'Usługi Spawalnicze',
                'training_text' => 'Szkolimy spawaczy (MIG/MAG, TIG).',
                'training_link_label' => 'Kursy spawalnicze',
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 30,
            ],
            [
                'slug' => 'budownictwo',
                'title' => 'Remonty Budowlane',
                'short_description' => 'Usługi remontowo-budowlane dla przemysłu.',
                'highlights' => [
                    'Adaptacje hal przemysłowych',
                    'Fundamenty pod maszyny',
                    'Prace wykończeniowe i modernizacyjne',
                    'Naprawy posadzek przemysłowych',
                    'Infrastruktura techniczna',
                ],
                'page_path' => '/budownictwo',
                'contact_label' => 'Remonty Budowlane',
                'training_text' => 'Szkolenia IMBIGS na maszyny budowlane.',
                'training_link_label' => 'Szkolenia IMBIGS',
                'is_active' => true,
                'is_featured' => true,
                'sort_order' => 40,
            ],
            [
                'slug' => 'udt',
                'title' => 'Konserwacja i UDT',
                'short_description' => 'Konserwacja, formalności i przygotowanie urządzeń do badań.',
                'highlights' => [
                    'Rejestracja urządzeń w UDT',
                    'Obsługa formalności i dokumentacji',
                    'Konserwacja UTB',
                    'Przygotowanie do badań i odbiorów',
                    'Doradztwo techniczne',
                ],
                'page_path' => '/udt',
                'contact_label' => 'Konserwacja i UDT',
                'training_text' => null,
                'training_link_label' => null,
                'is_active' => true,
                'is_featured' => false,
                'sort_order' => 50,
            ],
            [
                'slug' => 'elektryka',
                'title' => 'Usługi Elektryczne',
                'short_description' => 'Uruchomienia, pomiary i wykonawstwo instalacji elektrycznych.',
                'highlights' => [
                    'Pomiary transformatorów, silników i kabli',
                    'Testy rozdzielnic nn oraz SN',
                    'Instalacje kablowe i trasy kablowe',
                    'Oświetlenie i instalacje słaboprądowe',
                    'Wsparcie rozruchowe na obiektach przemysłowych',
                ],
                'page_path' => '/elektryka',
                'contact_label' => 'Usługi Elektryczne',
                'training_text' => null,
                'training_link_label' => null,
                'is_active' => true,
                'is_featured' => false,
                'sort_order' => 60,
            ],
        ];
    }

    public function toFrontendPayload(): array
    {
        return [
            'id' => (string) $this->getKey(),
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->short_description,
            'items' => $this->highlights ?? [],
            'pagePath' => $this->page_path,
            'contactLabel' => $this->contact_label,
            'training' => $this->training_text && $this->training_link_label
                ? [
                    'text' => $this->training_text,
                    'linkText' => $this->training_link_label,
                ]
                : null,
            'isFeatured' => $this->is_featured,
            'sortOrder' => $this->sort_order,
        ];
    }
}
