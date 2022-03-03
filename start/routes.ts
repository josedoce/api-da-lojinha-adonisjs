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
import User from 'App/Models/User';
import WebSocket from 'App/Services/WebSocket';
import SellerProfile from 'App/Models/SellerProfile';
import Favorite from 'App/Models/Favorite';
import Product from 'App/Models/Product';
import Shelve from 'App/Models/Shelve';
import Hash from '@ioc:Adonis/Core/Hash';

Route.get('/', async () => {
  const U = '9b10d8c5-2501-4af3-9658-640383baa925';
  let z = await User.query().where('uuid', U)
  .preload('clientProfile')
  .preload('productsInCart')
  .preload('productsInFavorites')
  return z;
  return {
    user: await User.findBy('uuid', U),
    cart: '' 
  }
  return await Hash.make('12345678');

  const PRODUCT_ID = '39b06332-b6e5-4cb5-823a-38132ddd8af1';
  const USER_ID = 'b9f54853-b538-47d4-8509-8684028315f2'

  const userCart = await User.query()
  .where('uuid', USER_ID).preload('shelf').first();
  
  const inShelf = await Shelve.query().where('user_uuid', USER_ID).preload('user');
  
  return { api: 'v1', user: userCart, inShelf };
});
//.middleware(['bearer_auth','role_client']);

//user
Route.post('/signup', 'UserController.store');
Route.post('/signin', 'UserController.show');
Route.delete('/signout', 'UserController.delete').middleware(['bearer_auth']);

//user client context
Route.get('/clients', 'ClientController.index').middleware(['bearer_auth','role_admin']);
Route.get('/client/:uuid', 'ClientController.show').middleware(['bearer_auth','role_client']);
Route.post('/clients', 'ClientController.store').middleware(['bearer_auth','role_client']);
Route.put('/clients/:uuid', 'ClientController.update').middleware(['bearer_auth','role_client']);
Route.delete('/clients/:uuid', 'ClientController.delete').middleware(['bearer_auth','role_client']);

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