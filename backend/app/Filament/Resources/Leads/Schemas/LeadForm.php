<?php

namespace App\Filament\Resources\Leads\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class LeadForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('public_id')
                    ->label('ID publiczne')
                    ->disabled()
                    ->dehydrated(false),
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
                    ->label('Usługa')
                    ->disabled()
                    ->dehydrated(false),
                Textarea::make('message')
                    ->label('Wiadomość')
                    ->rows(6)
                    ->disabled()
                    ->dehydrated(false)
                    ->columnSpanFull(),
                Toggle::make('consent')
                    ->label('Zgoda marketingowa / kontaktowa')
                    ->disabled()
                    ->dehydrated(false),
                TextInput::make('source_page')
                    ->label('Strona źródłowa')
                    ->disabled()
                    ->dehydrated(false),
                TextInput::make('source_context')
                    ->label('Kontekst źródłowy')
                    ->disabled()
                    ->dehydrated(false),
                TextInput::make('source_site')
                    ->label('Serwis źródłowy')
                    ->disabled()
                    ->dehydrated(false),
                Textarea::make('source_url')
                    ->label('URL źródłowy')
                    ->rows(3)
                    ->disabled()
                    ->dehydrated(false)
                    ->columnSpanFull(),
                Textarea::make('referrer')
                    ->label('Referrer')
                    ->rows(3)
                    ->disabled()
                    ->dehydrated(false)
                    ->columnSpanFull(),
                TextInput::make('locale')
                    ->label('Locale')
                    ->disabled()
                    ->dehydrated(false),
                Textarea::make('user_agent')
                    ->label('User-Agent')
                    ->rows(3)
                    ->disabled()
                    ->dehydrated(false)
                    ->columnSpanFull(),
                TextInput::make('ip_address')
                    ->label('Adres IP')
                    ->disabled()
                    ->dehydrated(false),
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'new' => 'Nowy',
                        'in_progress' => 'W realizacji',
                        'done' => 'Zamknięty',
                        'spam' => 'Spam',
                    ])
                    ->required()
                    ->default('new'),
                Toggle::make('is_spam')
                    ->label('Oznaczone jako spam')
                    ->disabled()
                    ->dehydrated(false),
                TextInput::make('spam_reason')
                    ->label('Powód spamu')
                    ->disabled()
                    ->dehydrated(false),
                Textarea::make('notes')
                    ->label('Notatki operacyjne')
                    ->rows(6)
                    ->columnSpanFull(),
            ]);
    }
}
