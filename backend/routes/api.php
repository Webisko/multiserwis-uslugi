<?php

use App\Http\Controllers\Api\V1\FaqController;
use App\Http\Controllers\Api\V1\LeadController;
use App\Http\Controllers\Api\V1\ServiceOfferingController;
use App\Http\Controllers\Api\V1\SiteSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::post('/leads', [LeadController::class, 'store']);
    Route::get('/site-settings', SiteSettingController::class);
    Route::get('/faqs', FaqController::class);
    Route::get('/service-offerings', ServiceOfferingController::class);
});
