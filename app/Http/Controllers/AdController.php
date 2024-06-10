<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdRequest;
use App\Models\Ad;

class AdController extends Controller
{
    public function index()
    {
        return Ad::all();
    }

    public function store(AdRequest $request)
    {
        return Ad::create($request->validated());
    }

    public function show(Ad $ad)
    {
        return $ad;
    }

    public function update(AdRequest $request, Ad $ad)
    {
        $ad->update($request->validated());

        return $ad;
    }

    public function destroy(Ad $ad)
    {
        $ad->delete();

        return response()->json();
    }
}
