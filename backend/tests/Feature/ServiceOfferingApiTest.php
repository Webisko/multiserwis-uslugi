<?php

namespace Tests\Feature;

use App\Models\ServiceOffering;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ServiceOfferingApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_default_service_offerings_when_database_is_empty(): void
    {
        $response = $this->getJson('/api/v1/service-offerings');

        $response->assertOk()
            ->assertJsonPath('data.items.0.slug', 'relokacja')
            ->assertJsonFragment(['Wynajem Maszyn']);

        $this->assertDatabaseCount('service_offerings', count(ServiceOffering::defaults()));
    }

    public function test_it_returns_saved_service_offerings(): void
    {
        ServiceOffering::query()->create([
            'slug' => 'testowa-usluga',
            'title' => 'Testowa Usługa',
            'short_description' => 'Krótki opis testowej usługi.',
            'highlights' => ['Punkt 1', 'Punkt 2'],
            'page_path' => '/testowa-usluga',
            'contact_label' => 'Testowa Usługa',
            'training_text' => null,
            'training_link_label' => null,
            'sort_order' => 1,
            'is_active' => true,
            'is_featured' => true,
        ]);

        $response = $this->getJson('/api/v1/service-offerings');

        $response->assertOk()
            ->assertJsonPath('data.items.0.title', 'Testowa Usługa')
            ->assertJsonFragment(['Testowa Usługa']);
    }
}
