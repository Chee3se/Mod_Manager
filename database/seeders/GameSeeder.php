<?php

namespace Database\Seeders;

use App\Models\Game;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed some games
        Game::create([
            'name' => 'Content Warning',
            'image' => '/images/CW_image.png',
            'background_image' => '/images/CW_background_image.png',
        ]);
    }
}
