<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name', 120);
            $table->string('brand_mark', 10);
            $table->string('brand_primary', 60);
            $table->string('brand_accent', 60);
            $table->string('base_path', 120)->default('/');
            $table->string('training_site_url', 2048);
            $table->string('street', 160);
            $table->string('postal_code', 20);
            $table->string('city', 120);
            $table->string('services_phone_label', 40);
            $table->string('services_phone_value', 40);
            $table->string('services_phone_href', 60);
            $table->string('training_phone_label', 40);
            $table->string('training_phone_value', 40);
            $table->string('training_phone_href', 60);
            $table->string('contact_email', 160);
            $table->string('opening_days', 120);
            $table->string('opening_details', 120);
            $table->string('emergency_note', 255)->nullable();
            $table->string('map_query', 255);
            $table->text('map_embed_url');
            $table->text('map_directions_url');
            $table->string('seo_default_title', 160);
            $table->string('seo_default_description', 320);
            $table->string('seo_site_name', 120);
            $table->text('seo_og_image_url');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
