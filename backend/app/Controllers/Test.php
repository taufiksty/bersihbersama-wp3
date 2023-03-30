<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class Test extends ResourceController
{
    use ResponseTrait;
    protected $format = 'json';

    public function index()
    {
        $data = [
            'status' => 'success',
            'results' => 'Hello World'
        ];

        return $this->respond($data, 200);
    }

    public function create()
    {
        $firstName = $this->request->getVar('firstName');
        $lastName = $this->request->getVar('lastName');
        $data = [
            'status' => 'success',
            'fullName' => sprintf('%s %s', $firstName, $lastName)
        ];
                    return $this->respondCreated(['data' => $data]);
    }
}
