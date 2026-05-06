<?php

namespace App\Filament\Resources\ServiceOfferings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ServiceOfferingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Nazwa usługi')
                    ->required()
                    ->maxLength(160),
                TextInput::make('slug')
                    ->label('Slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                TextInput::make('short_description')
                    ->label('Krótki opis')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Textarea::make('highlights')
                    ->label('Zakres usługi')
                    ->rows(8)
                    ->required()
                    ->helperText('Wpisz jeden punkt w każdej linii.')
                    ->formatStateUsing(fn ($state): string => is_array($state) ? implode(PHP_EOL, $state) : (string) $state)
                    ->dehydrateStateUsing(fn ($state): array => collect(preg_split('/\r\n|\r|\n/', (string) $state))
                        ->map(fn ($line): string => trim((string) $line))
                        ->filter()
                        ->values()
                        ->all())
                    ->columnSpanFull(),
                TextInput::make('page_path')
                    ->label('Link do strony usługi')
                    ->placeholder('/wynajem')
                    ->maxLength(160),
                TextInput::make('contact_label')
                    ->label('Etykieta w formularzu kontaktowym')
                    ->required()
                    ->maxLength(160),
                TextInput::make('training_text')
                    ->label('Tekst cross-sell szkoleniowego')
                    ->maxLength(255)
                    ->columnSpanFull(),
                TextInput::make('training_link_label')
                    ->label('Etykieta linku szkoleniowego')
                    ->maxLength(160),
                TextInput::make('sort_order')
                    ->label('Kolejność')
                    ->numeric()
                    ->required()
                    ->default(0),
                Toggle::make('is_active')
                    ->label('Aktywna')
                    ->default(true),
                Toggle::make('is_featured')
                    ->label('Pokazuj na stronie głównej')
                    ->default(false),
            ]);
    }
}
