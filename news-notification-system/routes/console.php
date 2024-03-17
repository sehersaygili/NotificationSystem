<?php

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    // Veritabanından tüm kullanıcıları çek
    $users = User::all();

    // Her bir kullanıcı için e-posta gönder
    foreach ($users as $user) {
        Mail::raw('Bu bir test mailidir.', function ($message) use ($user) {
            $message->to($user->email)->subject('Test Mail');
        });
    }
})->everyTenMinutes();
