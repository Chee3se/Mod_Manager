<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::create(['name' => 'admin']);
        $permissions = [
            Permission::create(['name' => 'create games']),
            Permission::create(['name' => 'edit games']),
            Permission::create(['name' => 'delete games']),
            Permission::create(['name' => 'create mods']),
            Permission::create(['name' => 'edit mods']),
            Permission::create(['name' => 'delete mods']),
            Permission::create(['name' => 'create categories']),
            Permission::create(['name' => 'edit categories']),
            Permission::create(['name' => 'delete categories']),
        ];
        $role->syncPermissions($permissions);
    }
}
