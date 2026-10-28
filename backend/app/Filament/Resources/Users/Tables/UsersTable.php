<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Imię i nazwisko')
                    ->weight('bold')
                    ->searchable()
                    ->sortable()
                    ->description(fn (\App\Models\User $record): ?string => $record->job_title),
                TextColumn::make('email')
                    ->label('E-mail')
                    ->copyable()
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('Telefon')
                    ->placeholder('—')
                    ->copyable()
                    ->searchable(),
                TextColumn::make('role')
                    ->label('Rola')
                    ->badge()
                    ->formatStateUsing(fn (?string $state): string => match ($state) {
                        'admin' => 'Administrator',
                        'manager' => 'Manager',
                        'staff' => 'Pracownik',
                        default => 'Administrator',
                    })
                    ->color(fn (?string $state): string => match ($state) {
                        'admin' => 'danger',
                        'manager' => 'warning',
                        'staff' => 'info',
                        default => 'gray',
                    }),
                ToggleColumn::make('receives_lead_notifications')
                    ->label('Powiadomienia'),
                ToggleColumn::make('is_active')
                    ->label('Aktywne'),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Edytuj profil'),
                DeleteAction::make()
                    ->hidden(fn (\App\Models\User $record): bool => (int) $record->getKey() === (int) auth()->id()),
            ])
            ->defaultSort('id');
    }
}
