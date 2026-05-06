<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('service_offerings', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title', 160);
            $table->string('short_description', 255);
            $table->json('highlights');
            $table->string('page_path', 160)->nullable();
            $table->string('contact_label', 160);
            $table->string('training_text', 255)->nullable();
            $table->string('training_link_label', 160)->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('service_offerings');
    }
};
