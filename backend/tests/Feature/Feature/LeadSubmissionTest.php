<?php

namespace Tests\Feature\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeadSubmissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_stores_a_valid_lead(): void
    {
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
    }

    public function test_it_marks_honeypot_submissions_as_spam_without_exposing_it_in_the_message(): void
    {
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
    }
}
