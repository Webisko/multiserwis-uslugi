<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('site_name')
                    ->label('Nazwa strony / firmy')
                    ->required(),
                TextInput::make('brand_mark')
                    ->label('Skrót marki')
                    ->required(),
                TextInput::make('brand_primary')
                    ->label('Główna część brandu')
                    ->required(),
                TextInput::make('brand_accent')
                    ->label('Akcent brandu')
                    ->required(),
                TextInput::make('base_path')
                    ->label('Base path frontendu')
                    ->required()
                    ->default('/'),
                TextInput::make('training_site_url')
                    ->label('URL strony szkoleniowej')
                    ->url()
                    ->required(),
                TextInput::make('street')
                    ->label('Ulica')
                    ->required(),
                TextInput::make('postal_code')
                    ->label('Kod pocztowy')
                    ->required(),
                TextInput::make('city')
                    ->label('Miasto')
                    ->required(),
                TextInput::make('services_phone_label')
                    ->label('Etykieta telefonu usług')
                    ->required(),
                TextInput::make('services_phone_value')
                    ->label('Telefon usług')
                    ->required(),
                TextInput::make('services_phone_href')
                    ->label('Link tel usług')
                    ->required(),
                TextInput::make('training_phone_label')
                    ->label('Etykieta telefonu szkoleń')
                    ->required(),
                TextInput::make('training_phone_value')
                    ->label('Telefon szkoleń')
                    ->required(),
                TextInput::make('training_phone_href')
                    ->label('Link tel szkoleń')
                    ->required(),
                TextInput::make('contact_email')
                    ->label('E-mail kontaktowy')
                    ->email()
                    ->required(),
                TextInput::make('opening_days')
                    ->label('Dni pracy')
                    ->required(),
                TextInput::make('opening_details')
                    ->label('Godziny pracy')
                    ->required(),
                Textarea::make('emergency_note')
                    ->label('Notatka awaryjna')
                    ->rows(3),
                TextInput::make('map_query')
                    ->label('Zapytanie mapy')
                    ->required(),
                Textarea::make('map_embed_url')
                    ->label('URL embedu mapy')
                    ->rows(3)
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('map_directions_url')
                    ->label('URL wskazówek dojazdu')
                    ->rows(3)
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('seo_default_title')
                    ->label('Domyślny tytuł SEO')
                    ->required(),
                Textarea::make('seo_default_description')
                    ->label('Domyślny opis SEO')
                    ->rows(4)
                    ->required(),
                TextInput::make('seo_site_name')
                    ->label('Nazwa serwisu SEO')
                    ->required(),
                Textarea::make('seo_og_image_url')
                    ->label('URL obrazu OG')
                    ->rows(2)
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
