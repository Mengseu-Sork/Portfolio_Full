<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('title')->nullable();

            $table->text('short_bio')->nullable();
            $table->longText('bio')->nullable();

            $table->string('profile_image')->nullable();
            $table->string('resume')->nullable();

            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('location')->nullable();

            $table->string('availability')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
