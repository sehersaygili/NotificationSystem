<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemporaryStorage extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'news_id',
        'expiration_time',
    ];
    
    protected $table = 'temporary_storage';
}
