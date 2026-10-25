<?php

namespace App\Filament\Resources\PortfolioItems\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Str;

class PortfolioItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Opis realizacji')
                    ->icon(Heroicon::OutlinedBriefcase)
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->label('Tytuł realizacji')
                            ->required()
                            ->maxLength(180)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set, $get): void {
                                if (! filled($get('slug')) && filled($state)) {
                                    $set('slug', Str::slug((string) $state));
                                }
                            }),
                        TextInput::make('category')
                            ->label('Kategoria')
                            ->placeholder('np. Relokacja maszyn, Wynajem maszyn, UDT i serwis')
                            ->required()
                            ->maxLength(120),
                        TextInput::make('location')
                            ->label('Lokalizacja lub typ obiektu')
                            ->placeholder('np. Zakład produkcyjny • woj. łódzkie')
                            ->maxLength(120),
                        TextInput::make('slug')
                            ->label('Identyfikator adresu')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Unikalny skrót używany wewnątrz systemu. Generuje się automatycznie z tytułu.')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(200),
                        Textarea::make('short_description')
                            ->label('Krótkie podsumowanie zadania')
                            ->rows(2)
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Textarea::make('highlights')
                            ->label('Zakres wykonanych prac')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Wpisz każdy punkt w osobnej linii — wyświetlą się jako lista wypunktowana na karcie realizacji.')
                            ->rows(5)
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

                Section::make('Zdjęcie i widoczność')
                    ->icon(Heroicon::OutlinedPhoto)
                    ->columns(2)
                    ->schema([
                        FileUpload::make('image_url')
                            ->label('Zdjęcie realizacji (opcjonalne)')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Możesz wgrać zdjęcie z realizacji (JPG, PNG, WebP). Jeśli pole pozostanie puste, karta wyświetli się w układzie tekstowym.')
                            ->disk('public')
                            ->directory('portfolio')
                            ->visibility('public')
                            ->image()
                            ->columnSpanFull(),
                        TextInput::make('sort_order')
                            ->label('Kolejność wyświetlania')
                            ->numeric()
                            ->required()
                            ->default(10),
                        Toggle::make('is_active')
                            ->label('Widoczna na stronie')
                            ->default(true),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
