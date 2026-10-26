<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * Public services
     */
    public function index()
    {
        $services = Service::query()
            ->where('is_active', true)
            ->orderBy('id', 'desc')
            ->get();

        return ServiceResource::collection($services);
    }

    /**
     * Create service
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            /*
             * Optional icon name:
             * Code2, Server, Database, etc.
             */
            'icon' => [
                'nullable',
                'string',
                'max:255',
            ],

            /*
             * Uploaded icon image.
             */
            'icon_file' => [
                'nullable',
                'image',
                'mimes:png,jpg,jpeg,webp',
                'max:2048',
            ],

            'short_description' => [
                'nullable',
                'string',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'is_active' => [
                'nullable',
                'boolean',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | UPLOAD ICON
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('icon_file')) {
            $validated['icon'] = $request
                ->file('icon_file')
                ->store(
                    'icons/services',
                    'public'
                );
        }

        /*
         * icon_file is only an upload field.
         * It does not belong in the services table.
         */
        unset($validated['icon_file']);

        /*
        |--------------------------------------------------------------------------
        | CREATE
        |--------------------------------------------------------------------------
        */

        $service = Service::create(
            $validated
        );

        return response()->json([
            'message' =>
            'Service created successfully.',

            'data' =>
            new ServiceResource(
                $service->fresh()
            ),
        ], 201);
    }

    /**
     * Show one service
     */
    public function show(Service $service)
    {
        return response()->json([
            'data' =>
            new ServiceResource(
                $service
            ),
        ]);
    }

    /**
     * Update service
     */
    public function update(
        Request $request,
        Service $service
    ) {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'icon' => [
                'nullable',
                'string',
                'max:255',
            ],

            'icon_file' => [
                'nullable',
                'image',
                'mimes:png,jpg,jpeg,webp',
                'max:2048',
            ],

            'short_description' => [
                'nullable',
                'string',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],

            'is_active' => [
                'nullable',
                'boolean',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | NEW ICON IMAGE
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('icon_file')) {

            /*
             * Delete old uploaded image.
             */
            if (
                $service->icon &&
                str_starts_with(
                    $service->icon,
                    'icons/services/'
                ) &&
                Storage::disk('public')->exists(
                    $service->icon
                )
            ) {
                Storage::disk('public')->delete(
                    $service->icon
                );
            }

            /*
             * Store new image.
             */
            $validated['icon'] = $request
                ->file('icon_file')
                ->store(
                    'icons/services',
                    'public'
                );
        } else {
            /*
             * No new image selected:
             * preserve existing icon.
             */
            unset($validated['icon']);
        }

        unset($validated['icon_file']);

        /*
        |--------------------------------------------------------------------------
        | UPDATE
        |--------------------------------------------------------------------------
        */

        $service->update(
            $validated
        );

        return response()->json([
            'message' =>
            'Service updated successfully.',

            'data' =>
            new ServiceResource(
                $service->fresh()
            ),
        ]);
    }

    /**
     * Delete service
     */
    public function destroy(Service $service)
    {
        /*
        |--------------------------------------------------------------------------
        | DELETE UPLOADED ICON
        |--------------------------------------------------------------------------
        */

        if (
            $service->icon &&
            str_starts_with(
                $service->icon,
                'icons/services/'
            ) &&
            Storage::disk('public')->exists(
                $service->icon
            )
        ) {
            Storage::disk('public')->delete(
                $service->icon
            );
        }

        /*
        |--------------------------------------------------------------------------
        | DELETE SERVICE
        |--------------------------------------------------------------------------
        */

        $service->delete();

        return response()->json([
            'message' =>
            'Service deleted successfully.',
        ]);
    }
}
