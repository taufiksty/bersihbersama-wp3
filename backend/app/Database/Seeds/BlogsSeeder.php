<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use DateTime;

class BlogsSeeder extends Seeder
{
    public function run()
    {
        $date = new DateTime('now');
        for ($i = 0; $i < 5; $i++) {
            $faker = \Faker\Factory::create('id_ID');
            $data = [
                'title' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                'excerpt' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti nisi asperiores perspiciatis recusandae pariatur nesciunt.',
                'content' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ad sed error ex vitae quis at odit vero assumenda nam tempore, nostrum quam corrupti magni repellat. Quos iure sint amet ratione iste rem, architecto laborum suscipit mollitia nesciunt magni facere, natus odit placeat dolore nam sequi eaque? Quaerat, sed. Consequuntur pariatur sint sunt iure quidem inventore assumenda odio, nobis temporibus commodi voluptatem eligendi natus aspernatur ipsa harum sequi nisi accusamus quis. Eius magnam enim nam, eaque omnis laborum! Praesentium corrupti dignissimos accusamus obcaecati consequatur assumenda vero eaque provident molestias blanditiis veniam enim mollitia ea porro, in facilis hic quaerat? Odit aperiam, ad inventore soluta sit sed, ducimus asperiores delectus cupiditate accusantium minima temporibus facere assumenda ut, commodi eligendi veritatis qui ullam quo voluptate ipsa labore iusto? Pariatur reprehenderit consequatur vel odit officiis voluptas dolore asperiores ipsum soluta facere, a dolorum sequi vero autem rerum deleniti nobis ratione at porro. Quia.',
                'user_id' => 1,
                'category' => 'artikel',
                'image' => 'default.jpg',
                'created_at' => $date->format('Y-m-d H:i:s'),
                'updated_at' => $date->format('Y-m-d H:i:s')
            ];

            $this->db->table('Blogs')->insert($data);
        }
    }
}
