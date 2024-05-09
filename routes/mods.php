<?php

use App\Http\Controllers\ModController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Create
    Route::get('/mods/create', [ModController::class, 'create'])->name('mods.create');
    Route::post('/mods', [ModController::class, 'store'])->name('mods.store');

    // Read
    Route::get('/mods/{username}/{name}', [ModController::class, 'show'])->name('mods.show');

    // Update
    Route::get('/mods/{username}/{name}/edit', [ModController::class, 'edit'])->name('mods.edit');
    Route::put('/mods/{username}/{name}', [ModController::class, 'update'])->name('mods.update');

    // Delete
    Route::delete('/games/{username}/{name}', [ModController::class, 'destroy'])->name('mods.destroy');
});
