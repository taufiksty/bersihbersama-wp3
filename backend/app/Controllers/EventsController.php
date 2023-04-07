<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Events;
use CodeIgniter\API\ResponseTrait;


class EventsController extends ResourceController
{
    use ResponseTrait;

    public function index()
    {

        $db_events = new Events;
        $events = $db_events->get()->getResult();

        return $this->respond(['success' => true, 'data' => $events], 200, 'OK');
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
            move_uploaded_file($images['tmp_name'][$i], 'images/events/' . $images['name'][$i]);
        }
        
        $data_insert = [
            'title' => $this->request->getVar('title'),
            'description' => $this->request->getVar('description'),
            'date' => $this->request->getVar('date'),
            'total_people' => $this->request->getVar('total_people'),
            'address' => $this->request->getVar('address'),
            'district' => $this->request->getVar('district'),
            'city' => $this->request->getVar('city'),
            'province' => $this->request->getVar('province'),
            'link_map' => $this->request->getVar('link_map'),
            'images' => json_encode($imagesName), 
        ];

        $db_event = new Events;
        $save = $db_event->insert($data_insert);

        return $this->respondCreated(['success' => true], 'OK');
    }

    public function show($id = null)
    {
        $db_event = new Events;
        $event = $db_event->where('id', $id)->first();

        if (!$event) {
            return $this->respond(['success' => false, 'data' => $event], 404, 'USER NOT FOUND');
        }

        return $this->respond(['success' => true, 'data' => $event], 200, 'OK');
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

        $db_event = new Events;
        $event = $db_event->where('id', $id)->first();

        if (!$event) {
            return $this->respond(['success' => false, 'data' => null], 404, 'USER NOT FOUND');
        }

        $imageArray = json_decode($event['images']);

        if ($images) {
            if (!$event['images']) {
                
                $imagesName = [];
                for($i=0; $i<count($images['name']);$i++){
                    $imagesName[] = $images['name'][$i]; 
                    move_uploaded_file($images['tmp_name'][$i], 'images/events/' . $images['name'][$i]);
                }
            } else {
                for($i=0; $i<count($imageArray); $i++){
                    unlink('images/events/' . $imageArray[$i]);
                }
                
                $imagesName = [];
                for($i=0; $i<count($images['name']);$i++){
                    $imagesName[] = $images['name'][$i]; 
                    move_uploaded_file($images['tmp_name'][$i], 'images/events/' . $images['name'][$i]);
                }
            }
        } else {
            $imagesName = [];
        }

        $data_update = [
            'title' => $data->title,
            'description' => $data->description,
            'date' => $data->date,
            'total_people'=> $data->total_people,
            'address' => $data->address,
            'district' => $data->district,
            'city' => $data->city,
            'province' => $data->province,
            'link_map' => $data->link_map,
            'images' => json_encode($imagesName),
        ];

        $db_event->update($id, $data_update);

        return $this->respondUpdated(['success' => true], 'OK');
    }

    public function delete($id = null)
    {
        $db_event = new Events;
        $event = $db_event->where('id', $id)->first();

        if (!$event) {
            return $this->respond(['success' => false, 'data' => null], 404, 'event NOT FOUND');
        }

         $imageArray = json_decode($event['images']);

        if ($event['images']) {
            for($i=0; $i<count($imageArray); $i++){
                unlink('images/events/' . $imageArray[$i]);
            }
        }

        $db_event->where('id', $id)->delete();

        return $this->respondDeleted(['success' => true], 'OK');
    }
}
