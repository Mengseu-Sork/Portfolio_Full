<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\SocialLinkController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\AuthController;



Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

Route::get('/profile', [ProfileController::class, 'index']);

Route::get('/skills', [SkillController::class, 'index']);

Route::get('/services', [ServiceController::class, 'index']);

Route::get('/projects', [ProjectController::class, 'index']);

Route::get('/projects/{project}', [ProjectController::class, 'show'])->whereNumber('project');

Route::get('/experiences', [ExperienceController::class, 'index']);

Route::get('/educations', [EducationController::class, 'index']);

Route::get('/certificates', [CertificateController::class, 'index']);

Route::get('/articles', [ArticleController::class, 'index']);

Route::get('/articles/{article}', [ArticleController::class, 'show'])->whereNumber('article');

Route::get('/social-links', [SocialLinkController::class, 'index']);

Route::post('/contact', [ContactMessageController::class, 'store'])->middleware('throttle:contact');


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('admin/projects', ProjectController::class);

    Route::apiResource('admin/skills', SkillController::class);

    Route::apiResource('admin/services', ServiceController::class);

    Route::apiResource('admin/experiences', ExperienceController::class);

    Route::apiResource('admin/educations', EducationController::class);

    Route::apiResource('admin/certificates', CertificateController::class);

    Route::apiResource('admin/articles', ArticleController::class);

    Route::apiResource('admin/social-links', SocialLinkController::class);

    Route::get('/admin/profile/{profile}', [ProfileController::class, 'show']);

    Route::post('/admin/profile', [ProfileController::class, 'store']);

    Route::put('/admin/profile/{profile}', [ProfileController::class, 'update']);

    Route::patch('/admin/profile/{profile}', [ProfileController::class, 'update']);

    Route::delete('/admin/profile/{profile}', [ProfileController::class, 'destroy']);


    Route::get('/admin/contact-messages', [ContactMessageController::class, 'index']);

    Route::get('/admin/contact-messages/{contactMessage}', [ContactMessageController::class, 'show']);

    Route::delete('/admin/contact-messages/{contactMessage}', [ContactMessageController::class, 'destroy']);
});
