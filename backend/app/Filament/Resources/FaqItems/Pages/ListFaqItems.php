<?php

namespace App\Filament\Resources\FaqItems\Pages;

use App\Filament\Resources\FaqItems\FaqItemResource;
use App\Models\FaqItem;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListFaqItems extends ListRecords
{
    protected static string $resource = FaqItemResource::class;

    public function mount(): void
    {
        FaqItem::ensureDefaultsExist();

        parent::mount();
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
