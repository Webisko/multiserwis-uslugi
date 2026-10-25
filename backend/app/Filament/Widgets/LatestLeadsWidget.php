<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Leads\LeadResource;
use App\Models\Lead;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestLeadsWidget extends BaseWidget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'Ostatnie zapytania z formularza kontaktowego';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Lead::query()
                    ->where('is_spam', false)
                    ->latest('created_at')
                    ->limit(8)
            )
            ->columns([
                TextColumn::make('created_at')
                    ->label('Data')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
                TextColumn::make('full_name')
                    ->label('Klient')
                    ->weight('bold')
                    ->description(fn (Lead $record): ?string => $record->company),
                TextColumn::make('phone')
                    ->label('Telefon')
                    ->copyable(),
                TextColumn::make('email')
                    ->label('E-mail')
                    ->copyable()
                    ->placeholder('—'),
                TextColumn::make('service')
                    ->label('Obszar usługi')
                    ->badge()
                    ->color('gray'),
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
                    }),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Obsłuż')
                    ->url(fn (Lead $record): string => LeadResource::getUrl('edit', ['record' => $record])),
            ])
            ->emptyStateHeading('Brak nowych zapytań ofertowych')
            ->emptyStateDescription('Gdy klient wyśle formularz na stronie multiserwis.tech, zgłoszenie pojawi się w tym miejscu.')
            ->paginated(false);
    }
}
