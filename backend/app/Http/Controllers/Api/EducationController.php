<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EducationResource;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function index()
    {
        $educations = Education::query()
            ->orderBy('sort_order')
            ->orderByDesc('end_date')
            ->get();

        return EducationResource::collection($educations);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'field_of_study' => ['nullable', 'string', 'max:255'],
            'start_date' => ['nullable', 'date'],
            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $education = Education::create($validated);

        return response()->json([
            'message' => 'Education created successfully.',
            'data' => new EducationResource($education),
        ], 201);
    }

    public function show(Education $education)
    {
        return new EducationResource($education);
    }

    public function update(
        Request $request,
        Education $education
    ) {
        $validated = $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'field_of_study' => ['nullable', 'string', 'max:255'],
            'start_date' => ['nullable', 'date'],
            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer'],
        ]);

        $education->update($validated);

        return response()->json([
            'message' => 'Education updated successfully.',
            'data' => new EducationResource(
                $education->fresh()
            ),
        ]);
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return response()->json([
            'message' => 'Education deleted successfully.',
        ]);
    }
}
