<?php

namespace App\Models;

use CodeIgniter\Model;

class Reports extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'Reports';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['id', 'title', 'description', 'address', 'district', 'city', 'province', 'user_id', 'link_map', 'images', 'status'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    // Validation
    protected $validationRules      = [];
    protected $validationMessages   = [];
    protected $skipValidation       = false;
    protected $cleanValidationRules = true;

    // Callbacks
    protected $allowCallbacks = true;
    protected $beforeInsert   = [];
    protected $afterInsert    = [];
    protected $beforeUpdate   = [];
    protected $afterUpdate    = [];
    protected $beforeFind     = [];
    protected $afterFind      = [];
    protected $beforeDelete   = [];
    protected $afterDelete    = [];

    public function search($keyword)
    {
        return $this->like('title', $keyword)
            ->orLike('address', $keyword)
            ->orLike('district', $keyword)
            ->orLike('city', $keyword)
            ->orLike('province', $keyword)
            ->orLike('user_id', $keyword)
            ->orLike('status', $keyword)
            ->orLike('created_at', $keyword);
    }

    public function searchByUserId($user_id)
    {
        return $this->like('user_id', $user_id);
    }
}
