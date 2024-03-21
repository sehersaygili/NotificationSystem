<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsUserController
{
    public function index() {
        $news = News::whereNull('deleted_at')->get();
        return response()->json($news);
    }
    public function show($id,Request $request) {
        $news = News::findOrFail($id)->whereNull('deleted_at');
        return response()->json($news);
    }
}
