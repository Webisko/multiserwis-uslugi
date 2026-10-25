<?php

namespace App\Filament\Resources\ServiceOfferings;

use App\Filament\Resources\ServiceOfferings\Pages\CreateServiceOffering;
use App\Filament\Resources\ServiceOfferings\Pages\EditServiceOffering;
use App\Filament\Resources\ServiceOfferings\Pages\ListServiceOfferings;
use App\Filament\Resources\ServiceOfferings\Schemas\ServiceOfferingForm;
use App\Filament\Resources\ServiceOfferings\Tables\ServiceOfferingsTable;
use App\Models\ServiceOffering;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ServiceOfferingResource extends Resource
{
    protected static ?string $model = ServiceOffering::class;

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $modelLabel = 'usługa';

    protected static ?string $pluralModelLabel = 'Usługi';

    protected static ?string $navigationLabel = 'Usługi';

    protected static ?int $navigationSort = 20;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedWrenchScrewdriver;

    public static function getNavigationBadge(): ?string
    {
        return (string) static::getModel()::query()->where('is_active', true)->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'gray';
    }

    public static function form(Schema $schema): Schema
    {
        return ServiceOfferingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ServiceOfferingsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListServiceOfferings::route('/'),
            'create' => CreateServiceOffering::route('/create'),
            'edit' => EditServiceOffering::route('/{record}/edit'),
        ];
    }
}
