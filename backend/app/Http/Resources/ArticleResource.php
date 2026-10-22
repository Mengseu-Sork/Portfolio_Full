<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'title' => $this->title,

            'slug' => $this->slug,

            'excerpt' => $this->excerpt,

            'content' => $this->content,

            'image' => $this->image
                ? asset('storage/' . $this->image)
                : null,

            'category' => $this->category,

            'published_at' => $this->published_at,

            'is_published' => (bool) $this->is_published,

            'views' => (int) $this->views,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}
