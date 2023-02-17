<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'admin']);
        Role::create(['name' => 'writer']);
        Role::create(['name' => 'user']);

        Permission::create(['name' => 'edit articles']);

        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@test.local',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ])->assignRole('writer', 'admin');

        $writer = User::create([
            'name' => 'writer',
            'email' => 'writer@test.local',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ])->assignRole('writer');        

        $writer->givePermissionTo('edit articles');

    }
}
