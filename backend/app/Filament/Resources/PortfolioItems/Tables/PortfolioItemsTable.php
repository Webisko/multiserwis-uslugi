<?php

namespace App\Filament\Resources\PortfolioItems\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class PortfolioItemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable()
                    ->width('60px'),
                TextColumn::make('title')
                    ->label('Realizacja')
                    ->weight('bold')
                    ->sortable()
                    ->searchable()
                    ->description(fn (\App\Models\PortfolioItem $record): ?string => $record->short_description),
                TextColumn::make('category')
                    ->label('Kategoria')
                    ->badge()
                    ->color('warning')
                    ->searchable(),
                TextColumn::make('location')
                    ->label('Lokalizacja / obiekt')
                    ->placeholder('—')
                    ->searchable(),
                ToggleColumn::make('is_active')
                    ->label('Widoczna'),
                TextColumn::make('updated_at')
                    ->label('Zmieniono')
                    ->dateTime('d.m.Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Widoczne'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                DeleteBulkAction::make(),
            ])
            ->reorderable('sort_order')
            ->defaultSort('sort_order');
    }
}
