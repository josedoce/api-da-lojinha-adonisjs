import { HttpContext } from "@adonisjs/core/build/standalone";
import { StatusCode } from "App/Enum/HttpCode";
import Favorite from "App/Models/Favorite";
import Product from "App/Models/Product";
import User from "App/Models/User";
import UserService from "App/Services/UserService";

class FavoriteController {
  
  constructor(){
    
  }
  public async index(ctx: HttpContext){
    const {request, response} = ctx;
    const {page, limit} = request.qs();
    const USER_UUID = request.userJwt.uuid;
    const user = await User.query()
    .where('uuid',USER_UUID)
    .preload('productsInFavorites', (query)=>{
      query.offset(page).limit(limit);
    }).first();

    return response.status(StatusCode.OK).json({favorites: user.productsInFavorites, page: {page, limit}});
  }

  public async show(ctx:HttpContext){
    //validações aqui.
    
  }
  
  public async store(ctx: HttpContext){
    //validações aqui.
    
  }

  public async delete(ctx: HttpContext){
    //validações aqui.
    
  }
}

export default FavoriteController;