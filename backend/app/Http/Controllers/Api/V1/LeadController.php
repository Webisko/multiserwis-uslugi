<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\StoreLeadRequest;
use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

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
