<?php

namespace App\Filament\Resources\FaqItems\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class FaqItemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable()
                    ->width('60px'),
                TextColumn::make('question')
                    ->label('Pytanie')
                    ->weight('bold')
                    ->searchable()
                    ->limit(80)
                    ->description(fn (\App\Models\FaqItem $record): string => \Illuminate\Support\Str::limit($record->answer, 95)),
                TextColumn::make('category')
                    ->label('Kategoria')
                    ->badge()
                    ->color('gray')
                    ->sortable()
                    ->searchable(),
                ToggleColumn::make('is_featured')
                    ->label('Na str. głównej'),
                ToggleColumn::make('is_active')
                    ->label('Aktywne'),
                TextColumn::make('updated_at')
                    ->label('Zmieniono')
                    ->dateTime('d.m.Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
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
            ->reorderable('sort_order')
            ->defaultSort('sort_order');
    }
}
