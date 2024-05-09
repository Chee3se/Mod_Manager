<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // index
    Route::get('/games', [GameController::class, 'index'])->name('games.index');

    // Create
    Route::get('/games/create', [GameController::class, 'create'])->name('games.create');
    Route::post('/games', [GameController::class, 'store'])->name('games.store');

    // Read
    Route::get('/games/{name}', [GameController::class, 'show'])->name('games.show');

    // Update
    Route::get('/games/{name}/edit', [GameController::class, 'edit'])->name('games.edit');
    Route::put('/games/{name}', [GameController::class, 'update'])->name('games.update');

    // Delete
    Route::delete('/games/{name}', [GameController::class, 'destroy'])->name('games.destroy');
});
