<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'company' => $this->company,

            'position' => $this->position,

            'location' => $this->location,

            'start_date' => $this->start_date,

            'end_date' => $this->end_date,

            'is_current' => (bool) $this->is_current,

            'description' => $this->description,

            'sort_order' => (int) $this->sort_order,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}
