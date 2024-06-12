<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class AdFilter
{
    protected Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function apply(Builder $query): Builder
    {
        $sortBy = $this->request->get('sort_by');
        $order = $this->request->get('order');

        if ($sortBy !== 'price' && $sortBy !== 'created_at') {
            $sortBy = 'id';
        }

        if ($order !== 'asc' && $order !== 'desc') {
            $order = 'asc';
        }

        return $query->orderBy($sortBy, $order);
    }
}
