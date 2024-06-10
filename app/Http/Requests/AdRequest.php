<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => ['required'],
            'description' => ['required'],
            'images' => ['required'],
            'price' => ['required', 'numeric'],
        ];
    }

    public function authorize()
    {
        return true;
    }
}
