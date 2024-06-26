<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:200',
            'description' => 'nullable|string|max:1000',
            'images' => 'required|array|max:3',
            'images.*' => 'url',
            'price' => 'required|numeric|min:0',
        ];
    }

    public function authorize()
    {
        return true;
    }
}
