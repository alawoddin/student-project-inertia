<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
   public function Index()
{
    $posts = Post::with('user')->get();

    return Inertia::render('Posts/Index', [
        'posts' => $posts,
    ]);
}
}
