<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Get the portfolio profile.
     */
     public function index()
    {
        $profile = Profile::first();

        if (!$profile) {
            return response()->json([
                'data' => null,
            ], 200);
        }

        return response()->json([
            'data' => new ProfileResource($profile),
        ], 200);
    }

    /**
     * Create the portfolio profile.
     *
     * Only one profile is allowed.
     */
    public function store(Request $request)
    {
        if (Profile::exists()) {
            return response()->json([
                'message' => 'Profile already exists. Use update instead.',
            ], 409);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'short_bio' => ['nullable', 'string'],
            'bio' => ['nullable', 'string'],

            'profile_image' => [
                'nullable',
                'image',
                'max:5120',
            ],

            'resume' => [
                'nullable',
                'file',
                'mimes:pdf',
                'max:10240',
            ],

            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
            'availability' => ['nullable', 'string', 'max:255'],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Profile Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('profile_image')) {
            $validated['profile_image'] = $request
                ->file('profile_image')
                ->store('profile', 'public');
        }

        /*
        |--------------------------------------------------------------------------
        | Resume
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('resume')) {
            $validated['resume'] = $request
                ->file('resume')
                ->store('resume', 'public');
        }

        /*
        |--------------------------------------------------------------------------
        | Create Profile
        |--------------------------------------------------------------------------
        */

        $profile = Profile::create($validated);

        return response()->json([
            'message' => 'Profile created successfully.',
            'data' => new ProfileResource($profile),
        ], 201);
    }

    /**
     * Get the profile.
     *
     * Profile is a singleton, so no ID is required.
     */
    public function show()
    {
        $profile = Profile::first();

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found.',
            ], 404);
        }

        return new ProfileResource($profile);
    }

    /**
     * Update the portfolio profile.
     */
    public function update(Request $request)
    {
        $profile = Profile::first();

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found.',
            ], 404);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'short_bio' => ['nullable', 'string'],
            'bio' => ['nullable', 'string'],

            'profile_image' => [
                'nullable',
                'image',
                'max:5120',
            ],

            'resume' => [
                'nullable',
                'file',
                'mimes:pdf',
                'max:10240',
            ],

            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
            'availability' => ['nullable', 'string', 'max:255'],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Replace Profile Image
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('profile_image')) {

            if ($profile->profile_image) {
                Storage::disk('public')->delete(
                    $profile->profile_image
                );
            }

            $validated['profile_image'] = $request
                ->file('profile_image')
                ->store('profile', 'public');
        }

        /*
        |--------------------------------------------------------------------------
        | Replace Resume
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('resume')) {

            if ($profile->resume) {
                Storage::disk('public')->delete(
                    $profile->resume
                );
            }

            $validated['resume'] = $request
                ->file('resume')
                ->store('resume', 'public');
        }

        /*
        |--------------------------------------------------------------------------
        | Update Profile
        |--------------------------------------------------------------------------
        */

        $profile->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'data' => new ProfileResource(
                $profile->fresh()
            ),
        ]);
    }

    /**
     * Delete the portfolio profile.
     */
    public function destroy()
    {
        $profile = Profile::first();

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found.',
            ], 404);
        }

        /*
        |--------------------------------------------------------------------------
        | Delete Profile Image
        |--------------------------------------------------------------------------
        */

        if ($profile->profile_image) {
            Storage::disk('public')->delete(
                $profile->profile_image
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Delete Resume
        |--------------------------------------------------------------------------
        */

        if ($profile->resume) {
            Storage::disk('public')->delete(
                $profile->resume
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Delete Profile
        |--------------------------------------------------------------------------
        */

        $profile->delete();

        return response()->json([
            'message' => 'Profile deleted successfully.',
        ]);
    }
}
