<?php

namespace App\Filament\Resources\ServiceOfferings\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ServiceOfferingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Usługa')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('slug')
                    ->label('Slug')
                    ->searchable(),
                TextColumn::make('contact_label')
                    ->label('Opcja formularza')
                    ->searchable(),
                IconColumn::make('is_featured')
                    ->label('Home')
                    ->boolean(),
                IconColumn::make('is_active')
                    ->label('Aktywna')
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
