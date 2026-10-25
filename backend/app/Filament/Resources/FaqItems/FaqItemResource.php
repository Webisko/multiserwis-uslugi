<?php

namespace App\Filament\Resources\FaqItems;

use App\Filament\Resources\FaqItems\Pages\CreateFaqItem;
use App\Filament\Resources\FaqItems\Pages\EditFaqItem;
use App\Filament\Resources\FaqItems\Pages\ListFaqItems;
use App\Filament\Resources\FaqItems\Schemas\FaqItemForm;
use App\Filament\Resources\FaqItems\Tables\FaqItemsTable;
use App\Models\FaqItem;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class FaqItemResource extends Resource
{
    protected static ?string $model = FaqItem::class;

    protected static ?string $recordTitleAttribute = 'question';

    protected static ?string $modelLabel = 'pytanie i odpowiedź';

    protected static ?string $pluralModelLabel = 'Pytania i odpowiedzi';

    protected static ?string $navigationLabel = 'Pytania i odpowiedzi';

    protected static ?int $navigationSort = 30;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedQuestionMarkCircle;

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
        return FaqItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FaqItemsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListFaqItems::route('/'),
            'create' => CreateFaqItem::route('/create'),
            'edit' => EditFaqItem::route('/{record}/edit'),
        ];
    }
}
