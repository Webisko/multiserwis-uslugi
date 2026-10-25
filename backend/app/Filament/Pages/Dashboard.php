<?php

namespace App\Filament\Pages;

use App\Filament\Resources\FaqItems\FaqItemResource;
use App\Filament\Resources\Leads\LeadResource;
use App\Filament\Resources\PortfolioItems\PortfolioItemResource;
use App\Filament\Resources\ServiceOfferings\ServiceOfferingResource;
use App\Filament\Resources\SiteSettings\SiteSettingResource;
use App\Models\FaqItem;
use App\Models\Lead;
use App\Models\PortfolioItem;
use App\Models\ServiceOffering;
use App\Models\SiteSetting;
use BackedEnum;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Support\Icons\Heroicon;

class Dashboard extends BaseDashboard
{
    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSquares2x2;

    protected static ?string $navigationLabel = 'Pulpit';

    protected static ?string $title = 'Pulpit';

    protected string $view = 'filament.pages.dashboard';

    public function getViewData(): array
    {
        ServiceOffering::ensureDefaultsExist();
        FaqItem::ensureDefaultsExist();
        PortfolioItem::ensureDefaultsExist();

        $newLeadsCount = Lead::query()->where('status', 'new')->where('is_spam', false)->count();
        $inProgressLeadsCount = Lead::query()->where('status', 'in_progress')->where('is_spam', false)->count();
        $doneLeadsCount = Lead::query()->where('status', 'done')->where('is_spam', false)->count();
        $totalLeadsCount = Lead::query()->where('is_spam', false)->count();

        $services = ServiceOffering::query()->orderBy('sort_order')->get();
        $activeServicesCount = $services->where('is_active', true)->count();
        $featuredServicesCount = $services->where('is_active', true)->where('is_featured', true)->count();

        $faqs = FaqItem::query()->orderBy('sort_order')->get();
        $activeFaqsCount = $faqs->where('is_active', true)->count();
        $featuredFaqsCount = $faqs->where('is_active', true)->where('is_featured', true)->count();
        $faqCategoriesCount = $faqs->where('is_active', true)->pluck('category')->unique()->count();

        $settings = SiteSetting::current();

        $latestLeads = Lead::query()
            ->where('is_spam', false)
            ->latest('created_at')
            ->limit(5)
            ->get();

        $serviceBreakdown = $services->map(function (ServiceOffering $service) use ($totalLeadsCount): array {
            $leadsForService = Lead::query()
                ->where('is_spam', false)
                ->where(function ($q) use ($service): void {
                    $q->where('service', $service->contact_label)
                        ->orWhere('service', $service->title);
                })
                ->count();

            $highlightsCount = is_array($service->highlights) ? count($service->highlights) : 0;
            $percent = $totalLeadsCount > 0
                ? max(12, (int) round(($leadsForService / $totalLeadsCount) * 100))
                : min(100, max(25, $highlightsCount * 16));

            return [
                'id' => $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'page_path' => $service->page_path,
                'highlights_count' => $highlightsCount,
                'leads_count' => $leadsForService,
                'is_featured' => (bool) $service->is_featured,
                'is_active' => (bool) $service->is_active,
                'percent' => $percent,
                'edit_url' => ServiceOfferingResource::getUrl('edit', ['record' => $service]),
            ];
        });

        return [
            'newLeadsCount' => $newLeadsCount,
            'inProgressLeadsCount' => $inProgressLeadsCount,
            'doneLeadsCount' => $doneLeadsCount,
            'totalLeadsCount' => $totalLeadsCount,
            'activeServicesCount' => $activeServicesCount,
            'featuredServicesCount' => $featuredServicesCount,
            'activeFaqsCount' => $activeFaqsCount,
            'featuredFaqsCount' => $featuredFaqsCount,
            'faqCategoriesCount' => $faqCategoriesCount,
            'settings' => $settings,
            'latestLeads' => $latestLeads,
            'serviceBreakdown' => $serviceBreakdown,
            'urls' => [
                'createService' => ServiceOfferingResource::getUrl('create'),
                'listServices' => ServiceOfferingResource::getUrl('index'),
                'createFaq' => FaqItemResource::getUrl('create'),
                'listFaqs' => FaqItemResource::getUrl('index'),
                'listLeads' => LeadResource::getUrl('index'),
                'editSettings' => SiteSettingResource::getNavigationUrl(),
            ],
        ];
    }
}
