<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Mod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ModController extends Controller
{

    public function create() {
        if (auth()->user()->cant('create mods')) {abort(403);}
        return Inertia::render('Mods/Create');
    }

    public function store(Request $request) {
        if (auth()->user()->cant('create mods')) {abort(403);}
        $request->validate([
            'name' => 'required|unique:'.Mod::class,
            'description' => 'required',
            'image' => 'required|image',
            'file' => 'required|file',
            'category_id' => 'required',
            'game_id' => 'required',
        ]);

        $modName = str_replace(' ', '_', $request->name);

        $dir = 'public/mods/'.$modName;

        Storage::putFileAs($dir, $request->file('image'), 'image.jpg');
        $imagePath = Storage::url($dir.'/image.jpg');

        Storage::put($dir, $request->file('file'));
        $filePath = Storage::url($dir.'/'.$request->file('file'));

        Mod::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => url($imagePath),
            'file' => url($filePath),
            'category_id' => $request->category_id,
            'game_id' => $request->game_id,
            'user_id' => auth()->user()->id,
        ]);

        return Redirect::route('mods.index');
    }

    public function show($username, $name) {
        $mod = Mod::where('name', $name)->first();
        $game = Game::find($mod->game_id);
        $creator = User::find($mod->user_id);
        return Inertia::render('Mods/Show', [
            'mod' => $mod,
            'game' => $game,
            'creator' => $creator
        ]);
    }

}
