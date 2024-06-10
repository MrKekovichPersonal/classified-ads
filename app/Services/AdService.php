<?php

namespace App\Services;

use App\Filters\AdFilter;
use App\Models\Ad;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AdService
{
    protected AdFilter $filter;

    public function __construct(AdFilter $filter)
    {
        $this->filter = $filter;
    }

    public function getAds(): LengthAwarePaginator
    {
        $query = Ad::query();
        $query = $this->filter->apply($query);

        $query->select(['id', 'title', 'price', 'images']);

        $ads = $query->paginate(10);

        $ads->getCollection()->transform(function ($ad) {
            return [
                'id' => $ad->id,
                'title' => $ad->title,
                'main_image' => $ad->main_image,
                'price' => $ad->price,
            ];
        });

        return $ads;
    }

    public function getAd(Ad $ad, array $fields = null): array
    {
        $response = [
            'title' => $ad->title,
            'main_image' => $ad->main_image,
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
