<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::query()
            ->orderByDesc('issue_date')
            ->orderBy('id', 'desc')
            ->get();

        return CertificateResource::collection($certificates);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'issuer' => ['nullable', 'string', 'max:255'],
            'issue_date' => ['nullable', 'date'],
            'expiry_date' => [
                'nullable',
                'date',
                'after_or_equal:issue_date',
            ],
            'credential_id' => ['nullable', 'string', 'max:255'],
            'credential_url' => ['nullable', 'url', 'max:255'],
            'certificate_file' => [
                'nullable',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:10240',
            ],
            'sort_order' => ['nullable', 'integer'],
        ]);

        if ($request->hasFile('certificate_file')) {
            $validated['certificate_file'] = $request
                ->file('certificate_file')
                ->store('certificates', 'public');
        }

        $certificate = Certificate::create($validated);

        return response()->json([
            'message' => 'Certificate created successfully.',
            'data' => new CertificateResource($certificate),
        ], 201);
    }

    public function show(Certificate $certificate)
    {
        return new CertificateResource($certificate);
    }

    public function update(
        Request $request,
        Certificate $certificate
    ) {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'issuer' => ['nullable', 'string', 'max:255'],
            'issue_date' => ['nullable', 'date'],
            'expiry_date' => [
                'nullable',
                'date',
                'after_or_equal:issue_date',
            ],
            'credential_id' => ['nullable', 'string', 'max:255'],
            'credential_url' => ['nullable', 'url', 'max:255'],
            'certificate_file' => [
                'nullable',
                'file',
                'mimes:pdf,jpg,jpeg,png',
                'max:10240',
            ],
            'sort_order' => ['nullable', 'integer'],
        ]);

        if ($request->hasFile('certificate_file')) {
            if ($certificate->certificate_file) {
                Storage::disk('public')
                    ->delete($certificate->certificate_file);
            }

            $validated['certificate_file'] = $request
                ->file('certificate_file')
                ->store('certificates', 'public');
        }

        $certificate->update($validated);

        return response()->json([
            'message' => 'Certificate updated successfully.',
            'data' => new CertificateResource(
                $certificate->fresh()
            ),
        ]);
    }

    public function destroy(Certificate $certificate)
    {
        if ($certificate->certificate_file) {
            Storage::disk('public')
                ->delete($certificate->certificate_file);
        }

        $certificate->delete();

        return response()->json([
            'message' => 'Certificate deleted successfully.',
        ]);
    }
}
