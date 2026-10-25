<?php

namespace App\Filament\Resources\PortfolioItems;

use App\Filament\Resources\PortfolioItems\Pages\CreatePortfolioItem;
use App\Filament\Resources\PortfolioItems\Pages\EditPortfolioItem;
use App\Filament\Resources\PortfolioItems\Pages\ListPortfolioItems;
use App\Filament\Resources\PortfolioItems\Schemas\PortfolioItemForm;
use App\Filament\Resources\PortfolioItems\Tables\PortfolioItemsTable;
use App\Models\PortfolioItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Schema as DbSchema;

class PortfolioItemResource extends Resource
{
    protected static ?string $model = PortfolioItem::class;

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $modelLabel = 'realizacja';

    protected static ?string $pluralModelLabel = 'Realizacje';

    protected static ?string $navigationLabel = 'Realizacje';

    protected static ?int $navigationSort = 25;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBriefcase;

    public static function getNavigationBadge(): ?string
    {
        if (! DbSchema::hasTable('portfolio_items')) {
            return null;
        }

        PortfolioItem::ensureDefaultsExist();

        return (string) static::getModel()::query()->where('is_active', true)->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'gray';
    }

    public static function form(Schema $schema): Schema
    {
        return PortfolioItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PortfolioItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPortfolioItems::route('/'),
            'create' => CreatePortfolioItem::route('/create'),
            'edit' => EditPortfolioItem::route('/{record}/edit'),
        ];
    }
}
