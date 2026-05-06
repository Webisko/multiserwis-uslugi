<?php

namespace App\Services;

use App\Models\FaqItem;
use App\Models\ServiceOffering;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Log;
use Throwable;

class StaticPreviewSnapshotExporter
{
    protected int $suppressionDepth = 0;

    public function export(bool $force = false): bool
    {
        if (! $force && ! $this->shouldExport()) {
            return false;
        }

        return $this->runWithoutExporting(function (): bool {
            try {
                $this->writeJson(
                    (string) config('preview_snapshot.paths.site_settings'),
                    $this->buildSiteSettingsPayload(),
                );

                $this->writeJson(
                    (string) config('preview_snapshot.paths.site_content'),
                    $this->buildSiteContentPayload(),
                );

                return true;
            } catch (Throwable $exception) {
                Log::warning('Static preview snapshot export failed.', [
                    'exception' => $exception->getMessage(),
                ]);

                return false;
            }
        });
    }

    public function runWithoutExporting(callable $callback): mixed
    {
        $this->suppressionDepth++;

        try {
            return $callback();
        } finally {
            $this->suppressionDepth = max(0, $this->suppressionDepth - 1);
        }
    }

    protected function shouldExport(): bool
    {
        return (bool) config('preview_snapshot.enabled') && $this->suppressionDepth === 0;
    }

    protected function buildSiteSettingsPayload(): array
    {
        return SiteSetting::current()->toFrontendPayload();
    }

    protected function buildSiteContentPayload(): array
    {
        FaqItem::ensureDefaultsExist();
        ServiceOffering::ensureDefaultsExist();

        $faqItems = FaqItem::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $serviceItems = ServiceOffering::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $faqPayload = $faqItems
            ->map(fn (FaqItem $item): array => $item->toFrontendPayload())
            ->values()
            ->all();

        $categories = [
            'Wszystkie',
            ...$faqItems->pluck('category')->unique()->values()->all(),
        ];

        $featuredGroups = $faqItems
            ->where('is_featured', true)
            ->groupBy('category')
            ->map(fn ($group, $category): array => [
                'category' => $category,
                'questions' => $group
                    ->map(fn (FaqItem $item): array => [
                        'id' => (string) $item->getKey(),
                        'q' => $item->question,
                        'a' => $item->answer,
                    ])
                    ->values()
                    ->all(),
            ])
            ->values()
            ->all();

        $servicePayload = $serviceItems
            ->map(fn (ServiceOffering $item): array => $item->toFrontendPayload())
            ->values()
            ->all();

        $contactOptions = [
            ...$serviceItems->pluck('contact_label')->values()->all(),
            'Szkolenia',
            'Inne',
        ];

        return [
            'faqs' => [
                'items' => $faqPayload,
                'categories' => array_values(array_unique($categories)),
                'featuredGroups' => $featuredGroups,
            ],
            'services' => [
                'items' => $servicePayload,
                'contactOptions' => array_values(array_unique($contactOptions)),
            ],
        ];
    }

    protected function writeJson(string $path, array $payload): void
    {
        $directory = dirname($path);

        if (! is_dir($directory)) {
            mkdir($directory, 0777, true);
        }

        $encoded = json_encode(
            $payload,
            JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE,
        );

        if ($encoded === false) {
            throw new \RuntimeException(sprintf('Failed to encode preview snapshot for path: %s', $path));
        }

        file_put_contents($path, $encoded . PHP_EOL);
    }
}