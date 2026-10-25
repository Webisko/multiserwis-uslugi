<?php

namespace App\Filament\Resources\ServiceOfferings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ServiceOfferingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Główne informacje o usłudze')
                    ->icon(Heroicon::OutlinedWrenchScrewdriver)
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->label('Nazwa usługi')
                            ->required()
                            ->maxLength(160),
                        TextInput::make('slug')
                            ->label('Adres uproszczony (identyfikator)')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        TextInput::make('short_description')
                            ->label('Krótki opis na karcie usługi')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Textarea::make('highlights')
                            ->label('Zakres usługi (punkty listy)')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Wpisz każdy punkt zakresu usługi w osobnej linii.')
                            ->rows(7)
                            ->required()
                            ->formatStateUsing(fn ($state): string => is_array($state) ? implode(PHP_EOL, $state) : (string) $state)
                            ->dehydrateStateUsing(fn ($state): array => collect(preg_split('/\r\n|\r|\n/', (string) $state))
                                ->map(fn ($line): string => trim((string) $line))
                                ->filter()
                                ->values()
                                ->all())
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),

                Section::make('Nawigacja, formularz kontaktowy i odnośnik szkoleniowy')
                    ->icon(Heroicon::OutlinedAdjustmentsHorizontal)
                    ->columns(2)
                    ->schema([
                        TextInput::make('page_path')
                            ->label('Ścieżka podstrony usługi')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Adres docelowej podstrony, np. /wynajem, /relokacja, /spawanie, /budownictwo, /udt, /elektryka')
                            ->placeholder('/wynajem')
                            ->maxLength(160),
                        TextInput::make('contact_label')
                            ->label('Nazwa opcji w formularzu kontaktowym')
                            ->required()
                            ->maxLength(160),
                        TextInput::make('training_text')
                            ->label('Tekst boksu szkoleniowego (opcjonalny)')
                            ->placeholder('Potrzebujesz uprawnień UDT na wózki, żurawie lub podesty?')
                            ->maxLength(255),
                        TextInput::make('training_link_label')
                            ->label('Tekst linku do szkoleń (opcjonalny)')
                            ->placeholder('Oferta szkoleń UDT')
                            ->maxLength(160),
                        TextInput::make('sort_order')
                            ->label('Kolejność wyświetlania')
                            ->numeric()
                            ->required()
                            ->default(10),
                        Toggle::make('is_active')
                            ->label('Aktywna w serwisie')
                            ->default(true),
                        Toggle::make('is_featured')
                            ->label('Pokazuj w kafelkach na stronie głównej')
                            ->default(true),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
