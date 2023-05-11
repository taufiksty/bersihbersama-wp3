<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Reports extends Migration
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
            'description' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false
            ],
            'address' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true,
                'default' => null
            ],
            'district' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true,
                'default' => null
            ],
            'city' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true,
                'default' => null
            ],
            'province' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true,
                'default' => null
            ],
            'user_id' => [
                'type' => 'CHAR',
                'constraint' => 50,
            ],
            'link_map' => [
                'type' => 'TEXT',
                'null' => false
            ],
            'images' => [
                'type' => 'LONGTEXT',
                'null' => false
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['0', '1'],
                'default' => null
            ],
            'created_at' => [
                'type' => 'DATETIME',
            ],
            'updated_at' => [
                'type' => 'DATETIME',
            ]

        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('user_id', 'Users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('Reports', true);
    }

    public function down()
    {
        $this->forge->dropTable('Reports');
    }
}
