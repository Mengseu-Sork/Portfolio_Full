<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SocialLinkResource;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SocialLinkController extends Controller
{
    public function index()
    {
        $links = SocialLink::query()
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return SocialLinkResource::collection(
            $links
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'platform' => [
                'required',
                'string',
                'max:100',
            ],

            'url' => [
                'required',
                'url',
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
            $validated['icon'] =
                $request
                ->file('icon_file')
                ->store(
                    'icons/social-links',
                    'public'
                );
        }

        unset(
            $validated['icon_file']
        );

        $link =
            SocialLink::create(
                $validated
            );

        return response()->json([
            'message' =>
            'Social link created successfully.',

            'data' =>
            new SocialLinkResource(
                $link
            ),
        ], 201);
    }

    public function show(
        SocialLink $socialLink
    ) {
        return response()->json([
            'data' =>
            new SocialLinkResource(
                $socialLink
            ),
        ]);
    }

    public function update(
        Request $request,
        SocialLink $socialLink
    ) {
        $validated = $request->validate([
            'platform' => [
                'required',
                'string',
                'max:100',
            ],

            'url' => [
                'required',
                'url',
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
        | NEW ICON
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('icon_file')) {

            if (
                $socialLink->icon &&
                str_starts_with(
                    $socialLink->icon,
                    'icons/social-links/'
                ) &&
                Storage::disk('public')->exists(
                    $socialLink->icon
                )
            ) {
                Storage::disk('public')->delete(
                    $socialLink->icon
                );
            }

            $validated['icon'] =
                $request
                ->file('icon_file')
                ->store(
                    'icons/social-links',
                    'public'
                );
        } else {
            /*
             * Keep existing icon.
             */
            unset(
                $validated['icon']
            );
        }

        unset(
            $validated['icon_file']
        );

        $socialLink->update(
            $validated
        );

        return response()->json([
            'message' =>
            'Social link updated successfully.',

            'data' =>
            new SocialLinkResource(
                $socialLink->fresh()
            ),
        ]);
    }

    public function destroy(
        SocialLink $socialLink
    ) {
        if (
            $socialLink->icon &&
            str_starts_with(
                $socialLink->icon,
                'icons/social-links/'
            ) &&
            Storage::disk('public')->exists(
                $socialLink->icon
            )
        ) {
            Storage::disk('public')->delete(
                $socialLink->icon
            );
        }

        $socialLink->delete();

        return response()->json([
            'message' =>
            'Social link deleted successfully.',
        ]);
    }
}
