<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SocialLinkResource extends JsonResource
{
    public function toArray(
        Request $request
    ): array {
        return [
            'id' =>
                $this->id,

            'platform' =>
                $this->platform,

            'url' =>
                $this->url,

            'icon' =>
                $this->formatIcon(
                    $this->icon
                ),

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

        if (
            str_starts_with(
                $icon,
                'icons/social-links/'
            )
        ) {
            return asset(
                'storage/' . $icon
            );
        }

        return $icon;
    }
}