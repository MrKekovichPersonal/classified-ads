<?php

namespace App\Services;

use App\Filters\AdFilter;
use App\Models\Ad;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class AdService
{
    protected AdFilter $filter;

    public function __construct(AdFilter $filter)
    {
        $this->filter = $filter;
    }

    public function getAds(Request $request): LengthAwarePaginator
    {
        $query = Ad::query();
        $query = $this->filter->apply($query);
        return $query->paginate(10);
    }

    public function getAd(Ad $ad, array $fields = null): array
    {
        $response = [
            'title' => $ad->title,
            'main_photo' => $ad->images[0],
            'price' => $ad->price,
        ];

        if ($fields) {
            if (in_array('description', $fields)) {
                $response['description'] = $ad->description;
            }
            if (in_array('images', $fields)) {
                $response['images'] = $ad->images;
            }
        }

        return $response;
    }

    public function createAd(array $data)
    {
        $ad = Ad::create($data);
        return $ad->id;
    }
}