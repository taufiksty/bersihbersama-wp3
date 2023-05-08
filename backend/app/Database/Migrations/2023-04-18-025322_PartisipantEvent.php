<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class PartisipantEvent extends Migration
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
            'event_id' => [
                'type' => 'INT',
                'constraint' => 5,
                'null' => false,
                'unsigned' => true,
            ],
            'user_id' => [
                'type' => 'INT',
                'constraint' => 5,
                'null' => false,
                'unsigned' => true
            ],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('event_id', 'Events', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('user_id', 'Users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('Partisipant_Event', true);
    }

    public function down()
    {
        $this->forge->dropTable('Partisipant_Event');
    }
}
