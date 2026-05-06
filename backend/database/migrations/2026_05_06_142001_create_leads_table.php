<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('public_id')->unique();
            $table->string('full_name', 120);
            $table->string('company', 160)->nullable();
            $table->string('phone', 40);
            $table->string('email', 160);
            $table->string('service', 80);
            $table->text('message');
            $table->boolean('consent');
            $table->string('source_page', 255);
            $table->string('source_context', 120);
            $table->string('source_site', 120)->nullable();
            $table->text('source_url')->nullable();
            $table->text('referrer')->nullable();
            $table->string('locale', 20)->nullable();
            $table->text('user_agent')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('status', 32)->default('new')->index();
            $table->boolean('is_spam')->default(false)->index();
            $table->string('spam_reason', 120)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
