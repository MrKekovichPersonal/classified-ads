<?php

namespace Database\Factories;

use App\Models\Ad;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class AdFactory extends Factory
{
    protected $model = Ad::class;

    public function definition()
    {
        $images = [];
        foreach (range(1, $this->faker->numberBetween(0, 3)) as $ignored) {
            $images[] = $this->faker->imageUrl;
        }

        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->sentence(),
            'images' => $images,
            'price' => $this->faker->randomFloat(),
        ];
    }
}
