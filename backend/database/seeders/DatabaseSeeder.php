<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@webisko.pl'],
            [
                'name' => 'Administrator Multiserwis',
                'job_title' => 'Główny Administrator',
                'phone' => '730 101 000',
                'role' => 'admin',
                'is_active' => true,
                'receives_lead_notifications' => true,
                'password' => bcrypt('MS-Webisko2026!#'),
                'email_verified_at' => now(),
            ]
        );

        $settings = SiteSetting::current();
        $settings->update([
            'street' => 'ul. Przemysłowa 2',
            'training_site_url' => 'https://multiserwis.edu.pl',
            'training_phone_value' => '',
            'training_phone_href' => '',
        ]);
    }
}
