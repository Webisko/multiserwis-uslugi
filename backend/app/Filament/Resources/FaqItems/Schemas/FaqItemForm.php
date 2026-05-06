<?php

namespace App\Filament\Resources\FaqItems\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class FaqItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('question')
                    ->label('Pytanie')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Textarea::make('answer')
                    ->label('Odpowiedź')
                    ->required()
                    ->rows(6)
                    ->columnSpanFull(),
                TextInput::make('category')
                    ->label('Kategoria')
                    ->required()
                    ->maxLength(120),
                TextInput::make('sort_order')
                    ->label('Kolejność')
                    ->numeric()
                    ->required()
                    ->default(0),
                Toggle::make('is_active')
                    ->label('Aktywne')
                    ->default(true),
                Toggle::make('is_featured')
                    ->label('Pokazuj na stronie głównej')
                    ->default(false),
            ]);
    }
}
