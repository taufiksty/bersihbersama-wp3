<?php

namespace App\Models;

use CodeIgniter\Model;

class Events extends Model
{
    protected $DBGroup          = 'default';
    protected $table            = 'Events';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $insertID         = 0;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['id', 'title', 'description', 'date', 'total_people', 'address', 'district', 'city', 'province', 'link_map', 'images', 'done'];

    // Dates
    protected $useTimestamps = true;
    protected $dateFormat    = 'datetime';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    // protected $deletedField  = 'deleted_at';

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
            ->orLike('date', $keyword)
            ->orLike('total_people', $keyword)
            ->orLike('address', $keyword)
            ->orLike('district', $keyword)
            ->orLike('city', $keyword)
            ->orLike('province', $keyword)
            ->orLike('done', $keyword);
    }
}
