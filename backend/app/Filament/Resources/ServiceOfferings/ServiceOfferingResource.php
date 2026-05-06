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
use UnitEnum;

class ServiceOfferingResource extends Resource
{
    protected static ?string $model = ServiceOffering::class;

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $modelLabel = 'usługa';

    protected static ?string $pluralModelLabel = 'Usługi';

    protected static ?string $navigationLabel = 'Usługi';

    protected static string|UnitEnum|null $navigationGroup = 'Treść';

    protected static ?int $navigationSort = 40;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

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
        return [
            //
        ];
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
