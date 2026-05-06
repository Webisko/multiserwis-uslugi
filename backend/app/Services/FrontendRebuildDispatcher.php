<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class FrontendRebuildDispatcher
{
    protected int $suppressionDepth = 0;

    public function dispatch(string $reason, array $context = []): bool
    {
        if (! $this->shouldDispatch()) {
            return false;
        }

        $repository = trim((string) config('frontend_rebuild.github.repository'));
        $token = trim((string) config('frontend_rebuild.github.token'));
        $eventType = trim((string) config('frontend_rebuild.github.event_type'));

        if ($repository === '' || $token === '' || $eventType === '') {
            return false;
        }

        try {
            $response = Http::baseUrl('https://api.github.com')
                ->acceptJson()
                ->withToken($token)
                ->withHeaders([
                    'User-Agent' => config('app.name', 'Multiserwis Leads API'),
                    'X-GitHub-Api-Version' => '2022-11-28',
                ])
                ->timeout((int) config('frontend_rebuild.timeout', 10))
                ->post(sprintf('/repos/%s/dispatches', $repository), [
                    'event_type' => $eventType,
                    'client_payload' => [
                        'reason' => $reason,
                        'environment' => config('app.env'),
                        'triggered_at' => now()->toIso8601String(),
                        ...$context,
                    ],
                ]);

            if ($response->successful()) {
                return true;
            }

            Log::warning('Frontend rebuild dispatch returned a non-success response.', [
                'status' => $response->status(),
                'body' => $response->body(),
                'reason' => $reason,
                'context' => $context,
            ]);

            return false;
        } catch (Throwable $exception) {
            Log::warning('Frontend rebuild dispatch failed.', [
                'reason' => $reason,
                'context' => $context,
                'exception' => $exception->getMessage(),
            ]);

            return false;
        }
    }

    public function runWithoutDispatching(callable $callback): mixed
    {
        $this->suppressionDepth++;

        try {
            return $callback();
        } finally {
            $this->suppressionDepth = max(0, $this->suppressionDepth - 1);
        }
    }

    protected function shouldDispatch(): bool
    {
        return (bool) config('frontend_rebuild.enabled')
            && (bool) config('frontend_rebuild.auto_dispatch')
            && $this->suppressionDepth === 0;
    }
}
