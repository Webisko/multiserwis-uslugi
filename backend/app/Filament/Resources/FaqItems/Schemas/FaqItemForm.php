<?php

namespace App\Filament\Resources\FaqItems\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class FaqItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Treść pytania i odpowiedzi')
                    ->icon(Heroicon::OutlinedQuestionMarkCircle)
                    ->columns(2)
                    ->schema([
                        TextInput::make('question')
                            ->label('Pytanie')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Textarea::make('answer')
                            ->label('Odpowiedź')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull(),
                        TextInput::make('category')
                            ->label('Kategoria')
                            ->placeholder('np. Ogólne, Wynajem, UDT')
                            ->required()
                            ->maxLength(120),
                        TextInput::make('sort_order')
                            ->label('Kolejność wyświetlania')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Mniejsza wartość wyświetla pytanie wyżej na liście (możesz też przeciągać wiersze w tabeli).')
                            ->numeric()
                            ->required()
                            ->default(10),
                        Toggle::make('is_active')
                            ->label('Widoczne na stronie')
                            ->default(true),
                        Toggle::make('is_featured')
                            ->label('Wyróżnione na stronie głównej')
                            ->default(false),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
