<?php

namespace App\Filament\Resources\Leads\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class LeadsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('public_id')
                    ->label('ID')
                    ->copyable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('full_name')
                    ->label('Kontakt')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('company')
                    ->label('Firma')
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('Telefon')
                    ->copyable()
                    ->searchable(),
                TextColumn::make('email')
                    ->label('E-mail')
                    ->copyable()
                    ->searchable(),
                TextColumn::make('service')
                    ->label('Usługa')
                    ->searchable(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'warning',
                        'in_progress' => 'info',
                        'done' => 'success',
                        'spam' => 'danger',
                        default => 'gray',
                    })
                    ->searchable(),
                IconColumn::make('is_spam')
                    ->label('Spam')
                    ->boolean(),
                IconColumn::make('consent')
                    ->label('Zgoda')
                    ->boolean(),
                TextColumn::make('source_page')
                    ->label('Strona źródłowa')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('source_context')
                    ->label('Kontekst')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('source_site')
                    ->label('Serwis źródłowy')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('locale')
                    ->label('Locale')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('ip_address')
                    ->label('IP')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('spam_reason')
                    ->label('Powód spamu')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Utworzono')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('updated_at')
                    ->label('Zmieniono')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options([
                        'new' => 'Nowy',
                        'in_progress' => 'W realizacji',
                        'done' => 'Zamknięty',
                        'spam' => 'Spam',
                    ]),
                TernaryFilter::make('is_spam')
                    ->label('Spam'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
