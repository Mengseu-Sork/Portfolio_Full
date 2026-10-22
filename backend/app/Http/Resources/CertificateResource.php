<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'name' => $this->name,

            'issuer' => $this->issuer,

            'issue_date' => $this->issue_date,

            'expiry_date' => $this->expiry_date,

            'credential_id' => $this->credential_id,

            'credential_url' => $this->credential_url,

            'certificate_file' => $this->certificate_file
                ? asset('storage/' . $this->certificate_file)
                : null,

            'sort_order' => (int) $this->sort_order,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}
