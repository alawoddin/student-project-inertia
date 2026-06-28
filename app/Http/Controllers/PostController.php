<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
   public function Index()
{
    $posts = Post::all();

    return Inertia::render('Posts/Index', [
        'posts' => $posts,
    ]);
}
}
