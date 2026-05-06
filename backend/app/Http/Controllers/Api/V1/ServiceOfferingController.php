<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\ServiceOffering;
use Illuminate\Http\JsonResponse;

class ServiceOfferingController extends Controller
{
    public function __invoke(): JsonResponse
    {
        ServiceOffering::ensureDefaultsExist();

        $items = ServiceOffering::query()
            ->active()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json([
            'data' => [
                'items' => $items->map(fn (ServiceOffering $item) => $item->toFrontendPayload())->values(),
                'contactOptions' => $items->pluck('contact_label')->push('Szkolenia')->push('Inne')->unique()->values(),
            ],
        ]);
    }
}
