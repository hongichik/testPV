<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $p_edit_user = Permission::create([
            'name' => 'Chỉnh sửa tài khoản',
            'slug' => 'edit_user',
        ]);

        $p_view_all_user = Permission::create([
            'name' => 'Xem danh sách tài khoản',
            'slug' => 'view_all_user',
        ]);

        $p_view_user = Permission::create([
            'name' => 'Xem thông tin tài khoản',
            'slug' => 'view_user',
        ]);
        $p_delete_user = Permission::create([
            'name' => 'Xóa tài khoản',
            'slug' => 'delete_user',
        ]);

        $r_admin = Role::create([
            'name' => 'admin',
            'slug' => 'admin'
        ]);
        $r_mod = Role::create([
            'name' => 'mod',
            'slug' => 'mod'
        ]);
        $r_user = Role::create([
            'name' => 'user',
            'slug' => 'user'
        ]);
        $r_guide = Role::create([
            'name' => 'guide',
            'slug' => 'guide'
        ]);

        // Vai trò admin có quyền xóa
        $r_admin->permissions()->attach([$p_edit_user->id]);
        $r_admin->permissions()->attach([$p_view_all_user->id]);
        $r_admin->permissions()->attach([$p_view_user->id]);
        $r_admin->permissions()->attach([$p_delete_user->id]);

        // Vai trò mod có quyền chỉnh sửa
        $r_mod->permissions()->attach([$p_edit_user->id]);
        $r_mod->permissions()->attach([$p_view_all_user->id]);
        $r_mod->permissions()->attach([$p_view_user->id]);


        // Vai trò user login có quyền xem thông tin khách hàng
        $r_user->permissions()->attach([$p_view_user->id]);
        $r_user->permissions()->attach([$p_view_all_user->id]);

        // Vai trò guide có quyền xem danh sách khách hàng
        $r_guide->permissions()->attach([$p_view_all_user->id]);



        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456789'),
            'role_id' => $r_admin->id
        ]);
        User::create([
            'name' => 'mod',
            'email' => 'mod@gmail.com',
            'password' => Hash::make('123456789'),
            'role_id' => $r_mod->id
        ]);
        User::create([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'password' => Hash::make('123456789'),
            'role_id' => $r_user->id
        ]);
        User::create([
            'name' => 'guide',
            'email' => 'guide@gmail.com',
            'password' => Hash::make('123456789'),
            'role_id' => $r_guide->id
        ]);
    }
}
