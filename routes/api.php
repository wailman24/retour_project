<?php

use App\Http\Controllers\BonController;
use App\Http\Controllers\DistributeurController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ModalController;
use App\Http\Controllers\PieceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\RetourController;
use App\Http\Controllers\SearchRetourController;
use App\Http\Controllers\StockController;
use App\Models\Issue;
use Illuminate\Auth\Events\Login;

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



Route::post('/signup', [LoginController::class, 'store']);
Route::post('/login', [LoginController::class, 'index']);
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [LoginController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:api', 'checkUserId'])->group(function () {
    // Routes for admin-only resources
    Route::apiResources(['roles' => RoleController::class]);
    Route::apiResources(['users' => UserController::class]);
    Route::apiResources(['modals' => ModalController::class]);
    Route::apiResources(['products' => ProductController::class]);
    Route::apiResources(['distributeurs' => DistributeurController::class]);
    Route::apiResources(['pieces' => PieceController::class]);
    Route::apiResources(['stocks' => StockController::class]);
    Route::apiResources(['bons' => BonController::class]);
    Route::apiResources(['retours' => RetourController::class]);
    Route::post('decrement', [StockController::class, 'decrement']);
    Route::apiResources(['issues' => IssueController::class]);
    Route::get('clients', [UserController::class, 'Clients']);
    Route::post('searchbyimei', [ProductController::class, 'searchByImei']);
});
