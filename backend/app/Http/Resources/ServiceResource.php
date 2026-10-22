<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray(
        Request $request
    ): array {
        return [
            'id' =>
            $this->id,

            'title' =>
            $this->title,

            'icon' =>
            $this->formatIcon(
                $this->icon
            ),

            'short_description' =>
            $this->short_description,

            'description' =>
            $this->description,

            'sort_order' =>
            (int) (
                $this->sort_order ?? 0
            ),

            'is_active' =>
            (bool) $this->is_active,

            'created_at' =>
            $this->created_at,

            'updated_at' =>
            $this->updated_at,
        ];
    }

    private function formatIcon(
        ?string $icon
    ): ?string {
        if (!$icon) {
            return null;
        }

        /*
        |--------------------------------------------------------------------------
        | Uploaded image
        |--------------------------------------------------------------------------
        */

        if (
            str_starts_with(
                $icon,
                'icons/services/'
            )
        ) {
            return asset(
                'storage/' . $icon
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Icon name
        |--------------------------------------------------------------------------
        */

        return $icon;
    }
}
