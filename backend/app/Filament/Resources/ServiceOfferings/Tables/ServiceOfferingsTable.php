<?php

namespace App\Filament\Resources\ServiceOfferings\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ServiceOfferingsTable
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
                    ->label('Usługa')
                    ->weight('bold')
                    ->sortable()
                    ->searchable()
                    ->description(fn (\App\Models\ServiceOffering $record): string => $record->short_description),
                TextColumn::make('page_path')
                    ->label('Ścieżka podstrony')
                    ->badge()
                    ->color('gray'),
                TextColumn::make('contact_label')
                    ->label('Opcja w formularzu')
                    ->searchable(),
                ToggleColumn::make('is_featured')
                    ->label('Na str. głównej'),
                ToggleColumn::make('is_active')
                    ->label('Aktywna'),
                TextColumn::make('updated_at')
                    ->label('Zmieniono')
                    ->dateTime('d.m.Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
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
