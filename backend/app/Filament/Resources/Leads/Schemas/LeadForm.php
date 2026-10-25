<?php

namespace App\Filament\Resources\Leads\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class LeadForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Obsługa zapytania')
                    ->icon(Heroicon::OutlinedClipboardDocumentCheck)
                    ->columns(3)
                    ->schema([
                        Select::make('status')
                            ->label('Status realizacji')
                            ->options([
                                'new' => 'Nowe (do kontaktu)',
                                'in_progress' => 'W realizacji',
                                'done' => 'Zamknięte',
                                'spam' => 'Spam / odrzucone',
                            ])
                            ->required()
                            ->default('new'),
                        Select::make('assigned_user_id')
                            ->label('Przypisany pracownik')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Wskaż osobę z zespołu odpowiedzialną za kontakt z klientem i przygotowanie wyceny.')
                            ->relationship('assignedUser', 'name')
                            ->searchable()
                            ->preload()
                            ->placeholder('Nieprzypisane'),
                        TextInput::make('public_id')
                            ->label('Identyfikator zgłoszenia')
                            ->disabled()
                            ->dehydrated(false),
                        Textarea::make('notes')
                            ->label('Notatki wewnętrzne')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Widoczne wyłącznie dla pracowników w panelu.')
                            ->placeholder('Wpisz ustalenia z rozmowy telefonicznej lub kwotę wyceny...')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),

                Section::make('Dane klienta i treść zapytania')
                    ->icon(Heroicon::OutlinedUserCircle)
                    ->columns(2)
                    ->schema([
                        TextInput::make('full_name')
                            ->label('Osoba kontaktowa')
                            ->disabled()
                            ->dehydrated(false),
                        TextInput::make('company')
                            ->label('Firma')
                            ->disabled()
                            ->dehydrated(false),
                        TextInput::make('phone')
                            ->label('Telefon')
                            ->tel()
                            ->disabled()
                            ->dehydrated(false),
                        TextInput::make('email')
                            ->label('E-mail')
                            ->email()
                            ->disabled()
                            ->dehydrated(false),
                        TextInput::make('service')
                            ->label('Wybrany obszar usługi')
                            ->disabled()
                            ->dehydrated(false),
                        Toggle::make('consent')
                            ->label('Zaakceptowano zgodę kontaktową')
                            ->disabled()
                            ->dehydrated(false),
                        Textarea::make('message')
                            ->label('Treść wiadomości i parametry zapytania')
                            ->rows(7)
                            ->disabled()
                            ->dehydrated(false)
                            ->columnSpanFull(),
                    ])
                    ->columnSpanFull(),

                Section::make('Dane techniczne i źródło zgłoszenia')
                    ->icon(Heroicon::OutlinedGlobeAlt)
                    ->columns(2)
                    ->collapsed()
                    ->schema([
                        TextInput::make('source_page')
                            ->label('Podstrona źródłowa')
                            ->disabled()
                            ->dehydrated(false),
                        TextInput::make('source_context')
                            ->label('Sekcja formularza')
                            ->disabled()
                            ->dehydrated(false),
                        TextInput::make('source_url')
                            ->label('Pełny adres strony')
                            ->disabled()
                            ->dehydrated(false)
                            ->columnSpanFull(),
                        TextInput::make('referrer')
                            ->label('Strona odsyłająca')
                            ->disabled()
                            ->dehydrated(false)
                            ->columnSpanFull(),
                        TextInput::make('ip_address')
                            ->label('Adres IP')
                            ->disabled()
                            ->dehydrated(false),
                        TextInput::make('locale')
                            ->label('Język przeglądarki')
                            ->disabled()
                            ->dehydrated(false),
                        Textarea::make('user_agent')
                            ->label('Przeglądarka użytkownika')
                            ->rows(2)
                            ->disabled()
                            ->dehydrated(false)
                            ->columnSpanFull(),
                        Toggle::make('is_spam')
                            ->label('Oznaczone przez filtr antyspamowy')
                            ->disabled()
                            ->dehydrated(false),
                        TextInput::make('spam_reason')
                            ->label('Powód oznaczenia jako spam')
                            ->disabled()
                            ->dehydrated(false),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
