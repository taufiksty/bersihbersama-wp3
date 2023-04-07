<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use DateTime;

class ReportsSeeder extends Seeder
{
    public function run()
    {
        $date = new DateTime('now');
        for ($i = 0; $i < 5; $i++) {
            $faker = \Faker\Factory::create('id_ID');
            $data = [
                'title' => $faker->title,
                'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis vel illo veritatis tempore dolorum ipsa?',
                'address' => $faker->address,
                'district' => 'Limo',
                'city' => $faker->city,
                'province' => 'Jawa Barat',
                'user_id' => '1',
                'link_map' => 'https://www.google.co.id/maps/place/Ayam+Goreng+Berkah/@-6.2471344,106.8040543,16z/data=!4m6!3m5!1s0x2e69f190c01445bb:0xba3980c630d6dfe9!8m2!3d-6.2467541!4d106.8020534!16s%2Fg%2F1v3y55v_',
                'images' => 'default.png',
                'status' => '0',
                'created_at' => $date->format('Y-m-d H:i:s'),
                'updated_at' => $date->format('Y-m-d H:i:s')
            ];

            $this->db->table('Events')->insert($data);
        }
    }
}