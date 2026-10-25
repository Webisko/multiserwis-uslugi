<?php

namespace Tests\Feature;

use App\Models\PortfolioItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioItemApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_default_portfolio_items_when_table_is_empty(): void
    {
        $response = $this->getJson('/api/v1/portfolio-items');

        $response->assertOk()
            ->assertJsonCount(4, 'data.items')
            ->assertJsonPath('data.items.0.slug', 'wynajem-zurawi-i-podestow-przemyslowych');

        $this->assertDatabaseCount('portfolio_items', 4);
    }

    public function test_it_returns_only_active_portfolio_items_sorted_by_sort_order(): void
    {
        PortfolioItem::query()->create([
            'slug' => 'druga-realizacja',
            'title' => 'Druga realizacja',
            'category' => 'Spawanie',
            'location' => 'Kutno',
            'short_description' => 'Opis drugiej realizacji',
            'highlights' => ['Punkt A'],
            'sort_order' => 20,
            'is_featured' => true,
            'is_active' => true,
        ]);

        PortfolioItem::query()->create([
            'slug' => 'pierwsza-realizacja',
            'title' => 'Pierwsza realizacja',
            'category' => 'Relokacja',
            'location' => 'Łódź',
            'short_description' => 'Opis pierwszej realizacji',
            'highlights' => ['Punkt 1', 'Punkt 2'],
            'sort_order' => 10,
            'is_featured' => true,
            'is_active' => true,
        ]);

        PortfolioItem::query()->create([
            'slug' => 'ukryta-realizacja',
            'title' => 'Ukryta realizacja',
            'category' => 'UDT',
            'highlights' => ['Ukryty punkt'],
            'sort_order' => 5,
            'is_featured' => false,
            'is_active' => false,
        ]);

        $response = $this->getJson('/api/v1/portfolio-items');

        $response->assertOk()
            ->assertJsonCount(2, 'data.items')
            ->assertJsonPath('data.items.0.slug', 'pierwsza-realizacja')
            ->assertJsonPath('data.items.1.slug', 'druga-realizacja');
    }
}
