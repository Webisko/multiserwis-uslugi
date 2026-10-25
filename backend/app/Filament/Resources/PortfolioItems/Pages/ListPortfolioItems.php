<?php

namespace App\Filament\Resources\PortfolioItems\Pages;

use App\Filament\Resources\PortfolioItems\PortfolioItemResource;
use App\Models\PortfolioItem;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPortfolioItems extends ListRecords
{
    protected static string $resource = PortfolioItemResource::class;

    public function mount(): void
    {
        PortfolioItem::ensureDefaultsExist();

        parent::mount();
    }

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->label('Dodaj realizację'),
        ];
    }
}
