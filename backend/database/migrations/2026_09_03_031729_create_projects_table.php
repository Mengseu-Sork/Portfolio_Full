<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();

            // Project name
            $table->string('title');

            // Project screenshot
            $table->string('image')->nullable();

            // Short text for project card
            $table->text('short_description')->nullable();

            // Full project description
            $table->longText('description')->nullable();

            // PostgreSQL JSONB
            // Example:
            // ["HTML", "CSS", "JavaScript", "Laravel"]
            $table->jsonb('technologies')->nullable();

            // Project information
            $table->string('developer')->nullable();
            $table->string('duration')->nullable();
            $table->string('team')->nullable();

            // Links
            $table->string('github_url')->nullable();
            $table->string('demo_url')->nullable();

            // Display settings
            $table->boolean('is_featured')
                ->default(false);

            $table->boolean('is_active')
                ->default(true);

            $table->unsignedInteger('sort_order')
                ->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};