<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    // =====================================================
    // PUBLIC
    // =====================================================

    public function index()
    {
        $projects = Project::query()
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return ProjectResource::collection(
            $projects
        );
    }

    public function show(Project $project)
    {
        if (!$project->is_active) {
            return response()->json([
                'message' =>
                'Project not found.',
            ], 404);
        }

        return response()->json([
            'data' =>
            new ProjectResource(
                $project
            ),
        ]);
    }


    // =====================================================
    // ADMIN CREATE
    // =====================================================

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            'short_description' => [
                'nullable',
                'string',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'technologies' => [
                'nullable',
                'array',
            ],

            'technologies.*' => [
                'nullable',
                'string',
                'max:100',
            ],

            'developer' => [
                'nullable',
                'string',
                'max:255',
            ],

            'duration' => [
                'nullable',
                'string',
                'max:100',
            ],

            'team' => [
                'nullable',
                'string',
                'max:100',
            ],

            'github_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'demo_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'is_featured' => [
                'nullable',
                'boolean',
            ],

            'is_active' => [
                'nullable',
                'boolean',
            ],

            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],
        ]);

        // Image
        if ($request->hasFile('image')) {
            $validated['image'] =
                $request
                ->file('image')
                ->store(
                    'projects',
                    'public'
                );
        }

        $project = Project::create(
            $validated
        );

        return response()->json([
            'message' =>
            'Project created successfully.',

            'data' =>
            new ProjectResource(
                $project
            ),
        ], 201);
    }


    // =====================================================
    // ADMIN UPDATE
    // =====================================================

    public function update(
        Request $request,
        Project $project
    ) {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'image' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],

            'short_description' => [
                'nullable',
                'string',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'technologies' => [
                'nullable',
                'array',
            ],

            'technologies.*' => [
                'nullable',
                'string',
                'max:100',
            ],

            'developer' => [
                'nullable',
                'string',
                'max:255',
            ],

            'duration' => [
                'nullable',
                'string',
                'max:100',
            ],

            'team' => [
                'nullable',
                'string',
                'max:100',
            ],

            'github_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'demo_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'is_featured' => [
                'nullable',
                'boolean',
            ],

            'is_active' => [
                'nullable',
                'boolean',
            ],

            'sort_order' => [
                'nullable',
                'integer',
                'min:0',
            ],
        ]);

        // New image
        if ($request->hasFile('image')) {

            if (
                $project->image &&
                Storage::disk('public')->exists(
                    $project->image
                )
            ) {
                Storage::disk('public')->delete(
                    $project->image
                );
            }

            $validated['image'] =
                $request
                ->file('image')
                ->store(
                    'projects',
                    'public'
                );
        } else {
            unset(
                $validated['image']
            );
        }

        $project->update(
            $validated
        );

        return response()->json([
            'message' =>
            'Project updated successfully.',

            'data' =>
            new ProjectResource(
                $project->fresh()
            ),
        ]);
    }


    // =====================================================
    // ADMIN DELETE
    // =====================================================

    public function destroy(
        Project $project
    ) {
        if (
            $project->image &&
            Storage::disk('public')->exists(
                $project->image
            )
        ) {
            Storage::disk('public')->delete(
                $project->image
            );
        }

        $project->delete();

        return response()->json([
            'message' =>
            'Project deleted successfully.',
        ]);
    }
}
