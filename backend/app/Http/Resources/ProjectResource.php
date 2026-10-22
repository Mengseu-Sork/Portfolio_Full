<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(
        Request $request
    ): array {
        return [
            'id' =>
            $this->id,

            'title' =>
            $this->title,

            'image' =>
            $this->formatImage(
                $this->image
            ),

            'short_description' =>
            $this->short_description,

            'description' =>
            $this->description,

            'technologies' =>
            $this->technologies ?? [],

            'developer' =>
            $this->developer,

            'duration' =>
            $this->duration,

            'team' =>
            $this->team,

            'github_url' =>
            $this->github_url,

            'demo_url' =>
            $this->demo_url,

            'is_featured' =>
            (bool) $this->is_featured,

            'is_active' =>
            (bool) $this->is_active,

            'sort_order' =>
            (int) $this->sort_order,

            'created_at' =>
            $this->created_at,

            'updated_at' =>
            $this->updated_at,
        ];
    }

    private function formatImage(
        ?string $image
    ): ?string {
        if (!$image) {
            return null;
        }

        // Already full URL
        if (
            str_starts_with($image, 'http://') ||
            str_starts_with($image, 'https://')
        ) {
            return $image;
        }

        // Storage path
        if (
            str_starts_with(
                $image,
                'projects/'
            )
        ) {
            return asset(
                'storage/' . $image
            );
        }

        if (
            str_starts_with(
                $image,
                'storage/'
            )
        ) {
            return asset(
                $image
            );
        }

        return asset(
            'storage/' . $image
        );
    }
}
