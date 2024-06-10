<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates a new ad', function () {
    $data = [
        'title' => 'New Ad',
        'price' => 100,
        'description' => 'Description',
        'images' => ['https://picsum.photos/'],
    ];

    $response = $this->postJson('/api/ads', $data);
    dump($response);

    $response->assertStatus(201)
        ->assertJsonStructure(['id']);

    $this->assertDatabaseHas('ads', [
        'title' => 'New Ad',
        'price' => 100,
        'description' => 'Description',
    ]);
});

