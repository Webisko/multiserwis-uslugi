<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\FaqItems\FaqItemResource;
use App\Filament\Resources\Leads\LeadResource;
use App\Filament\Resources\ServiceOfferings\ServiceOfferingResource;
use App\Filament\Resources\SiteSettings\SiteSettingResource;
use App\Models\FaqItem;
use App\Models\Lead;
use App\Models\ServiceOffering;
use App\Models\SiteSetting;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class MultiserwisStatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $newLeadsCount = Lead::query()->where('status', 'new')->where('is_spam', false)->count();
        $inProgressLeadsCount = Lead::query()->where('status', 'in_progress')->where('is_spam', false)->count();
        $totalLeadsCount = Lead::query()->where('is_spam', false)->count();

        $activeServicesCount = ServiceOffering::query()->where('is_active', true)->count();
        $featuredServicesCount = ServiceOffering::query()->where('is_active', true)->where('is_featured', true)->count();

        $activeFaqsCount = FaqItem::query()->where('is_active', true)->count();
        $featuredFaqsCount = FaqItem::query()->where('is_active', true)->where('is_featured', true)->count();

        $settings = SiteSetting::current();

        return [
            Stat::make('Nowe zapytania ofertowe', (string) $newLeadsCount)
                ->description("W realizacji: {$inProgressLeadsCount} • Łącznie: {$totalLeadsCount}")
                ->descriptionIcon(Heroicon::OutlinedInboxArrowDown)
                ->color($newLeadsCount > 0 ? 'warning' : 'success')
                ->url(LeadResource::getUrl('index')),

            Stat::make('Aktywne usługi w ofercie', (string) $activeServicesCount)
                ->description("Wyróżnione na stronie głównej: {$featuredServicesCount}")
                ->descriptionIcon(Heroicon::OutlinedWrenchScrewdriver)
                ->color('primary')
                ->url(ServiceOfferingResource::getUrl('index')),

            Stat::make('Pytania w bazie FAQ', (string) $activeFaqsCount)
                ->description("Widoczne na stronie głównej: {$featuredFaqsCount}")
                ->descriptionIcon(Heroicon::OutlinedQuestionMarkCircle)
                ->color('info')
                ->url(FaqItemResource::getUrl('index')),

            Stat::make('Dane kontaktowe strony', $settings->services_phone_value ?: 'Brak telefonu')
                ->description($settings->contact_email ?: 'Brak adresu e-mail')
                ->descriptionIcon(Heroicon::OutlinedCog6Tooth)
                ->color('gray')
                ->url(SiteSettingResource::getNavigationUrl()),
        ];
    }
}
