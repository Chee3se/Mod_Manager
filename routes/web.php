<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/games', function () {

})->middleware(['auth', 'verified'])->name('games');

Route::middleware(['auth', 'verified'])->group(function () {
    // index
    Route::get('/games', [GameController::class, 'index'])->name('games.index');

    // Create
    Route::get('/games/create', [GameController::class, 'create'])->name('games.create');
    Route::post('/games', [GameController::class, 'store'])->name('games.store');

    // Read
    Route::get('/games/{id}', [GameController::class, 'show'])->name('games.show');

    // Update
    Route::get('/games/{id}/edit', [GameController::class, 'edit'])->name('games.edit');
    Route::put('/games/{id}', [GameController::class, 'update'])->name('games.update');

    // Delete
    Route::delete('/games/{id}', [GameController::class, 'destroy'])->name('games.destroy');
});

require __DIR__.'/auth.php';
