<?php

namespace App\Http\Controllers\Api\V1;

use App\Filament\Resources\Leads\LeadResource;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Controllers\Controller;
use App\Mail\LeadReceivedMail;
use App\Models\Lead;
use App\Models\SiteSetting;
use App\Models\User;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Throwable;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $isSpam = filled($validated['website'] ?? null);

        $lead = Lead::create([
            'public_id' => 'lead_'.Str::lower((string) Str::ulid()),
            'full_name' => $validated['fullName'],
            'company' => $validated['company'] ?: null,
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'service' => $validated['service'],
            'message' => $validated['message'],
            'consent' => (bool) $validated['consent'],
            'source_page' => $validated['source']['page'],
            'source_context' => $validated['source']['context'],
            'source_site' => $validated['source']['site'] ?: null,
            'source_url' => $validated['source']['url'] ?: null,
            'referrer' => $validated['source']['referrer'] ?: null,
            'locale' => ($validated['meta']['locale'] ?? '') ?: null,
            'user_agent' => ($validated['meta']['userAgent'] ?? '') ?: $request->userAgent(),
            'ip_address' => $request->ip(),
            'status' => $isSpam ? 'spam' : 'new',
            'is_spam' => $isSpam,
            'spam_reason' => $isSpam ? 'honeypot' : null,
            'notes' => null,
        ]);

        if (! $isSpam) {
            try {
                $recipient = static::resolveLeadRecipient((string) $lead->service);
                $officeRecipient = (string) config('mail.department_addresses.biuro', 'biuro@multiserwis.tech');

                if (filled($recipient)) {
                    $mailable = Mail::to($recipient);

                    if (
                        config('mail.department_addresses.always_cc_office', false)
                        && filled($officeRecipient)
                        && $recipient !== $officeRecipient
                    ) {
                        $mailable->cc($officeRecipient);
                    }

                    $mailable->send(new LeadReceivedMail($lead));
                }
            } catch (Throwable $exception) {
                report($exception);
            }

            try {
                if (Schema::hasTable('notifications') && Schema::hasTable('users')) {
                    $notifiableUsers = User::query()
                        ->when(Schema::hasColumn('users', 'is_active'), fn ($q) => $q->where('is_active', true))
                        ->when(Schema::hasColumn('users', 'receives_lead_notifications'), fn ($q) => $q->where('receives_lead_notifications', true))
                        ->get();

                    if ($notifiableUsers->isNotEmpty()) {
                        Notification::make()
                            ->title('Nowe zapytanie: '.$lead->full_name)
                            ->body($lead->service.' • tel. '.$lead->phone)
                            ->warning()
                            ->actions([
                                Action::make('view')
                                    ->label('Otwórz zapytanie')
                                    ->url(LeadResource::getUrl('edit', ['record' => $lead])),
                            ])
                            ->sendToDatabase($notifiableUsers);
                    }
                }
            } catch (Throwable $exception) {
                report($exception);
            }
        }

        $responseStatus = $isSpam ? 202 : 201;

        return response()->json([
            'data' => [
                'id' => $lead->public_id,
                'status' => $lead->status,
                'createdAt' => $lead->created_at?->toISOString(),
            ],
            'message' => 'Zapytanie zostało zapisane. Skontaktujemy się możliwie szybko.',
        ], $responseStatus);
    }

    public static function resolveLeadRecipient(string $service): string
    {
        $normalized = mb_strtolower(trim($service));

        if (str_contains($normalized, 'wynajem')) {
            return (string) config('mail.department_addresses.wynajem', 'wynajem@multiserwis.tech');
        }

        if (str_contains($normalized, 'elektrycz') || str_contains($normalized, 'automatyk')) {
            return (string) config('mail.department_addresses.automatyka', 'automatyka@multiserwis.tech');
        }

        if (str_contains($normalized, 'szkolen')) {
            return (string) config('mail.department_addresses.szkolenia', 'szkolenia@multiserwis.tech');
        }

        // Technologia (Łukasz) - konstrukcje stalowe, spawalnictwo, zlecenia ślusarskie/technologiczne
        if (
            str_contains($normalized, 'spawal')
            || str_contains($normalized, 'konstrukc')
            || str_contains($normalized, 'technolog')
        ) {
            return (string) config('mail.department_addresses.technologia', 'technologia@multiserwis.tech');
        }

        // Biuro - relokacja maszyn, montaż, udt, zapytania ogólne
        $fallback = (string) (config('app.lead_notification_email')
            ?: SiteSetting::query()->value('contact_email')
            ?: config('mail.department_addresses.biuro', 'biuro@multiserwis.tech')
            ?: config('mail.from.address'));

        return filled($fallback) ? $fallback : 'biuro@multiserwis.tech';
    }
}
