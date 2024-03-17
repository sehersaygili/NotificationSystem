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

        // Önbelleğe alınan verileri temporary_storage tablosuna kaydet
        foreach ($newsItems as $newsItem) {
            TemporaryStorage::updateOrCreate(
                ['news_id' => $newsItem->id],
                ['expiration_time' => now()->addMinutes(10)] // Önbellek süresine uygun olarak ayarlayabilirsiniz
            );
        }

        return response()->json($newsItems);
    }

    public function store(Request $request) {
        $news = new News();
        $news->title = $request->title;
        $news->content = $request->content;
        $news->created_at = $request->has('created_at') ? $request->created_at : now();
        $news->published_at = $request->has('published_at') ? $request->published_at : null;
        $news->save();
        
        event(new NewsCreated($news));

        TemporaryStorage::create([
            'news_id' => $news->id,
            'expiration_time' => now()->addMinutes(10) // Önbellek süresine uygun olarak ayarlayabilirsiniz
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

        // Haber silindiğinde temporary_storage tablosundan da sil
        TemporaryStorage::where('news_id', $id)->delete();

    }
}
