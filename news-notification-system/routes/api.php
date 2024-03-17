<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(NewsController::class)->group(function () {
    Route::get('/news','index');
    Route::get('/news/{id}', 'show');
    Route::post('/news', 'store');
    Route::put('/news/{id}', 'update');
    Route::delete('/news/{id}', 'delete');
});
