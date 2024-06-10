<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdRequest;
use App\Models\Ad;

class AdController extends Controller
{
    public function index()
    {
        return Ad::all();
    }

    public function store(StoreAdRequest $request)
    {
        return Ad::create($request->validated());
    }

    public function show(Ad $ad)
    {
        return $ad;
    }
}
