<?php

namespace App\Filament\Resources\FaqItems\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class FaqItemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('question')
                    ->label('Pytanie')
                    ->searchable()
                    ->limit(80),
                TextColumn::make('category')
                    ->label('Kategoria')
                    ->sortable()
                    ->searchable(),
                IconColumn::make('is_featured')
                    ->label('Home')
                    ->boolean(),
                IconColumn::make('is_active')
                    ->label('Aktywne')
                    ->boolean(),
                TextColumn::make('sort_order')
                    ->label('Kolejność')
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->label('Zmieniono')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                SelectFilter::make('category')
                    ->label('Kategoria')
                    ->options(fn (): array => \App\Models\FaqItem::query()
                        ->orderBy('category')
                        ->pluck('category', 'category')
                        ->all()),
                TernaryFilter::make('is_featured')
                    ->label('Na stronie głównej'),
                TernaryFilter::make('is_active')
                    ->label('Aktywne'),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                DeleteBulkAction::make(),
            ])
            ->defaultSort('sort_order');
    }
}
