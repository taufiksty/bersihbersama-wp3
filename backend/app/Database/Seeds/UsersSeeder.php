<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use DateTime;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $date = new DateTime('now');
        for ($i = 0; $i < 5; $i++) {
            $faker = \Faker\Factory::create('id_ID');
            $data = [
                'id' => uniqid('user-'),
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => password_hash('password', PASSWORD_DEFAULT),
                'address' => $faker->address,
                'district' => 'Limo',
                'city' => $faker->city,
                'province' => 'Jawa Barat',
                'sm_account' => $faker->userName,
                'role' => '2',
                'image' => 'default.png',
                'created_at' => $date->format('Y-m-d H:i:s'),
                'updated_at' => $date->format('Y-m-d H:i:s')
            ];

            $this->db->table('Users')->insert($data);
        }
    }
}
