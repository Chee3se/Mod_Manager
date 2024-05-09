<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Mod;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GameController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Games/Index', [
            'games' => Game::all()
        ]);
    }

    public function create(): Response
    {
        if (auth()->user()->cant('create games')) {abort(403);}
        return Inertia::render('Games/Create');
    }

    public function store(User $user, Request $request): RedirectResponse
    {
        if (auth()->user()->cant('create games')) {abort(403);}
        $request->validate([
            'name' => 'required|unique:'.Game::class,
            'image' => 'required|image',
            'background_image' => 'required|image',
        ]);

        $gameName = str_replace(' ', '_', $request->name);
        $dir = 'public/games/'.$gameName;

        Storage::putFileAs($dir, $request->file('image'), 'image.jpg');
        $imagePath = Storage::url($dir.'/image.jpg');

        Storage::putFileAs($dir, $request->file('background_image'), 'background_image.jpg');
        $backgroundImagePath = Storage::url($dir.'/background_image.jpg');

        // Create a new game instance with the full URLs of the stored images
        Game::create([
            'name' => $request->name,
            'image' => url($imagePath),
            'background_image' => url($backgroundImagePath),
        ]);

        return Redirect::route('games.index');
    }

    public function show($name): Response
    {
        $game = Game::where('name', $name)->first();

        $mods = Mod::where('game_id', $game->id)->get();

        return Inertia::render('Games/Show', [
            'game' => $game,
            'mods' => $mods
        ]);
    }

    public function edit($name): Response
    {
        if (auth()->user()->cant('edit games')) {abort(403);}
        $game = Game::where('name', $name)->first();

        return Inertia::render('Games/Edit', [
            'game' => $game
        ]);
    }

    public function update(Request $request, $name): RedirectResponse
    {
        if (auth()->user()->cant('edit games')) {abort(403);}
        $request->validate([
            'name' => 'required',
        ]);

        $game = Game::where('name', $name)->first();

        if ($request->hasFile('image')) {
            Storage::delete('public/games/'.$name.'/image.jpg');
            Storage::putFileAs('public/games/'.$name, $request->file('image'), 'image.jpg');
            $imagePath = Storage::url('public/games/'.$name.'/image.jpg');
            $game->image = url($imagePath);
        }

        if ($request->hasFile('background_image')) {
            Storage::delete('public/games/'.$name.'/background_image.jpg');
            Storage::putFileAs('public/games/'.$name, $request->file('background_image'), 'background_image.jpg');
            $backgroundImagePath = Storage::url('public/games/'.$name.'/background_image.jpg');
            $game->background_image = url($backgroundImagePath);
        }

        $game->name = $request->name;

        $game->save();

        return Redirect::route('games.index');
    }

    public function destroy($name): RedirectResponse
    {
        if (auth()->user()->cant('delete games')) {abort(403);}

        $game = Game::where('name', $name)->first();
        $game->delete();

        Storage::deleteDirectory('public/games/'.$name);

        return Redirect::route('games.index');
    }

}
