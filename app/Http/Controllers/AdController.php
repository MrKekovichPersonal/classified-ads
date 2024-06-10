<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdRequest;
use App\Models\Ad;
use App\Services\AdService;
use Illuminate\Http\Request;

class AdController extends Controller
{
    private AdService $service;

    public function __construct(AdService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->service->getAds();
    }

    public function store(StoreAdRequest $request)
    {
        $data = $request->validated();
        return $this->service->createAd($data);
    }

    public function show(Ad $ad)
    {
        $fields = explode(',', request()->input('fields'));
        return $this->service->getAd($ad, $fields);
    }
}
