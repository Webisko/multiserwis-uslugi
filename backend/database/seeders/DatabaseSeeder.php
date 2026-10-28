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
        $team = [
            [
                'email' => 'admin@webisko.pl',
                'name' => 'Administrator Multiserwis',
                'job_title' => 'Główny Administrator',
                'phone' => '730 101 000',
                'role' => 'admin',
                'password' => 'MS-Webisko2026!#',
            ],
            [
                'email' => 'kamil.kapruziak@multiserwis.tech',
                'name' => 'Kamil Kapruziak',
                'job_title' => 'Właściciel / Nadzór techniczny',
                'phone' => '730 101 000',
                'role' => 'manager',
                'password' => 'xy58GLdvgzxbMqYT5QQP',
            ],
            [
                'email' => 'justyna.kapruziak@multiserwis.tech',
                'name' => 'Justyna Kapruziak',
                'job_title' => 'Współwłaściciel / Administracja',
                'phone' => '733 929 100',
                'role' => 'manager',
                'password' => 'Cv2wetZQ9pXfwAwM9jBU',
            ],
            [
                'email' => 'izabela@multiserwis.tech',
                'name' => 'Izabela',
                'job_title' => 'Obsługa Klienta / Biuro',
                'phone' => '730 101 000',
                'role' => 'staff',
                'password' => 'KRpjPZPaAQKERcDADCmg',
            ],
            [
                'email' => 'joanna@multiserwis.tech',
                'name' => 'Joanna',
                'job_title' => 'Obsługa Klienta / Biuro',
                'phone' => '730 101 000',
                'role' => 'staff',
                'password' => 'pr4xyZyKumHRRGVezxgd',
            ],
            [
                'email' => 'technologia@multiserwis.tech',
                'name' => 'Łukasz',
                'job_title' => 'Dział Technologii – Konstrukcje i Spawalnictwo',
                'phone' => '730 101 000',
                'role' => 'staff',
                'password' => 'GHtf3xTMMm2au8PVEwbz',
            ],
        ];

        foreach ($team as $member) {
            User::updateOrCreate(
                ['email' => $member['email']],
                [
                    'name' => $member['name'],
                    'job_title' => $member['job_title'],
                    'phone' => $member['phone'],
                    'role' => $member['role'],
                    'is_active' => true,
                    'receives_lead_notifications' => true,
                    'password' => bcrypt($member['password']),
                    'email_verified_at' => now(),
                ]
            );
        }

        $settings = SiteSetting::current();
        $settings->update([
            'street' => 'ul. Przemysłowa 2',
            'contact_email' => 'biuro@multiserwis.tech',
            'training_site_url' => 'https://multiserwis.edu.pl',
            'training_phone_value' => '',
            'training_phone_href' => '',
        ]);
    }
}
