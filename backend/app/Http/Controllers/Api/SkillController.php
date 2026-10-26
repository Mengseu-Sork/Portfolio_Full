<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::query()
            ->orderBy('id', 'desc')
            ->get();

        return SkillResource::collection($skills);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'category' => [
                'nullable',
                'string',
                'max:255',
            ],

            'percentage' => [
                'nullable',
                'integer',
                'min:0',
                'max:100',
            ],

            'icon' => [
                'nullable',
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

        // New icon
        if ($request->hasFile('icon')) {
            $validated['icon'] =
                $request
                ->file('icon')
                ->store(
                    'icons/skills',
                    'public'
                );
        }

        $skill = Skill::create($validated);

        return response()->json([
            'message' =>
            'Skill created successfully.',

            'data' =>
            new SkillResource($skill),
        ], 201);
    }

    public function show(Skill $skill)
    {
        return response()->json([
            'data' =>
            new SkillResource($skill),
        ]);
    }

    public function update(
        Request $request,
        Skill $skill
    ) {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'category' => [
                'nullable',
                'string',
                'max:255',
            ],

            'percentage' => [
                'nullable',
                'integer',
                'min:0',
                'max:100',
            ],

            // IMPORTANT:
            // Do not use string here.
            'icon' => [
                'nullable',
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

        if ($request->hasFile('icon')) {

            // Remove old uploaded icon
            if (
                $skill->icon &&
                str_starts_with(
                    $skill->icon,
                    'icons/skills/'
                ) &&
                Storage::disk('public')->exists(
                    $skill->icon
                )
            ) {
                Storage::disk('public')->delete(
                    $skill->icon
                );
            }

            // Store new icon
            $validated['icon'] =
                $request
                ->file('icon')
                ->store(
                    'icons/skills',
                    'public'
                );
        } else {
            /*
             * Very important:
             * if no new icon is selected,
             * preserve the current icon.
             */
            unset($validated['icon']);
        }

        $skill->update($validated);

        return response()->json([
            'message' =>
            'Skill updated successfully.',

            'data' =>
            new SkillResource(
                $skill->fresh()
            ),
        ]);
    }

    public function destroy(Skill $skill)
    {
        if (
            $skill->icon &&
            str_starts_with(
                $skill->icon,
                'icons/skills/'
            ) &&
            Storage::disk('public')->exists(
                $skill->icon
            )
        ) {
            Storage::disk('public')->delete(
                $skill->icon
            );
        }

        $skill->delete();

        return response()->json([
            'message' =>
            'Skill deleted successfully.',
        ]);
    }
}
