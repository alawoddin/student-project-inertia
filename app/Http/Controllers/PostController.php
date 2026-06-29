<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\StorePostRequest;
use Inertia\Inertia;

class PostController extends Controller
{
   public function Index()
{
    $posts = Post::with('user')->latest()->get();

    return Inertia::render('Posts/Index', [
        'posts' => $posts,
    ]);
}

  public function Store(StorePostRequest  $request)
    {
        // dd($request->validate('body'));
        auth()->user()->posts()->create(
            $request->validated()
        );
        return redirect()->route('all.post');
    }
}
