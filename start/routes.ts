/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

//user
Route.post('/signup', 'UserController.store');
Route.post('/signin', 'UserController.show');
Route.delete('/signout', 'UserController.delete').middleware(['bearer_auth','role_client']);

//favorite
Route.get('/client/favorite', 'FavoriteController.index').middleware(['bearer_auth','role_client']);
Route.get('/client/favorite/:uuid', 'FavoriteController.show').middleware(['bearer_auth','role_client']);
Route.post('/client/favorite', 'FavoriteController.store').middleware(['bearer_auth','role_client']);
Route.delete('/client/favorite/:uuid', 'FavoriteController.delete').middleware(['bearer_auth','role_client']);

//cart
Route.get('/client/cart', 'CartController.index').middleware(['bearer_auth','role_client']);
Route.get('/client/cart/:uuid', 'CartController.show').middleware(['bearer_auth','role_client']);
Route.post('/client/cart', 'CartController.store').middleware(['bearer_auth','role_client']);
Route.put('/client/cart/:uuid', 'CartController.update').middleware(['bearer_auth','role_client']);
Route.delete('/client/cart/:uuid', 'CartController.delete').middleware(['bearer_auth','role_client']);