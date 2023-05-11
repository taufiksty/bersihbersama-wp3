<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class PartisipantEventController extends BaseController
{
    protected $db;
    protected $validation;

    public function __construct()
    {
        $this->db = \Config\Database::connect();
        $this->validation = \Config\Services::validation();
    }

    private function verifyUserInAnEvent($eventId, $userId)
    {
        $query = "SELECT * FROM Partisipant_Event WHERE event_id = {$eventId} AND user_id = {$userId}";
        $result = $this->db->query($query)->getResult();

        if (!count($result)) {
            return false;
        } else {
            return true;
        }
    }

    public function checkUserInAnEvent($eventId, $userId)
    {
        $query = "SELECT * FROM Partisipant_Event WHERE event_id = {$eventId} AND user_id = {$userId}";
        $result = $this->db->query($query)->getResult();

        if (count($result) > 0) {
            return $this->response->setJSON([
                'status' => 'success',
                'data' => true
            ])->setStatusCode(200);
        } else {
            return $this->response->setJSON([
                'status' => 'success',
                'data' => false
            ])->setStatusCode(200);
        }
    }

    public function joinEvent($eventId)
    {
        $data = [
            'eventId' => $eventId,
            'userId' => $this->request->getVar('userId')
        ];

        $rules = [
            'eventId' => 'required',
            'userId' => 'required'
        ];

        if (!$this->validation->setRules($rules)->run($data)) {
            $errors = $this->validation->getErrors();

            return $this->response->setJSON([
                'status' => 'fail',
                'message' => $errors
            ])->setStatusCode(400);
        }

        if ($this->verifyUserInAnEvent($eventId, $data['userId'])) {
            return $this->response->setJSON([
                'status' => 'fail',
                'error' => 'InvariantError',
                'message' => 'Partisipan sudah terdaftar'
            ])->setStatusCode(400);
        }

        $id = uniqid('part_event-');
        $query = "INSERT INTO Partisipant_Event (id, event_id, user_id) VALUES ({$id}, {$data['eventId']}, {$data['userId']})";
        $this->db->query($query);

        return $this->response->setJSON([
            'status' => 'success',
            'message' => 'Partisipan berhasil ditambahkan ke dalam kegiatan',
        ])->setStatusCode(201);
    }

    public function getEventsByUserJoined($userId)
    {
        $query = "SELECT * FROM Events RIGHT JOIN Partisipant_Event ON Partisipant_Event.event_id = Events.id WHERE Partisipant_Event.user_id = {$userId}";
        $result = $this->db->query($query)->getResult();

        return $this->response->setJSON([
            'status' => 'success',
            'data' => $result
        ])->setStatusCode(200);
    }

    public function getCountPartisipantByEvent($eventId)
    {
        $query = "SELECT COUNT(*) AS partisipant_count FROM Partisipant_Event WHERE event_id = {$eventId}";
        $result = $this->db->query($query)->getRow(0);

        return $this->response->setJSON([
            'status' => 'success',
            'data' => $result
        ])->setStatusCode(200);
    }
}
