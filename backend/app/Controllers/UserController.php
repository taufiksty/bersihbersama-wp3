<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Users;
use CodeIgniter\API\ResponseTrait;
use DateTime;

class UserController extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $search = $this->request->getVar('search');
        if (!is_null($search)) {
            $db_users = new Users;
            $users = $db_users->search($search)->get()->getResult();

            return $this->respond(['success' => true, 'data' => $users], 200, 'OK');
        }

        $db_users = new Users;
        $users = $db_users->get()->getResult();

        $count_admin = 0;
        foreach ($users as $user) {
            if ($user->role == 1) $count_admin++;
        }

        return $this->respond(['success' => true, 'data' => $users, 'total_users' => count($users), 'count_admin' => $count_admin, 'count_user' => count($users) - $count_admin], 200, 'OK');
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
            'id' => uniqid('user-'),
            'email' => $this->request->getVar('email'),
            'name' => $this->request->getVar('name'),
            'password' => password_hash($this->request->getVar('password'), PASSWORD_DEFAULT),
        ];

        $db_user = new Users;
        $db_user->insert($data_insert);

        return $this->setResponseFormat('json')->respondCreated(['success' => true], 'OK');
    }

    public function show($id = null)
    {
        $db_user = new Users;
        $user = $db_user->where('id', $id)->first();

        if (!$user) {
            return $this->respond(['success' => false, 'data' => $user], 404, 'USER NOT FOUND');
        }

        unset($user['password'], $user['created_at'], $user['updated_at']);

        return $this->respond(['success' => true, 'data' => $user], 200, 'OK');
    }

    public function update($id = null)
    {
        helper(['form']);
        $data = json_decode($this->request->getVar('data'));
        $image = $_FILES['image'];

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

        $dateTime = new DateTime();
        $currentDateTime = $dateTime->format('Y-m-d_H-i-s');

        $imageName = $image['name'];
        $newImageName = "$currentDateTime-$imageName";

        if ($image) {
            if ($user['image'] == 'default.png') {
                move_uploaded_file($image['tmp_name'], 'images/profile/' . $newImageName);
            } else {
                unlink('images/profile/' . $user['image']);
                move_uploaded_file($image['tmp_name'], 'images/profile/' . $newImageName);
            }
        } else {
            $newImageName = $user['image'];
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
            'image' => $newImageName,
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
