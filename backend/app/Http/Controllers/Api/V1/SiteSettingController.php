<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;

class SiteSettingController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'data' => SiteSetting::current()->toFrontendPayload(),
        ]);
    }
}
