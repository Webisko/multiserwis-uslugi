<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
            ],
            [
                'email' => 'kamil.kapruziak@multiserwis.tech',
                'name' => 'Kamil Kapruziak',
                'job_title' => 'Właściciel / Nadzór techniczny',
                'phone' => '730 101 000',
                'role' => 'manager',
            ],
            [
                'email' => 'justyna.kapruziak@multiserwis.tech',
                'name' => 'Justyna Kapruziak',
                'job_title' => 'Współwłaściciel / Administracja',
                'phone' => '733 929 100',
                'role' => 'manager',
            ],
            [
                'email' => 'izabela@multiserwis.tech',
                'name' => 'Izabela',
                'job_title' => 'Obsługa Klienta / Biuro',
                'phone' => '730 101 000',
                'role' => 'staff',
            ],
            [
                'email' => 'joanna@multiserwis.tech',
                'name' => 'Joanna',
                'job_title' => 'Obsługa Klienta / Biuro',
                'phone' => '730 101 000',
                'role' => 'staff',
            ],
            [
                'email' => 'technologia@multiserwis.tech',
                'name' => 'Łukasz',
                'job_title' => 'Dział Technologii – Konstrukcje i Spawalnictwo',
                'phone' => '730 101 000',
                'role' => 'staff',
            ],
        ];

        $initialPassword = config('app.admin_initial_password', env('ADMIN_INITIAL_PASSWORD'));

        foreach ($team as $member) {
            $user = User::firstOrNew(['email' => $member['email']]);
            $isNew = ! $user->exists;

            $user->name = $member['name'];
            $user->job_title = $member['job_title'];
            $user->phone = $member['phone'];
            $user->role = $member['role'];
            $user->is_active = true;
            $user->receives_lead_notifications = true;

            // Ustawiamy hasło wyłącznie przy tworzeniu nowego użytkownika,
            // zapobiegając nadpisaniu haseł zmienionych przez pracowników w CMS.
            if ($isNew) {
                $rawPassword = filled($initialPassword)
                    ? (string) $initialPassword
                    : Str::random(24);

                $user->password = bcrypt($rawPassword);
                $user->email_verified_at = now();
            }

            $user->save();
        }

        // Zapewniamy istnienie domyślnych ustawień bez nadpisywania wprowadzonych w CMS
        SiteSetting::current();
    }
}
