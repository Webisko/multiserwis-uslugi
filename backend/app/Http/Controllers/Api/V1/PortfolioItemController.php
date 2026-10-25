<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\JsonResponse;

class PortfolioItemController extends Controller
{
    public function __invoke(): JsonResponse
    {
        PortfolioItem::ensureDefaultsExist();

        $items = PortfolioItem::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json([
            'data' => [
                'items' => $items
                    ->map(fn (PortfolioItem $item): array => $item->toFrontendPayload())
                    ->values()
                    ->all(),
            ],
        ]);
    }
}
