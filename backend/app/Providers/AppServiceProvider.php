<?php

namespace App\Providers;

use App\Models\FaqItem;
use App\Models\ServiceOffering;
use App\Models\SiteSetting;
use App\Observers\ContentSyncObserver;
use App\Services\FrontendRebuildDispatcher;
use App\Services\StaticPreviewSnapshotExporter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(FrontendRebuildDispatcher::class);
        $this->app->singleton(StaticPreviewSnapshotExporter::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        FaqItem::observe(ContentSyncObserver::class);
        ServiceOffering::observe(ContentSyncObserver::class);
        SiteSetting::observe(ContentSyncObserver::class);
    }
}
