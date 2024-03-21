<?php

namespace App\Http\Controllers;
use App\Models\News;
use App\Events\NewsCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\TemporaryStorage;

class NewsController
{
    public function index() {
        $newsItems = Cache::remember('cached_news_items', now()->addMinutes(10), function () {
            return News::all();
        });

        foreach ($newsItems as $newsItem) {
            TemporaryStorage::updateOrCreate(
                ['news_id' => $newsItem->id],
                ['expiration_time' => now()->addMinutes(10)] 
            );
        }

        return response()->json($newsItems);
    }

    public function store(Request $request) {
        $news = new News();
        $news->title = $request->title;
        $news->content = $request->content;
        $news->created_at = $request->has('created_at') ? $request->created_at : now();
        $news->save();
        
        event(new NewsCreated($news));

        TemporaryStorage::create([
            'news_id' => $news->id,
            'expiration_time' => now()
        ]);

        return response()->json(['message' => 'Haber başarıyla eklendi'], 201);
    }
    public function show($id) {
        $news = News::findOrFail($id);
        return response()->json($news);
    }
    public function delete($id) {
        $news = News::findOrFail($id);
        $news->delete();

-        TemporaryStorage::where('news_id', $id)->delete();
    }
    public function update(Request $request, $id) {
        $news = News::findOrFail($id);
        $news->title = $request->input('title', $news->title); 
        $news->content = $request->input('content', $news->content); 
        if ($request->has('created_at')) {
            $news->created_at = $request->input('created_at');
        }
        $news->save(); 
    
        return response()->json(['message' => 'Haber başarıyla güncellendi', 'news' => $news], 200);
    }
    
}
