<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            [
                'email' => 'mengseu.sork212004@gmail.com',
            ],
            [
                'name' => 'Administrator',
                'password' => Hash::make('212004mengseu'),
            ]
        );
    }
}