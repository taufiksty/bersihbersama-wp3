<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Events;
use CodeIgniter\API\ResponseTrait;
use DateTime;

class EventsController extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $search = $this->request->getVar('search');
        if (!is_null($search)) {
            $db_event = new Events;
            $event = $db_event->search($search)->orderBy('done')->orderBy('date', 'DESCENDING')->findAll();

            return $this->respond(['success' => true, 'data' => $event], 200, 'OK');
        }

        $db_events = new Events;
        $events = $db_events->orderBy('done')->orderBy('date', 'DESCENDING')->findAll();

        $count_done = 0;
        foreach ($events as $event) {
            if ($event['done'] == 1) $count_done++;
        }

        return $this->respond(['success' => true, 'data' => $events, 'count_done' => $count_done, 'count_not_done' => count($events) - $count_done, 'total_events' => count($events)], 200, 'OK');
    }

    public function create()
    {
        helper(['form']);
        if (!$this->validate([
            'image[]' => 'uploaded[image]|max_size[image,4096]|is_image[image]'
        ])) {
            return $this->respond(['success' => false, 'image' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
        }

        $data = json_decode($this->request->getVar('data'));
        $images = $_FILES['image'];

        $dateTime = new DateTime();
        $currentDateTime = $dateTime->format('Y-m-d_H-i-s');

        $imagesName = [];

        for ($i = 0; $i < count($images['name']); $i++) {
            $imageNameBeforeFormatted = $images['name'][$i];
            $imagesName[] = "$currentDateTime-$imageNameBeforeFormatted";
            move_uploaded_file($images['tmp_name'][$i], 'images/events/' . $imagesName[$i]);
        }

        $data_insert = [
            'id' => uniqid('event-'),
            'title' => $data->title,
            'description' => $data->description,
            'date' => $data->date,
            'total_people' => $data->total_people,
            'address' => $data->address,
            'district' => $data->district,
            'city' => $data->city,
            'province' => $data->province,
            'link_map' => $data->link_map,
            'link_groupwa' => $data->link_groupwa,
            'images' => json_encode($imagesName),
        ];

        $db_event = new Events;
        $db_event->insert($data_insert);

        return $this->respondCreated(['success' => true], 'OK');
    }

    public function show($id = null)
    {
        $db_event = new Events;
        $event = $db_event->where('id', $id)->first();

        if (!$event) {
            return $this->respond(['success' => false, 'data' => $event], 404, 'EVENT NOT FOUND');
        }

        return $this->respond(['success' => true, 'data' => $event], 200, 'OK');
    }

    public function update($id = null)
    {
        helper(['form']);
        $data = json_decode($this->request->getVar('data'));
        $images = $_FILES['image'];

        if (!$this->validate([
            'image[]' => 'uploaded[image]|max_size[image,2048]|is_image[image]'
        ])) {
            return $this->respond(['success' => false, 'image' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
        }

        $db_event = new Events;
        $event = $db_event->where('id', $id)->first();

        if (!$event) {
            return $this->respond(['success' => false, 'data' => null], 404, 'EVENT NOT FOUND');
        }

        $imageArray = json_decode($event['images']);

        if ($images) {
            if ($event['images']) {
                for ($i = 0; $i < count($imageArray); $i++) {
                    unlink('images/events/' . $imageArray[$i]);
                }
            }

            $dateTime = new DateTime();
            $currentDateTime = $dateTime->format('Y-m-d_H-i-s');

            $imagesName = [];
            for ($i = 0; $i < count($images['name']); $i++) {
                $imageNameBeforeFormatted = $images['name'][$i];
                $imagesName[] = "$currentDateTime-$imageNameBeforeFormatted";
                move_uploaded_file($images['tmp_name'][$i], 'images/events/' . $imagesName[$i]);
            }
        } else {
            $imagesName = [];
        }

        $data_update = [
            'id' => $event['id'],
            'title' => $data->title,
            'description' => $data->description,
            'date' => $data->date,
            'total_people' => $data->total_people,
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
            return $this->respond(['success' => false, 'data' => null], 404, 'EVENT NOT FOUND');
        }

        $imageArray = json_decode($event['images']);

        if ($event['images']) {
            for ($i = 0; $i < count($imageArray); $i++) {
                unlink('images/events/' . $imageArray[$i]);
            }
        }

        $db_event->where('id', $id)->delete();

        return $this->respondDeleted(['success' => true], 'OK');
    }
}
