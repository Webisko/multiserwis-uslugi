<?php

namespace App\Filament\Resources\ServiceOfferings\Pages;

use App\Filament\Resources\ServiceOfferings\ServiceOfferingResource;
use App\Models\ServiceOffering;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListServiceOfferings extends ListRecords
{
    protected static string $resource = ServiceOfferingResource::class;

    public function mount(): void
    {
        ServiceOffering::ensureDefaultsExist();

        parent::mount();
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
