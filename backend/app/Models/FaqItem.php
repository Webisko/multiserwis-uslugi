<?php

namespace App\Models;

use App\Services\FrontendRebuildDispatcher;
use App\Services\StaticPreviewSnapshotExporter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FaqItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'answer',
        'category',
        'sort_order',
        'is_active',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
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
                'question' => 'Na jakim obszarze działacie?',
                'answer' => 'Realizujemy zlecenia na terenie całej Polski, a w przypadku relokacji maszyn i dużych projektów elektroinstalacyjnych również za granicą.',
                'category' => 'Ogólne',
                'sort_order' => 10,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'question' => 'Czy obsługujecie klientów indywidualnych?',
                'answer' => 'Tak, obsługujemy zarówno duże zakłady przemysłowe, jak i mniejsze firmy oraz klientów indywidualnych.',
                'category' => 'Ogólne',
                'sort_order' => 20,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'question' => 'Czy sprzęt można wynająć z operatorem?',
                'answer' => 'Tak, podnośniki koszowe, żurawie i ładowarki teleskopowe wynajmujemy z doświadczonym operatorem. Wózki widłowe również na życzenie klienta.',
                'category' => 'Wynajem',
                'sort_order' => 30,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'question' => 'Czy transport sprzętu jest w cenie?',
                'answer' => 'Koszt transportu ustalany jest indywidualnie w zależności od odległości i gabarytów maszyny.',
                'category' => 'Wynajem',
                'sort_order' => 40,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'question' => 'Czy pomożecie w rejestracji urządzenia w UDT bez dokumentacji?',
                'answer' => 'Tak. Oferujemy odtworzenie dokumentacji i pełną obsługę formalną, aż do uzyskania decyzji zezwalającej na eksploatację.',
                'category' => 'UDT',
                'sort_order' => 50,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'question' => 'Jak często trzeba robić przeglądy UDT?',
                'answer' => 'Zależy to od typu urządzenia. Zazwyczaj konserwacja odbywa się cyklicznie, a badania okresowe raz w roku.',
                'category' => 'UDT',
                'sort_order' => 60,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'question' => 'Czy wykonujecie prace na czynnych obiektach?',
                'answer' => 'Tak, specjalizujemy się w pracach na ruchu. Możemy pracować zmianowo, aby ograniczyć wpływ na produkcję.',
                'category' => 'Elektryka i Spawanie',
                'sort_order' => 70,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'question' => 'Czy spawacie u klienta?',
                'answer' => 'Tak, posiadamy mobilny sprzęt spawalniczy i wykonujemy prace bezpośrednio na terenie zakładu klienta.',
                'category' => 'Elektryka i Spawanie',
                'sort_order' => 80,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'question' => 'Czy realizujecie relokacje tylko wewnątrz zakładu?',
                'answer' => 'Nie. Obsługujemy zarówno przemieszczenia wewnątrzzakładowe, jak i relokacje do nowych lokalizacji, wraz z demontażem, transportem i rozruchem.',
                'category' => 'Relokacja',
                'sort_order' => 90,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'question' => 'Czy wykonujecie prace budowlane przy modernizacji hali lub pod nowe maszyny?',
                'answer' => 'Tak, obsługujemy zakresy budowlane związane z przygotowaniem przestrzeni pod urządzenia, pracami odtworzeniowymi i modernizacyjnymi.',
                'category' => 'Budownictwo',
                'sort_order' => 100,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'question' => 'Jak szybko odpowiadacie na zapytania?',
                'answer' => 'Odpowiadamy na zapytania w ciągu 24 godzin w dni robocze. W pilnych sprawach prosimy o kontakt telefoniczny.',
                'category' => 'Kontakt',
                'sort_order' => 110,
                'is_active' => true,
                'is_featured' => false,
            ],
        ];
    }

    public function toFrontendPayload(): array
    {
        return [
            'id' => (string) $this->getKey(),
            'question' => $this->question,
            'answer' => $this->answer,
            'category' => $this->category,
            'sortOrder' => $this->sort_order,
            'isFeatured' => $this->is_featured,
        ];
    }
}
