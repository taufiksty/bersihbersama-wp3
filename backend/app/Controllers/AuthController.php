<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Users;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends BaseController
{
    public function login()
    {
        helper(['form']);
        if (!$this->validate([
            'email' => 'required',
            'password' => 'required|min_length[6]'
        ])) {
            return $this->response->setJSON(['success' => false, 'data' => null, 'message' => \Config\Services::validation()->getErrors()]);
        }

        $db_user = new Users;
        $user = $db_user->where('email', $this->request->getVar('email'))->first();

        if ($user) {
            if (password_verify($this->request->getVar('password'), $user['password'])) {
                $key = getenv('jwt.secretkey');
                $payload = [
                    'iat' => 1356999524,
                    'nbf' => 1357000000,
                    'uid' => $user['id'],
                    'email' => $user['email']
                ];
                $token = JWT::encode($payload, $key, 'HS256');

                return $this->response->setJSON(['success' => true, 'token' => $token, 'expirationTime' => time() + 10800]);
            } else {
                return $this->response->setJSON(['success' => false, 'message' => 'USER NOT FOUND']);
            }
        } else {
            return $this->response->setJSON(['success' => false, 'message' => 'USER NOT FOUND'])->setStatusCode(409);
        }
    }

    public function authUser()
    {
        $key = getenv('jwt.secretkey');
        $header = $this->request->getServer('HTTP_AUTHORIZATION');
        if (!$header) return $this->response->setJSON(['message' => 'TOKEN REQUIRED']);

        $token = explode(' ', $header)[1];

        try {
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $response = [
                'id' => $decoded->uid,
                'email' => $decoded->email,
            ];
            return $this->response->setJSON(['data' => $response]);
        } catch (\Throwable $th) {
            return $this->response->setJSON(['err_message' => $th->getMessage()])->setStatusCode(400);
        }
    }

    // public function logout()
    // {
    //     unset($_SERVER['HTTP_AUTHORIZATION']);

    //     return $this->response->setJSON(['success' => true, 'message' => 'OK']);
    // }
}
