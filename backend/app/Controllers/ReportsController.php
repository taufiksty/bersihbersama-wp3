<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Reports;
use CodeIgniter\API\ResponseTrait;


class ReportsController extends ResourceController
{
    use ResponseTrait;

    public function index()
    {

        $db_reports = new Reports;
        $reports = $db_reports->get()->getResult();

        return $this->respond(['success' => true, 'data' => $reports], 200, 'OK');
    }

    public function create()
    {
        if (!$this->validate([
            'image' => 'uploaded[image]|max_size[image,2048]|is_image[image]'
        ])) {
            return $this->respond(['success' => false, 'image' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
        }

        $images = $_FILES['image'];

        $imagesName = [];

        for($i=0; $i<count($images['name']);$i++){
            $imagesName[] = $images['name'][$i]; 
            move_uploaded_file($images['tmp_name'][$i], 'images/reports/' . $images['name'][$i]);
        }
        
        $data_insert = [
            'title' => $this->request->getVar('title'),
            'description' => $this->request->getVar('description'),
            'date' => $this->request->getVar('date'),
            'address' => $this->request->getVar('address'),
            'district' => $this->request->getVar('district'),
            'city' => $this->request->getVar('city'),
            'province' => $this->request->getVar('province'),
            'user_id'=> $this->request->getVar('user_id'),
            'link_map' => $this->request->getVar('link_map' ),
            'images' => json_encode($imagesName),
            'status' => $this->request->getVar('status'),
        ];

        $db_reports = new reports;
        $save = $db_reports->insert($data_insert);

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
            return $this->respond(['success' => false, 'data' => null], 404, 'USER NOT FOUND');
        }

        $imageArray = json_decode($report['images']);

        if ($images) {
            if (!$report['images']) {
                
                $imagesName = [];
                for($i=0; $i<count($images['name']);$i++){
                    $imagesName[] = $images['name'][$i]; 
                    move_uploaded_file($images['tmp_name'][$i], 'images/reports/' . $images['name'][$i]);
                }
            } else {
                for($i=0; $i<count($imageArray); $i++){
                    unlink('images/reports/' . $imageArray[$i]);
                }
                
                $imagesName = [];
                for($i=0; $i<count($images['name']);$i++){
                    $imagesName[] = $images['name'][$i]; 
                    move_uploaded_file($images['tmp_name'][$i], 'images/reports/' . $images['name'][$i]);
                }
            }
        } else {
            $imagesName = [];
        }

        $data_update = [
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
            return $this->respond(['success' => false, 'data' => null], 404, 'report NOT FOUND');
        }

         $imageArray = json_decode($report['images']);

        if ($report['images']) {
            for($i=0; $i<count($imageArray); $i++){
                unlink('images/reports/' . $imageArray[$i]);
            }
        }

        $db_report->where('id', $id)->delete();

        return $this->respondDeleted(['success' => true], 'OK');
    }
}
