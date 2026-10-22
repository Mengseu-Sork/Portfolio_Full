<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExperienceResource;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::query()
            ->orderByDesc('is_current')
            ->orderByDesc('start_date')
            ->orderBy('sort_order')
            ->get();

        return ExperienceResource::collection($experiences);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],
            'is_current' => ['nullable', 'boolean'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $experience = Experience::create($validated);

        return response()->json([
            'message' => 'Experience created successfully.',
            'data' => new ExperienceResource($experience),
        ], 201);
    }

    public function show(Experience $experience)
    {
        return new ExperienceResource($experience);
    }

    public function update(
        Request $request,
        Experience $experience
    ) {
        $validated = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],
            'is_current' => ['nullable', 'boolean'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $experience->update($validated);

        return response()->json([
            'message' => 'Experience updated successfully.',
            'data' => new ExperienceResource(
                $experience->fresh()
            ),
        ]);
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return response()->json([
            'message' => 'Experience deleted successfully.',
        ]);
    }
}
