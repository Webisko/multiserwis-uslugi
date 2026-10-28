<?php

namespace Tests\Feature\Feature;

use App\Mail\LeadReceivedMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class LeadSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_a_valid_lead(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/v1/leads', [
            'fullName' => 'Jan Kowalski',
            'company' => 'ABC Industrial Sp. z o.o.',
            'phone' => '+48 730 202 000',
            'email' => 'jan.kowalski@example.com',
            'service' => 'Relokacja Maszyn',
            'message' => 'Potrzebujemy relokacji dwóch linii produkcyjnych w czerwcu w okolicach Kutna.',
            'consent' => true,
            'website' => '',
            'source' => [
                'page' => '/kontakt',
                'context' => 'contact-page',
                'site' => 'multiserwis-uslugi',
                'url' => 'https://example.test/kontakt',
                'referrer' => 'https://google.com/',
            ],
            'meta' => [
                'locale' => 'pl-PL',
                'userAgent' => 'PHPUnit',
                'submittedAt' => '2026-05-06T13:00:00.000Z',
            ],
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.status', 'new');

        $this->assertDatabaseHas('leads', [
            'email' => 'jan.kowalski@example.com',
            'status' => 'new',
            'is_spam' => false,
        ]);

        Mail::assertSent(LeadReceivedMail::class, function (LeadReceivedMail $mail): bool {
            return $mail->hasTo('biuro@multiserwis.tech');
        });
    }

    public function test_it_routes_welding_and_structure_lead_to_lukasz_technology_department(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/leads', [
            'fullName' => 'Tomasz Kamiński',
            'phone' => '+48 730 202 000',
            'email' => 'tomasz@example.com',
            'service' => 'Usługi Spawalnicze',
            'message' => 'Spawanie konstrukcji stalowej podesty i ramy techniczne wg projektu.',
            'consent' => true,
            'source' => [
                'page' => '/spawanie',
                'context' => 'welding-page',
            ],
        ])->assertCreated();

        Mail::assertSent(LeadReceivedMail::class, function (LeadReceivedMail $mail): bool {
            return $mail->hasTo('technologia@multiserwis.tech');
        });
    }

    public function test_it_routes_rental_lead_to_rentals_department(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/leads', [
            'fullName' => 'Anna Nowak',
            'phone' => '+48 730 202 000',
            'email' => 'anna.nowak@example.com',
            'service' => 'Wynajem Maszyn',
            'message' => 'Wynajem podestu nożycowego 14m na 2 tygodnie w Kutnie.',
            'consent' => true,
            'source' => [
                'page' => '/wynajem',
                'context' => 'rental-page',
            ],
        ])->assertCreated();

        Mail::assertSent(LeadReceivedMail::class, function (LeadReceivedMail $mail): bool {
            return $mail->hasTo('wynajem@multiserwis.tech');
        });
    }

    public function test_it_routes_electrical_lead_to_automation_department(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/leads', [
            'fullName' => 'Marek Wiśniewski',
            'phone' => '+48 730 202 000',
            'email' => 'marek@example.com',
            'service' => 'Usługi Elektryczne',
            'message' => 'Modernizacja szafy sterowniczej oraz pomiary okresowe instalacji.',
            'consent' => true,
            'source' => [
                'page' => '/uslugi-elektryczne',
                'context' => 'services-page',
            ],
        ])->assertCreated();

        Mail::assertSent(LeadReceivedMail::class, function (LeadReceivedMail $mail): bool {
            return $mail->hasTo('automatyka@multiserwis.tech');
        });
    }

    public function test_it_routes_training_lead_to_training_department(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/leads', [
            'fullName' => 'Piotr Zieliński',
            'phone' => '+48 730 202 000',
            'email' => 'piotr@example.com',
            'service' => 'Szkolenia',
            'message' => 'Zapytanie o szkolenie operatorów wózków jezdniowych UDT dla 5 osób.',
            'consent' => true,
            'source' => [
                'page' => '/szkolenia',
                'context' => 'training-page',
            ],
        ])->assertCreated();

        Mail::assertSent(LeadReceivedMail::class, function (LeadReceivedMail $mail): bool {
            return $mail->hasTo('szkolenia@multiserwis.tech');
        });
    }

    public function test_it_routes_other_leads_to_office(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/leads', [
            'fullName' => 'Katarzyna Wójcik',
            'phone' => '+48 730 202 000',
            'email' => 'katarzyna@example.com',
            'service' => 'Inne',
            'message' => 'Ogólne zapytanie o warunki stałej współpracy ramowej.',
            'consent' => true,
            'source' => [
                'page' => '/kontakt',
                'context' => 'contact-page',
            ],
        ])->assertCreated();

        Mail::assertSent(LeadReceivedMail::class, function (LeadReceivedMail $mail): bool {
            return $mail->hasTo('biuro@multiserwis.tech');
        });
    }

    public function test_it_marks_honeypot_submissions_as_spam_without_exposing_it_in_the_message(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/v1/leads', [
            'fullName' => 'Jan Kowalski',
            'company' => 'ABC Industrial Sp. z o.o.',
            'phone' => '+48 730 202 000',
            'email' => 'jan.kowalski@example.com',
            'service' => 'Relokacja Maszyn',
            'message' => 'Potrzebujemy relokacji dwóch linii produkcyjnych w czerwcu w okolicach Kutna.',
            'consent' => true,
            'website' => 'https://spam.example',
            'source' => [
                'page' => '/kontakt',
                'context' => 'contact-page',
            ],
        ]);

        $response->assertStatus(202)
            ->assertJsonPath('data.status', 'spam')
            ->assertJsonPath('message', 'Zapytanie zostało zapisane. Skontaktujemy się możliwie szybko.');

        $this->assertDatabaseHas('leads', [
            'email' => 'jan.kowalski@example.com',
            'status' => 'spam',
            'is_spam' => true,
            'spam_reason' => 'honeypot',
        ]);

        Mail::assertNothingSent();
    }
}
