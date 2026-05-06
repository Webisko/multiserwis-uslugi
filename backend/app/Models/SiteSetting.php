<?php

namespace App\Models;

use App\Services\FrontendRebuildDispatcher;
use App\Services\StaticPreviewSnapshotExporter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'brand_mark',
        'brand_primary',
        'brand_accent',
        'base_path',
        'training_site_url',
        'street',
        'postal_code',
        'city',
        'services_phone_label',
        'services_phone_value',
        'services_phone_href',
        'training_phone_label',
        'training_phone_value',
        'training_phone_href',
        'contact_email',
        'opening_days',
        'opening_details',
        'emergency_note',
        'map_query',
        'map_embed_url',
        'map_directions_url',
        'seo_default_title',
        'seo_default_description',
        'seo_site_name',
        'seo_og_image_url',
    ];

    public static function current(): self
    {
        return static::query()->first() ?? app(StaticPreviewSnapshotExporter::class)->runWithoutExporting(
            fn (): self => app(FrontendRebuildDispatcher::class)->runWithoutDispatching(
                fn (): self => static::query()->create(static::defaults()),
            ),
        );
    }

    public static function defaults(): array
    {
        return [
            'site_name' => 'Multiserwis Kutno',
            'brand_mark' => 'MS',
            'brand_primary' => 'MULTISERWIS',
            'brand_accent' => 'KUTNO',
            'base_path' => '/multiserwis-uslugi',
            'training_site_url' => 'https://szkolenia-multiserwis.pl/',
            'street' => 'ul. Siemieradzkiego 18',
            'postal_code' => '99-300',
            'city' => 'Kutno',
            'services_phone_label' => 'Usługi',
            'services_phone_value' => '730 202 000',
            'services_phone_href' => 'tel:+48730202000',
            'training_phone_label' => 'Szkolenia',
            'training_phone_value' => '730 101 000',
            'training_phone_href' => 'tel:+48730101000',
            'contact_email' => 'multiserwis.kutno@gmail.com',
            'opening_days' => 'Poniedziałek - Piątek',
            'opening_details' => '8:00 - 16:00',
            'emergency_note' => 'Serwis awaryjny 24/7 (dla stałych klientów)',
            'map_query' => 'Multiserwis Kutno, ul. Siemieradzkiego 18, 99-300 Kutno',
            'map_embed_url' => 'https://www.google.com/maps?q=Multiserwis%20Kutno%2C%20ul.%20Siemieradzkiego%2018%2C%2099-300%20Kutno&output=embed',
            'map_directions_url' => 'https://www.google.com/maps/search/?api=1&query=Multiserwis%20Kutno%2C%20ul.%20Siemieradzkiego%2018%2C%2099-300%20Kutno',
            'seo_default_title' => 'Multiserwis - Kompleksowe Usługi Przemysłowe',
            'seo_default_description' => 'Profesjonalne usługi dla przemysłu: wynajem maszyn, spawalnictwo, relokacja, konserwacja UDT, usługi elektryczne.',
            'seo_site_name' => 'Multiserwis Kutno',
            'seo_og_image_url' => '/multiserwis-uslugi/og-image.svg',
        ];
    }

    public function toFrontendPayload(): array
    {
        return [
            'company' => [
                'name' => $this->site_name,
                'brand' => [
                    'mark' => $this->brand_mark,
                    'primary' => $this->brand_primary,
                    'accent' => $this->brand_accent,
                ],
                'links' => [
                    'basePath' => $this->base_path,
                    'trainingSiteUrl' => $this->training_site_url,
                ],
                'address' => [
                    'street' => $this->street,
                    'postalCode' => $this->postal_code,
                    'city' => $this->city,
                ],
                'phones' => [
                    'services' => [
                        'label' => $this->services_phone_label,
                        'value' => $this->services_phone_value,
                        'href' => $this->services_phone_href,
                    ],
                    'training' => [
                        'label' => $this->training_phone_label,
                        'value' => $this->training_phone_value,
                        'href' => $this->training_phone_href,
                    ],
                ],
                'email' => $this->contact_email,
                'openingHours' => [
                    'days' => $this->opening_days,
                    'details' => $this->opening_details,
                ],
                'emergencyNote' => $this->emergency_note,
                'map' => [
                    'query' => $this->map_query,
                    'embedUrl' => $this->map_embed_url,
                    'directionsUrl' => $this->map_directions_url,
                ],
            ],
            'seo' => [
                'defaultTitle' => $this->seo_default_title,
                'defaultDescription' => $this->seo_default_description,
                'siteName' => $this->seo_site_name,
                'ogImageUrl' => $this->seo_og_image_url,
            ],
        ];
    }
}
