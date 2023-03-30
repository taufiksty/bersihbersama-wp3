<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
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
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false
            ],
            'email' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false
            ],
            'password' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => false
            ],
            'address' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true
            ],
            'district' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true
            ],
            'city' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true
            ],
            'province' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true
            ],
            'sm_account' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => true
            ],
            'role' => [
                'type' => 'ENUM',
                'constraint' => ['1', '2'],
                'default' => '2'
            ],
            'image' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'default' => 'profileDefault.png'
            ],
            'created_at' => [
                'type' => 'DATETIME',
            ],
            'updated_at' => [
                'type' => 'DATETIME',
            ]
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('Users', true);
    }

    public function down()
    {
        $this->forge->dropTable('Users');
    }
}
