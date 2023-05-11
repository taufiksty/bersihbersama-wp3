<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Reports;
use CodeIgniter\API\ResponseTrait;
use DateTime;

class ReportsController extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $search = $this->request->getVar('search');
        if (!is_null($search)) {
            $db_report = new Reports;
            $report = $db_report->search($search)->orderBy('status', 'DESCENDING')->orderBy('created_at', 'DESCENDING')->findAll();

            return $this->respond(['success' => true, 'data' => $report], 200, 'OK');
        }

        $user_id = $this->request->getVar('user_id');
        if (!is_null($user_id)) {
            $db_report = new Reports;
            $report = $db_report->searchByUserId($user_id)->orderBy('status', 'DESCENDING')->orderBy('created_at', 'DESCENDING')->findAll();

            return $this->respond(['success' => true, 'data' => $report], 200, 'OK');
        }

        $db_reports = new Reports;
        $reports = $db_reports->orderBy('status', 'DESCENDING')->orderBy('created_at', 'DESCENDING')->findAll();

        $count_accepted = 0;
        foreach ($reports as $report) {
            if ($report['status'] == 1) $count_accepted++;
        }

        return $this->respond(['success' => true, 'data' => $reports, 'count_accepted' => $count_accepted, 'count_not_accepted' => count($reports) - $count_accepted, 'total_reports' => count($reports)], 200, 'OK');
    }

    public function create()
    {
        if (!$this->validate([
            'image[]' => 'uploaded[image]|max_size[image,4096]|is_image[image]'
        ])) {
            return $this->respond(['success' => false, 'image' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
        }

        $data = json_decode($this->request->getVar('data'));
        $images = $_FILES['image'];

        $imagesName = [];

        $dateTime = new DateTime();
        $currentDateTime = $dateTime->format('Y-m-d;H:i:s');

        for ($i = 0; $i < count($images['name']); $i++) {
            $imageNameBeforeFormatted = $images['name'][$i];
            $imagesName[] = "$currentDateTime-$imageNameBeforeFormatted";
            move_uploaded_file($images['tmp_name'][$i], 'images/reports/' . $imagesName[$i]);
        }

        $data_insert = [
            'id' => uniqid('report-'),
            'title' => $data->title,
            'description' => $data->description,
            'address' => $data->address,
            'district' => $data->district,
            'city' => $data->city,
            'province' => $data->province,
            'user_id' => $data->user_id,
            'link_map' => $data->link_map,
            'status' => 0,
            'images' => json_encode($imagesName)
        ];

        $db_reports = new reports;
        $db_reports->insert($data_insert);

        return $this->respondCreated(['success' => true], 'OK');
    }

    public function show($id = null)
    {
        $db_reports = new Reports;
        $reports = $db_reports->where('id', $id)->first();

        if (!$reports) {
            return $this->respond(['success' => false, 'data' => $reports], 404, 'USER NOT FOUND');
        }

        return $this->respond(['success' => true, 'data' => $reports], 200, 'OK');
    }

    public function update($id = null)
    {
        helper(['form']);
        $data = json_decode($this->request->getVar('data'));
        $images = $_FILES['image'];

        if (!$this->validate([
            'image' => 'uploaded[image]|max_size[image,2048]|is_image[image]'
        ])) {
            return $this->respond(['success' => false, 'image' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
        }

        $db_reports = new Reports;
        $report = $db_reports->where('id', $id)->first();

        if (!$report) {
            return $this->respond(['success' => false, 'data' => null], 404, 'REPORT NOT FOUND');
        }

        $imageArray = json_decode($report['images']);

        if ($images) {
            if ($report['images']) {
                for ($i = 0; $i < count($imageArray); $i++) {
                    unlink('images/reports/' . $imageArray[$i]);
                }
            }

            $dateTime = new DateTime();
            $currentDateTime = $dateTime->format('Y-m-d;H:i:s');

            $imagesName = [];
            for ($i = 0; $i < count($images['name']); $i++) {
                $imageNameBeforeFormatted = $images['name'][$i];
                $imagesName[] = "$currentDateTime-$imageNameBeforeFormatted";
                move_uploaded_file($images['tmp_name'][$i], 'images/reports/' . $imagesName[$i]);
            }
        } else {
            $imagesName = [];
        }

        $data_update = [
            'id' => $report['id'],
            'title' => $data->title,
            'description' => $data->description,
            'address' => $data->address,
            'district' => $data->district,
            'city' => $data->city,
            'province' => $data->province,
            'user_id' => $data->user_id,
            'link_map' => $data->link_map,
            'images' => json_encode($imagesName),
            'status' => $data->status
        ];

        $db_reports->update($id, $data_update);

        return $this->respondUpdated(['success' => true], 'OK');
    }

    public function delete($id = null)
    {
        $db_report = new reports;
        $report = $db_report->where('id', $id)->first();

        if (!$report) {
            return $this->respond(['success' => false, 'data' => null], 404, 'REPORT NOT FOUND');
        }

        $imageArray = json_decode($report['images']);

        if ($report['images']) {
            for ($i = 0; $i < count($imageArray); $i++) {
                unlink('images/reports/' . $imageArray[$i]);
            }
        }

        $db_report->where('id', $id)->delete();

        return $this->respondDeleted(['success' => true], 'OK');
    }
}
