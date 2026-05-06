<?php

namespace Tests\Feature;

use App\Models\SiteSetting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SiteSettingApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_default_settings_when_database_record_does_not_exist(): void
    {
        $response = $this->getJson('/api/v1/site-settings');

        $response->assertOk()
            ->assertJsonPath('data.company.name', 'Multiserwis Kutno')
            ->assertJsonPath('data.seo.siteName', 'Multiserwis Kutno');

        $this->assertDatabaseCount('site_settings', 1);
    }

    public function test_it_returns_saved_site_settings(): void
    {
        SiteSetting::query()->create(array_merge(SiteSetting::defaults(), [
            'site_name' => 'Multiserwis Industrial',
            'contact_email' => 'kontakt@multiserwis.test',
            'seo_default_title' => 'Nowy tytuł SEO',
        ]));

        $response = $this->getJson('/api/v1/site-settings');

        $response->assertOk()
            ->assertJsonPath('data.company.name', 'Multiserwis Industrial')
            ->assertJsonPath('data.company.email', 'kontakt@multiserwis.test')
            ->assertJsonPath('data.seo.defaultTitle', 'Nowy tytuł SEO');
    }
}
