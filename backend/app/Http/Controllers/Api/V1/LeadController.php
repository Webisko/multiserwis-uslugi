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
                $recipient = (string) (config('app.lead_notification_email')
                    ?: SiteSetting::query()->value('contact_email')
                    ?: config('mail.from.address'));

                if (filled($recipient)) {
                    Mail::to($recipient)->send(new LeadReceivedMail($lead));
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
}
