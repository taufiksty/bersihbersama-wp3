<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Reports;
use App\Models\Events;

class StatusController extends BaseController
{
    protected $db;

    public function __construct()
    {
        $this->db = \Config\Database::connect();
    }

    public function index()
    {
        //
    }

    public function acceptReport($id)
    {
        $db_reports = new Reports;
        $report = $db_reports->where('id', $id)->first();

        if (!$report) return $this->response->setJSON(['success' => false, 'message' => 'Update failed. Id not found']);

        $data_update = [
            'title' => $report['title'],
            'description' => $report['description'],
            'address' => $report['address'],
            'district' => $report['district'],
            'city' => $report['city'],
            'province' => $report['province'],
            'user_id' => $report['user_id'],
            'link_map' => $report['link_map'],
            'images' => $report['images'],
            'status' => '1'
        ];

        $db_reports->update($id, $data_update);

        return $this->response->setJSON(['success' => true]);
    }

    public function finishEvent($id = null)
    {
        // $db_event = new Events;
        // $event = $db_event->where('id', $id)->first();
        $query_check = "SELECT * FROM Events WHERE id = {$id}";
        $event = $this->db->query($query_check)->getResult();

        if (!count($event)) {
            return $this->response->setJSON(['status' => 'fail', 'message' => 'Kegiatan tidak ditemukan'])->setStatusCode(404);
        }

        $images = $_FILES['image'];

        $imagesName = [];

        for ($i = 0; $i < count($images['name']); $i++) {
            $imagesName[] = $images['name'][$i];
            move_uploaded_file($images['tmp_name'][$i], 'images/events_done/' . $images['name'][$i]);
        }

        $imagesName_encode = json_encode($imagesName);
        $query_update = "UPDATE Events SET done = '1', images_done = '{$imagesName_encode}' WHERE id = {$id}";
        $this->db->query($query_update);
        // $data = [
        //     'done' => 1,
        //     'images_done' => json_encode($imagesName)
        // ];

        // $db_event->update($id, $data);

        return $this->response->setJSON(['status' => 'success', 'message' => 'Foto berhasil ditambahkan. Kegiatan selesai dikonfirmasi'])->setStatusCode(201);
    }
}
