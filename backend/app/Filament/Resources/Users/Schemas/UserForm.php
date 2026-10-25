<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make([
                    'default' => 1,
                    'xl' => 2,
                ])
                    ->schema([
                        Section::make('Dane osobowe i kontaktowe')
                            ->icon(Heroicon::OutlinedIdentification)
                            ->columns(2)
                            ->schema([
                                TextInput::make('name')
                                    ->label('Imię i nazwisko')
                                    ->prefixIcon(Heroicon::OutlinedUser)
                                    ->placeholder('np. Jan Kowalski')
                                    ->required()
                                    ->maxLength(120),
                                TextInput::make('job_title')
                                    ->label('Stanowisko lub dział')
                                    ->prefixIcon(Heroicon::OutlinedBriefcase)
                                    ->placeholder('np. Koordynator wynajmu / Specjalista UDT')
                                    ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Stanowisko wyświetla się pod imieniem na pasku bocznym oraz na liście zespołu.')
                                    ->maxLength(120),
                                TextInput::make('email')
                                    ->label('Adres e-mail (login)')
                                    ->prefixIcon(Heroicon::OutlinedEnvelope)
                                    ->email()
                                    ->required()
                                    ->unique(ignoreRecord: true)
                                    ->maxLength(180),
                                TextInput::make('phone')
                                    ->label('Telefon służbowy')
                                    ->prefixIcon(Heroicon::OutlinedPhone)
                                    ->tel()
                                    ->placeholder('np. 730 101 000')
                                    ->maxLength(40),
                            ]),

                        Section::make('Uprawnienia, powiadomienia i hasło')
                            ->icon(Heroicon::OutlinedShieldCheck)
                            ->columns(2)
                            ->schema([
                                Select::make('role')
                                    ->label('Rola w panelu')
                                    ->options([
                                        'admin' => 'Administrator',
                                        'staff' => 'Pracownik',
                                    ])
                                    ->default('staff')
                                    ->required(),
                                TextInput::make('password')
                                    ->label('Hasło do konta')
                                    ->prefixIcon(Heroicon::OutlinedKey)
                                    ->password()
                                    ->revealable()
                                    ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Przy edycji istniejącego konta pozostaw puste, jeśli nie chcesz zmieniać dotychczasowego hasła.')
                                    ->required(fn (string $operation): bool => $operation === 'create')
                                    ->dehydrated(fn ($state): bool => filled($state))
                                    ->minLength(8),
                                Toggle::make('receives_lead_notifications')
                                    ->label('Powiadomienia o nowych zapytaniach')
                                    ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Gdy włączone, użytkownik otrzyma powiadomienie pod ikoną dzwoneczka po każdym nowym zapytaniu ze strony.')
                                    ->default(true),
                                Toggle::make('is_active')
                                    ->label('Konto aktywne')
                                    ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Wyłączenie konta natychmiast blokuje możliwość logowania się do panelu.')
                                    ->default(true),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
