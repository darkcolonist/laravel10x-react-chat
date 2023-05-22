<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('message', function(){
  sleep(rand(1,3)); // sleep between 1 to 3 seconds

  function getRandomFML(){
    $fmlMoments = [
      "I spilled coffee all over myself just before an important meeting. FML.",
      "I locked myself out of the house in my pajamas. FML.",
      "I tripped and fell in front of my crush. FML.",
      "I accidentally sent a text complaining about my boss to my boss. FML.",
      "I dropped my phone in the toilet. FML.",
      "I missed my bus and had to walk in the pouring rain. FML.",
      "I burnt dinner and set off the smoke alarm. FML.",
      "I got a parking ticket right after my meter expired. FML.",
      "I left my wallet at home and realized it when I was at the grocery store checkout. FML.",
      "I woke up late and missed my flight. FML.",
      "I got stuck in an elevator for an hour. FML.",
      "I stepped in dog poop right before a job interview. FML.",
      "I accidentally hit 'reply all' to an email and sent an embarrassing message to everyone. FML.",
      "I dropped my brand new phone and shattered the screen. FML.",
      "I spilled red wine on my favorite white shirt. FML.",
      "I got food poisoning from the restaurant I was so excited to try. FML.",
      "I lost my keys and had to call a locksmith to get into my own house. FML.",
      "I got caught in a traffic jam on my way to an important appointment. FML.",
      "I accidentally deleted an important file on my computer and couldn't recover it. FML.",
      "I got caught in the rain without an umbrella and got completely drenched. FML.",
      "LMAO you seem to be enjoying this, get back to work!"
    ];

    $randomIndex = array_rand($fmlMoments);
    return $fmlMoments[$randomIndex];
  }

  return response()->json([
    'postdata' => request()->all(),
    'message' => getRandomFML(),
    'timestamp' => date("r")
  // ], 400);
  ], 200);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
