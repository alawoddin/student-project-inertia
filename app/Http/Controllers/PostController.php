<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function Index() {
        return Inertia::render('Posts/Index');
    }
}
