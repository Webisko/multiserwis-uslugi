<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\FaqItem;
use Illuminate\Http\JsonResponse;

class FaqController extends Controller
{
    public function __invoke(): JsonResponse
    {
        FaqItem::ensureDefaultsExist();

        $items = FaqItem::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $categories = $items
            ->pluck('category')
            ->unique()
            ->values()
            ->all();

        $featuredGroups = $items
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

        return response()->json([
            'data' => [
                'items' => $items->map(fn (FaqItem $item) => $item->toFrontendPayload())->values(),
                'categories' => $categories,
                'featuredGroups' => $featuredGroups,
            ],
        ]);
    }
}
