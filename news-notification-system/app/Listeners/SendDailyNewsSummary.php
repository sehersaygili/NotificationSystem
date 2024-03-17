<?php

namespace App\Listeners;

use App\Events\DailyNewsSummary;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use App\Models\News;
use App\Mail\DailyNewsSummaryMail;

class SendDailyNewsSummary
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        
    }

    /**
     * Handle the event.
     */
    public function handle(DailyNewsSummary $event): void
    {
        // Günlük haberleri topla
        $dailyNews = News::whereDate('created_at', today())->get();

        // Günlük özeti oluştur
        $summary = $this->generateSummary($dailyNews);

        // Özetin e-posta olarak gönderilmesi
        Mail::to($event->user)->send(new DailyNewsSummaryMail($summary));
    }

    /**
     * Generate daily news summary.
     *
     * @param  \Illuminate\Database\Eloquent\Collection  $dailyNews
     * @return string
     */
    private function generateSummary($dailyNews)
    {
        $summaries = [];

        foreach ($dailyNews as $news) {
            $summary = [
                'title' => $news->title,
                'summary' => substr($news->content, 0, 50), // İçeriğin ilk 100 karakteri gibi
            ];
            $summaries[] = $summary;
        }

        return implode(', ', array_column($summaries, 'title'));
    }
}

