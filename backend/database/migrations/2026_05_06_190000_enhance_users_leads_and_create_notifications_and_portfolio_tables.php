<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            if (! Schema::hasColumn('users', 'job_title')) {
                $table->string('job_title', 120)->nullable()->after('name');
            }
            if (! Schema::hasColumn('users', 'phone')) {
                $table->string('phone', 40)->nullable()->after('email');
            }
            if (! Schema::hasColumn('users', 'role')) {
                $table->string('role', 40)->default('admin')->after('phone');
            }
            if (! Schema::hasColumn('users', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('role');
            }
            if (! Schema::hasColumn('users', 'receives_lead_notifications')) {
                $table->boolean('receives_lead_notifications')->default(true)->after('is_active');
            }
        });

        Schema::table('leads', function (Blueprint $table): void {
            if (! Schema::hasColumn('leads', 'assigned_user_id')) {
                $table->foreignId('assigned_user_id')->nullable()->after('status')->constrained('users')->nullOnDelete();
            }
        });

        if (! Schema::hasTable('notifications')) {
            Schema::create('notifications', function (Blueprint $table): void {
                $table->uuid('id')->primary();
                $table->string('type');
                $table->morphs('notifiable');
                $table->text('data');
                $table->timestamp('read_at')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('portfolio_items')) {
            Schema::create('portfolio_items', function (Blueprint $table): void {
                $table->id();
                $table->string('title', 180);
                $table->string('slug', 200)->unique();
                $table->string('category', 120);
                $table->string('location', 120)->nullable();
                $table->string('short_description', 255)->nullable();
                $table->json('highlights');
                $table->string('image_url', 255)->nullable();
                $table->unsignedInteger('sort_order')->default(10);
                $table->boolean('is_featured')->default(true);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_items');
        Schema::dropIfExists('notifications');

        Schema::table('leads', function (Blueprint $table): void {
            if (Schema::hasColumn('leads', 'assigned_user_id')) {
                $table->dropConstrainedForeignId('assigned_user_id');
            }
        });

        Schema::table('users', function (Blueprint $table): void {
            $columns = array_filter(
                ['job_title', 'phone', 'role', 'is_active', 'receives_lead_notifications'],
                fn (string $col): bool => Schema::hasColumn('users', $col),
            );
            if ($columns !== []) {
                $table->dropColumn($columns);
            }
        });
    }
};
