<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'images',
        'price',
        'created_at',
        'updated_at',
    ];

    protected function casts(): array
    {
        return [
            'images' => 'array',
        ];
    }

    public function getMainImageAttribute()
    {
        return $this->images[0] ?? null;
    }
}
