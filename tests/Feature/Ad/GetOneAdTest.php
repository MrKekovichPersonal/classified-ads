<?php

use App\Models\Ad;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('fetches a single ad with required fields', function () {
    $ad = Ad::factory()->create(['title' => 'Test Ad', 'price' => 100, 'images' => ['image1.jpg']]);

    $response = $this->getJson("/api/ads/{$ad->id}");

    $response->assertStatus(200)
        ->assertJson([
            'title' => 'Test Ad',
            'price' => 100,
            'main_photo' => 'image1.jpg',
        ]);
});

it('fetches a single ad with optional fields', function () {
    $ad = Ad::factory()->create(['title' => 'Test Ad', 'price' => 100, 'description' => 'Description', 'images' => ['image1.jpg', 'image2.jpg']]);

    $response = $this->getJson("/api/ads/{$ad->id}?fields=description,images");

    $response->assertStatus(200)
        ->assertJson([
            'title' => 'Test Ad',
            'price' => 100,
            'main_photo' => 'image1.jpg',
            'description' => 'Description',
            'images' => ['image1.jpg', 'image2.jpg'],
        ]);
});

