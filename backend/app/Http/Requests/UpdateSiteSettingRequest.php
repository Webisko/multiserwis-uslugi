<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site_name' => ['required', 'string', 'max:120'],
            'brand_mark' => ['required', 'string', 'max:10'],
            'brand_primary' => ['required', 'string', 'max:60'],
            'brand_accent' => ['required', 'string', 'max:60'],
            'base_path' => ['required', 'string', 'max:120'],
            'training_site_url' => ['required', 'url', 'max:2048'],
            'street' => ['required', 'string', 'max:160'],
            'postal_code' => ['required', 'string', 'max:20'],
            'city' => ['required', 'string', 'max:120'],
            'services_phone_label' => ['required', 'string', 'max:40'],
            'services_phone_value' => ['required', 'string', 'max:40'],
            'services_phone_href' => ['required', 'string', 'max:60'],
            'training_phone_label' => ['required', 'string', 'max:40'],
            'training_phone_value' => ['required', 'string', 'max:40'],
            'training_phone_href' => ['required', 'string', 'max:60'],
            'contact_email' => ['required', 'email', 'max:160'],
            'opening_days' => ['required', 'string', 'max:120'],
            'opening_details' => ['required', 'string', 'max:120'],
            'emergency_note' => ['nullable', 'string', 'max:255'],
            'map_query' => ['required', 'string', 'max:255'],
            'map_embed_url' => ['required', 'url', 'max:2048'],
            'map_directions_url' => ['required', 'url', 'max:2048'],
            'seo_default_title' => ['required', 'string', 'max:160'],
            'seo_default_description' => ['required', 'string', 'max:320'],
            'seo_site_name' => ['required', 'string', 'max:120'],
            'seo_og_image_url' => ['required', 'string', 'max:2048'],
        ];
    }
}
