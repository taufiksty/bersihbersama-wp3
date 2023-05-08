<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Blogs extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 5,
                'unsigned' => true,
                'auto_increment' => true
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
                'type' => 'INT',
                'constraint' => 5,
                'null' => false,
                'unsigned' => true
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
