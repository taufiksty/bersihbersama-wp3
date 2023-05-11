<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class PartisipantEvent extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'CHAR',
                'constraint' => 50,
            ],
            'event_id' => [
                'type' => 'CHAR',
                'constraint' => 50,
                'null' => false
            ],
            'user_id' => [
                'type' => 'CHAR',
                'constraint' => 50,
                'null' => false
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
