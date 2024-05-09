<?php

namespace Database\Seeders;

use App\Models\Mod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mod::create([
            'name' => 'some mod',
            'description' => 'some description',
            'image' => '/images/icon.png',
            'file' => '/images/icon.png',
            'game_id' => 1,
            'user_id' => 1,
        ]);
    }
}
