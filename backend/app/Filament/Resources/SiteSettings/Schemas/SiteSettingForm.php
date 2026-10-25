<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class SiteSettingForm
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
                        Section::make('Telefony działu usług i serwis 24/7')
                            ->icon(Heroicon::OutlinedWrenchScrewdriver)
                            ->columns(2)
                            ->schema([
                                TextInput::make('services_phone_value')
                                    ->label('Główny numer telefonu (usługi)')
                                    ->prefixIcon(Heroicon::OutlinedPhone)
                                    ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Wyświetlany w nagłówku strony, stopce oraz przyciskach szybkiego kontaktu. Link do dzwonienia aktualizuje się automatycznie.')
                                    ->placeholder('730 101 000')
                                    ->required(),
                                TextInput::make('services_secondary_phone_value')
                                    ->label('Dodatkowy numer telefonu')
                                    ->prefixIcon(Heroicon::OutlinedDevicePhoneMobile)
                                    ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Drugi numer telefonu prezentowany w boksach kontaktowych i stopce.')
                                    ->placeholder('733 929 100')
                                    ->nullable(),
                                TextInput::make('services_phone_label')
                                    ->label('Etykieta przy numerze')
                                    ->prefixIcon(Heroicon::OutlinedTag)
                                    ->placeholder('Usługi')
                                    ->required(),
                                TextInput::make('emergency_note')
                                    ->label('Komunikat o dyżurze 24/7')
                                    ->prefixIcon(Heroicon::OutlinedBolt)
                                    ->placeholder('Serwis awaryjny 24/7 (dla stałych klientów)'),
                            ]),

                        Section::make('Poczta e-mail i godziny pracy biura')
                            ->icon(Heroicon::OutlinedEnvelope)
                            ->columns(2)
                            ->schema([
                                TextInput::make('contact_email')
                                    ->label('Główny adres e-mail biura')
                                    ->prefixIcon(Heroicon::OutlinedAtSymbol)
                                    ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Adres e-mail widoczny dla klientów w sekcji kontaktu i stopce.')
                                    ->email()
                                    ->required()
                                    ->columnSpanFull(),
                                TextInput::make('opening_days')
                                    ->label('Dni pracy biura')
                                    ->prefixIcon(Heroicon::OutlinedCalendarDays)
                                    ->placeholder('Poniedziałek - Piątek')
                                    ->required(),
                                TextInput::make('opening_details')
                                    ->label('Godziny otwarcia')
                                    ->prefixIcon(Heroicon::OutlinedClock)
                                    ->placeholder('8:00 - 16:00')
                                    ->required(),
                            ]),

                        Section::make('Dane firmy i adres siedziby')
                            ->icon(Heroicon::OutlinedBuildingOffice2)
                            ->columns(2)
                            ->schema([
                                TextInput::make('site_name')
                                    ->label('Pełna nazwa firmy')
                                    ->prefixIcon(Heroicon::OutlinedBuildingOffice)
                                    ->required()
                                    ->columnSpanFull(),
                                TextInput::make('street')
                                    ->label('Ulica i numer budynku')
                                    ->prefixIcon(Heroicon::OutlinedMapPin)
                                    ->required()
                                    ->columnSpanFull(),
                                TextInput::make('postal_code')
                                    ->label('Kod pocztowy')
                                    ->prefixIcon(Heroicon::OutlinedHashtag)
                                    ->required(),
                                TextInput::make('city')
                                    ->label('Miejscowość')
                                    ->prefixIcon(Heroicon::OutlinedHomeModern)
                                    ->required(),
                            ]),

                        Section::make('Dział szkoleń i odnośnik do drugiego portalu')
                            ->icon(Heroicon::OutlinedAcademicCap)
                            ->columns(2)
                            ->schema([
                                TextInput::make('training_phone_value')
                                    ->label('Numer telefonu (szkolenia)')
                                    ->prefixIcon(Heroicon::OutlinedPhone)
                                    ->placeholder('730 202 000')
                                    ->required(),
                                TextInput::make('training_phone_label')
                                    ->label('Etykieta przy numerze szkoleń')
                                    ->prefixIcon(Heroicon::OutlinedTag)
                                    ->placeholder('Szkolenia')
                                    ->required(),
                                TextInput::make('training_site_url')
                                    ->label('Adres strony internetowej szkoleń')
                                    ->prefixIcon(Heroicon::OutlinedGlobeAlt)
                                    ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Adres, pod który kierują przyciski oferty szkoleniowej na stronie usług.')
                                    ->url()
                                    ->required()
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),

                Section::make('Wyszukiwarka Google i udostępnianie linku')
                    ->icon(Heroicon::OutlinedMagnifyingGlassCircle)
                    ->columns(2)
                    ->schema([
                        TextInput::make('seo_default_title')
                            ->label('Domyślny tytuł strony w przeglądarce')
                            ->prefixIcon(Heroicon::OutlinedDocumentText)
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Główny tytuł widoczny na karcie przeglądarki oraz w wynikach wyszukiwania Google.')
                            ->required()
                            ->columnSpanFull(),
                        Textarea::make('seo_default_description')
                            ->label('Domyślny opis strony w Google')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Krótki tekst zachęcający wyświetlany pod tytułem strony w wynikach Google.')
                            ->rows(3)
                            ->required()
                            ->columnSpanFull(),
                        TextInput::make('seo_site_name')
                            ->label('Skrócona nazwa witryny')
                            ->prefixIcon(Heroicon::OutlinedBookmark)
                            ->required(),
                        TextInput::make('seo_og_image_url')
                            ->label('Ścieżka do grafiki podglądu')
                            ->prefixIcon(Heroicon::OutlinedPhoto)
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Obrazek wyświetlany automatycznie po wklejeniu linku do strony w komunikatorach lub mediach społecznościowych.')
                            ->placeholder('/og-image.png')
                            ->required(),
                    ])
                    ->columnSpanFull(),

                Section::make('Mapa dojazdu i parametry techniczne')
                    ->icon(Heroicon::OutlinedCog6Tooth)
                    ->columns(2)
                    ->collapsed()
                    ->schema([
                        TextInput::make('map_query')
                            ->label('Fraza adresu na mapie Google')
                            ->prefixIcon(Heroicon::OutlinedMap)
                            ->required()
                            ->columnSpanFull(),
                        Textarea::make('map_embed_url')
                            ->label('Adres osadzenia mapy (iframe)')
                            ->rows(2)
                            ->required()
                            ->columnSpanFull(),
                        Textarea::make('map_directions_url')
                            ->label('Link do wyznaczania trasy')
                            ->rows(2)
                            ->required()
                            ->columnSpanFull(),
                        TextInput::make('brand_mark')
                            ->label('Inicjały w sygnecie logo')
                            ->required(),
                        TextInput::make('base_path')
                            ->label('Ścieżka bazowa witryny')
                            ->hintIcon(Heroicon::OutlinedQuestionMarkCircle, tooltip: 'Na domenie głównej multiserwis.tech wartość powinna wynosić /')
                            ->required()
                            ->default('/'),
                        TextInput::make('brand_primary')
                            ->label('Pierwszy człon logotypu')
                            ->required(),
                        TextInput::make('brand_accent')
                            ->label('Drugi człon logotypu')
                            ->required(),
                        TextInput::make('services_phone_href')
                            ->label('Link techniczny głównego telefonu (tel:)')
                            ->placeholder('tel:+48730101000')
                            ->required(),
                        TextInput::make('services_secondary_phone_href')
                            ->label('Link techniczny drugiego telefonu (tel:)')
                            ->placeholder('tel:+48733929100')
                            ->nullable(),
                        TextInput::make('training_phone_href')
                            ->label('Link techniczny telefonu szkoleń (tel:)')
                            ->placeholder('tel:+48730202000')
                            ->required(),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
