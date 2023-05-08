<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Events extends Migration
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
                'null' => false,
            ],
            'description' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false
            ],
            'date' => [
                'type' => 'DATE',
                'null' => false
            ],
            'total_people' => [
                'type' => 'INT',
                'constraint' => 5,
                'null' => false
            ],
            'address' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'district' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'city' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'province' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'link_map' => [
                'type' => 'TEXT',
                'null' => false
            ],
            'images' => [
                'type' => 'LONGTEXT',
                'null' => false
            ],
            'done' => [
                'type' => 'ENUM',
                'constraint' => ['0', '1'],
                'null' => false
            ],
            'link_groupwa' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false
            ],
            'images_done' => [
                'type' => 'LONGTEXT',
                'null' => true
            ],
            'created_at' => [
                'type' => 'DATETIME',
            ],
            'updated_at' => [
                'type' => 'DATETIME',
            ]
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('Events', true);
    }

    public function down()
    {

        $this->forge->dropTable('Events');
    }
}
