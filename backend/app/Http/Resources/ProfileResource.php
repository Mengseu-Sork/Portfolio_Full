<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'title' => $this->title,
            'short_bio' => $this->short_bio,
            'bio' => $this->bio,
            'profile_image' => $this->profile_image
                ? asset('storage/' . $this->profile_image)
                : null,
            'resume' => $this->resume
                ? asset('storage/' . $this->resume)
                : null,
            'email' => $this->email,
            'phone' => $this->phone,
            'location' => $this->location,
            'availability' => $this->availability,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
