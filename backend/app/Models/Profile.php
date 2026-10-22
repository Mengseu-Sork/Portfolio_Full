<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'title',
        'short_bio',
        'bio',
        'profile_image',
        'resume',
        'email',
        'phone',
        'location',
        'availability',
    ];
}
