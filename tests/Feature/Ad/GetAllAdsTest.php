<?php

use App\Models\Ad;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('fetches a list of ads with pagination', function () {
    Ad::factory()->count(15)->create();

    $response = $this->getJson('/api/ads');

    $response->assertStatus(200)
        ->assertJsonCount(10, 'data');
});

it('fetches a sorted list of ads by price in ascending order', function () {
    Ad::factory()->create(['price' => 100]);
    Ad::factory()->create(['price' => 200]);

    $response = $this->getJson('/api/ads?sort_by=price&order=asc');

    $response->assertStatus(200)
        ->assertJsonPath('data.0.price', 100)
        ->assertJsonPath('data.1.price', 200);
});

it('fetches a sorted list of ads by date in descending order', function () {
    $firstAd = Ad::factory()->create(['created_at' => now()->subDay()]);
    $secondAd = Ad::factory()->create(['created_at' => now()]);

    $response = $this->getJson('/api/ads?sort_by=created_at&order=desc');

    $response->assertStatus(200)
        ->assertJsonPath('data.0.id', $secondAd->id)
        ->assertJsonPath('data.1.id', $firstAd->id);
});

