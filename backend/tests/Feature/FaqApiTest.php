<?php

namespace Tests\Feature;

use App\Models\FaqItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FaqApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_default_faq_items_when_database_is_empty(): void
    {
        $response = $this->getJson('/api/v1/faqs');

        $response->assertOk()
            ->assertJsonPath('data.items.0.category', 'Ogólne')
            ->assertJsonPath('data.featuredGroups.0.category', 'Ogólne');

        $this->assertDatabaseCount('faq_items', count(FaqItem::defaults()));
    }

    public function test_it_returns_saved_faq_items(): void
    {
        FaqItem::query()->create([
            'question' => 'Czy pracujecie w weekendy?',
            'answer' => 'Tak, dla projektów przemysłowych pracujemy także w weekendy.',
            'category' => 'Kontakt',
            'sort_order' => 5,
            'is_active' => true,
            'is_featured' => true,
        ]);

        $response = $this->getJson('/api/v1/faqs');

        $response->assertOk()
            ->assertJsonPath('data.items.0.question', 'Czy pracujecie w weekendy?')
            ->assertJsonFragment(['category' => 'Kontakt']);
    }
}
