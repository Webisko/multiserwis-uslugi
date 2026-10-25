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
                TextColumn::make('created_at')
                    ->label('Data zgłoszenia')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
                TextColumn::make('full_name')
                    ->label('Klient')
                    ->weight('bold')
                    ->sortable()
                    ->searchable()
                    ->description(fn (\App\Models\Lead $record): ?string => $record->company),
                TextColumn::make('phone')
                    ->label('Telefon')
                    ->copyable()
                    ->searchable(),
                TextColumn::make('email')
                    ->label('E-mail')
                    ->copyable()
                    ->placeholder('—')
                    ->searchable(),
                TextColumn::make('service')
                    ->label('Obszar usługi')
                    ->badge()
                    ->color('gray')
                    ->searchable(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'new' => 'Nowy',
                        'in_progress' => 'W realizacji',
                        'done' => 'Zamknięty',
                        'spam' => 'Spam',
                        default => $state,
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'warning',
                        'in_progress' => 'info',
                        'done' => 'success',
                        'spam' => 'danger',
                        default => 'gray',
                    })
                    ->searchable(),
                TextColumn::make('assignedUser.name')
                    ->label('Opiekun')
                    ->placeholder('—')
                    ->sortable()
                    ->toggleable(),
                IconColumn::make('consent')
                    ->label('Zgoda RODO')
                    ->boolean()
                    ->toggleable(),
                TextColumn::make('source_page')
                    ->label('Podstrona źródłowa')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('public_id')
                    ->label('ID zgłoszenia')
                    ->copyable()
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Status obsługi')
                    ->options([
                        'new' => 'Nowy',
                        'in_progress' => 'W realizacji',
                        'done' => 'Zamknięty',
                        'spam' => 'Spam',
                    ]),
                TernaryFilter::make('is_spam')
                    ->label('Filtr spamu')
                    ->default(false),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Szczegóły'),
            ])
            ->emptyStateHeading('Brak zapytań ofertowych')
            ->emptyStateDescription('Wszystkie zapytania przesłane przez formularz kontaktowy na stronie multiserwis.tech pojawią się w tej tabeli.')
            ->defaultSort('created_at', 'desc');
    }
}
