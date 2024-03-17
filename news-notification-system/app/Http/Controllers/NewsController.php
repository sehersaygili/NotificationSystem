<?php

namespace App\Http\Controllers;
use App\Models\News;
use App\Events\NewsCreated;
use Illuminate\Http\Request;

class NewsController
{
    public function index() {
        echo "ne";
    }

    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->content = $request->content;
        $news->created_at = $request->has('created_at') ? $request->created_at : now();
        $news->published_at = $request->has('published_at') ? $request->published_at : null;
        $news->save();
        
        event(new NewsCreated($news));

        return response()->json(['message' => 'Haber başarıyla eklendi'], 201);
    }
    public function show($id)
    {
        $news = News::findOrFail($id);
        return response()->json($news);
    }
}
