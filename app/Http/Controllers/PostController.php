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
    // dd(auth()->user()->hashVerifiedEmail());
    $posts = Post::with('user')->latest()->get();
    $now = now();
    return Inertia::render('Posts/Index', [
        'posts' => $posts,
        'now' => $now,
    ]);
}

  public function Store(StorePostRequest  $request)
    {
        // dd($request->validate('body'));
        // sleep(3);
        auth()->user()->posts()->create(
            $request->validated()
        );
        return redirect()->route('all.post')->with('message' , [
            // "type" => 'success',
            // 'body' => "Post created successfully"
        ]);
    }
}
