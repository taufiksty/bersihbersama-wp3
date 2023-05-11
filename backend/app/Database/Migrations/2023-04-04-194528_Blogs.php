<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Blogs extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'CHAR',
                'constraint' => 50,
            ],
            'title' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'excerpt' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'content' => [
                'type' => 'LONGTEXT',
                'null' => false
            ],
            'user_id' => [
                'type' => 'CHAR',
                'constraint' => 50,
            ],
            'category' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'image' => [
                'type' => 'VARCHAR',
                'constraint' => 225,
                'null' => false
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => false
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => false
            ],

        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('user_id','Users','id','CASCADE','CASCADE');
        $this->forge->createTable('Blogs', true);
    }

    public function down()
    {
        $this->forge->dropTable('Blogs');
    }
}
