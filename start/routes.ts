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

Route.get('/', async () => {
  const PRODUCT_ID = '39b06332-b6e5-4cb5-823a-38132ddd8af1';
  const USER_ID = '60baee42-0ece-4e07-b410-460b560b7f42'

  const sellerProducts = await SellerProfile.query()
  .where('user_uuid', USER_ID).preload('products').first();
  
  // const createFavorite = await User.query().where('uuid', USER_ID).first();
  // createFavorite.related('favorites').create({
  //   product_uuid: PRODUCT_ID,
  //   user_uuid: USER_ID
  // });
  const user = await User.query()
  .where('uuid',USER_ID)
  .preload('productsInFavorites').first();

  const favorites: Product[] = [];
  // for(let product of user.productsInFavorites){
  //   favorites.push(await Product.find(product.product_uuid));
  // }
  
  const userCart = await User.query()
  .where('uuid', USER_ID).preload('productsInCart').first();
  const carts: Product[] = [];

  
  return { api: 'v1', favorites, sellerProducts, userCart};
});

//user
Route.post('/signup', 'UserController.store');
Route.post('/signin', 'UserController.show');
Route.delete('/signout', 'UserController.delete').middleware('bearer_auth');

//favorite
Route.get('/client/favorite', 'FavoriteController.index').middleware('bearer_auth');
Route.get('/client/favorite/:uuid', 'FavoriteController.show').middleware('bearer_auth');
Route.post('/client/favorite', 'FavoriteController.store').middleware('bearer_auth');
Route.delete('/client/favorite/:uuid', 'FavoriteController.delete').middleware('bearer_auth');

//cart
Route.get('/client/cart', 'CartController.index').middleware('bearer_auth');
Route.get('/client/cart/:uuid', 'CartController.show').middleware('bearer_auth');
Route.post('/client/cart', 'CartController.store').middleware('bearer_auth');
Route.put('/client/cart/:uuid', 'CartController.update').middleware('bearer_auth');
Route.delete('/client/cart/:uuid', 'CartController.delete').middleware('bearer_auth');