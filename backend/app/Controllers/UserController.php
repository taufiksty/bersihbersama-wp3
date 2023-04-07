<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Users;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\Request;

class UserController extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $search = $this->request->getVar('search');
        if (!is_null($search)) {
            $db_user = new Users;
            $user = $db_user->search($search)->get()->getResult();

            return $this->respond(['success' => true, 'data' => $user], 200, 'OK');
        }

        $db_user = new Users;
        $user = $db_user->get()->getResult();

        return $this->respond(['success' => true, 'data' => $user], 200, 'OK');
    }

    public function create()
    {
        helper(['form']);
        if (!$this->validate([
            'email' => 'required|is_unique[Users.email]',
            'name' => 'required',
            'password' => 'required|min_length[6]'
        ])) {
            return $this->respond(['success' => false, 'data' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
        }

        $data_insert = [
            'email' => $this->request->getVar('email'),
            'name' => $this->request->getVar('name'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
        ];

        $db_user = new Users;
        $save = $db_user->insert($data_insert);

        return $this->setResponseFormat('json')->respondCreated(['success' => true], 'OK');
    }

    public function show($id = null)
    {
        $db_user = new Users;
        $user = $db_user->where('id', $id)->first();

        if (!$user) {
            return $this->respond(['success' => false, 'data' => $user], 404, 'USER NOT FOUND');
        }

        return $this->respond(['success' => true, 'data' => $user], 200, 'OK');
    }

    public function update($id = null)
    {
        helper(['form']);
        $data = json_decode($this->request->getVar('data'));
        $image = $this->request->getFiles();

        // if (!$data->validate([
        //     'email' => 'required|is_unique[Users.email]',
        //     'name' => 'required',
        //     'address' => 'required',
        //     'district' => 'required',
        //     'province' => 'required',
        // ])) {
        //     return $this->respond(['success' => false, 'data' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
        // }

        if (!$this->validate([
            'image' => 'uploaded[image]|max_size[image,2048]|is_image[image]'
        ])) {
            return $this->respond(['success' => false, 'image' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
        }

        $db_user = new Users;
        $user = $db_user->where('id', $id)->first();

        if (!$user) {
            return $this->respond(['success' => false, 'data' => null], 404, 'USER NOT FOUND');
        }

        $newName = $this->request->getFile('image')->getRandomName();
        if ($image) {
            if ($user['image'] == 'default.png') {
                move_uploaded_file($image['tmp_name'], 'images/profile/' . $newName);
            } else {
                unlink('images/profile/' . $user['image']);
                move_uploaded_file($image['tmp_name'], 'images/profile/' . $newName);
            }
        } else {
            $newName = $user['image'];
        }

        $data_update = [
            'email' => $data->email,
            'name' => $data->name,
            'password' => $user['password'],
            'address' => $data->address,
            'district' => $data->district,
            'city' => $data->city,
            'province' => $data->province,
            'sm_account' => $data->sm_account,
            'role' => $data->role,
            'image' => $newName,
        ];

        $db_user->update($id, $data_update);

        return $this->respondUpdated(['success' => true], 'OK');
    }

    public function delete($id = null)
    {
        $db_user = new Users;
        $user = $db_user->where('id', $id)->first();

        if (!$user) {
            return $this->respond(['success' => false, 'data' => null], 404, 'USER NOT FOUND');
        }

        if ($user['image'] != 'default.png') unlink('images/profile/' . $user['image']);

        $db_user->where('id', $id)->delete();

        return $this->respondDeleted(['success' => true], 'OK');
    }
}
