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
        if ($this->request->has('sort_by') && $this->request->has('order')) {
            $query->orderBy($this->request->input('sort_by'), $this->request->input('order'));
        }

        return $query;
    }
}
