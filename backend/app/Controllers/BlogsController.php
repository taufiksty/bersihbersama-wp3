<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\Blogs;
use CodeIgniter\API\ResponseTrait;

class BlogsController extends ResourceController
{
  use ResponseTrait;

  public function index()
  {
    $search = $this->request->getVar('search');
    if (!is_null($search)) {
      $db_blogs = new Blogs;
      $blogs = $db_blogs->search($search)->orderBy('created_at', 'desc')->findAll();

      return $this->respond(['success' => true, 'data' => $blogs], 200, 'OK');
    }

    $db_blogs = new Blogs;
    $blogs = $db_blogs->orderBy('created_at', 'desc')->findAll();

    return $this->respond(['success' => true, 'data' => $blogs, 'total_blogs' => count($blogs)], 200, 'OK');
  }

  public function create()
  {
    helper(['form']);

    $image = $_FILES['image'];
    $data = json_decode($this->request->getVar('data'));

    if (!$this->validate([
      'image' => 'uploaded[image]|max_size[image,4096]|is_image[image]'
    ])) {
      return $this->respond(['success' => false, 'image' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
    }

    if ($image) move_uploaded_file($image['tmp_name'], 'images/blogs/' . $image['name']);

    $data_insert = [
      'title' => $data->title,
      'excerpt' => $data->excerpt,
      'content' => $data->content,
      'user_id' => $data->user_id,
      'category' => $data->category,
      'image' => $image ? $image['name'] : ''
    ];

    $db_blog = new Blogs;
    $save = $db_blog->insert($data_insert);

    return $this->setResponseFormat('json')->respondCreated(['success' => true], 'OK');
  }

  public function show($id = null)
  {
    $db_blog = new Blogs;
    $blog = $db_blog->where('id', $id)->first();

    if (!$blog) {
      return $this->respond(['success' => false, 'data' => $blog], 404, 'USER NOT FOUND');
    }

    return $this->respond(['success' => true, 'data' => $blog], 200, 'OK');
  }

  public function update($id = null)
  {
    helper(['form']);
    $data = json_decode($this->request->getVar('data'));
    $image = $_FILES['image'];

    if (!$this->validate([
      'image' => 'uploaded[image]|max_size[image,4096]|is_image[image]'
    ])) {
      return $this->respond(['success' => false, 'image' => null, 'error' => \Config\Services::validation()->getErrors()], 400, 'VALIDATION ERROR');
    }

    $db_blog = new Blogs;
    $blog = $db_blog->where('id', $id)->first();

    if (!$blog) {
      return $this->respond(['success' => false, 'data' => null], 404, 'USER NOT FOUND');
    }

    if ($image) {
      if ($blog['image']) {
        if (file_exists('images/blogs/' . $blog['image'])) unlink('images/blogs/' . $blog['image']);
        move_uploaded_file($image['tmp_name'], 'images/blogs/' . $image['name']);
      } else {
        move_uploaded_file($image['tmp_name'], 'images/blogs/' . $image['name']);
      }
    }

    $data_update = [
      'title' => $data->title,
      'excerpt' => $data->excerpt,
      'content' => $data->content,
      'user_id' => $data->user_id,
      'category' => $data->category,
      'image' => $image ? $image['name'] : $blog['image'],
    ];

    $db_blog->update($id, $data_update);

    return $this->respondUpdated(['success' => true], 'OK');
  }

  public function delete($id = null)
  {
    $db_blog = new Blogs;
    $blog = $db_blog->where('id', $id)->first();

    if (!$blog) {
      return $this->respond(['success' => false, 'data' => null], 404, 'USER NOT FOUND');
    }

    if ($blog['image'] && file_exists('images/blogs/' . $blog['image'])) unlink('images/blogs/' . $blog['image']);

    $db_blog->where('id', $id)->delete();

    return $this->respondDeleted(['success' => true], 'OK');
  }
}
