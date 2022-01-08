import { HttpContext } from "@adonisjs/core/build/standalone";
import { StatusCode } from "App/Enum/HttpCode";
import Favorite from "App/Models/Favorite";

class FavoriteController {
  
  constructor(){
    
  }
  public async index(ctx: HttpContext){
    const {request, response} = ctx;
    const {page, limit} = request.qs();
    const USER_UUID = request.userJwt.uuid;
   
    const favorites = await Favorite.query()
    .where('user_uuid', USER_UUID)
    .offset(page).limit(limit);
    return response.status(StatusCode.OK).json({favorites, page: {page, limit}});
  }

  public async show(ctx:HttpContext){
    //validações aqui.
    const {request, response, params} = ctx;
    const PRODUCT_UUID = params.uuid;
    const USER_UUID = request.userJwt.uuid;

    const favorite = await Favorite.query()
    .where('product_uuid', PRODUCT_UUID)
    .andWhere('user_uuid', USER_UUID).first();
    if(favorite==null){
      return response.status(StatusCode.NOT_FOUND).json({
        success: false,
        item: null,
        message: 'product not found'
      }); 
    }

    return response.status(StatusCode.OK).json({favorite});
  }
  
  public async store(ctx: HttpContext){
    //validações aqui.
    const {request, response} = ctx;
    const body = request.only([
      'product_uuid',
    ]);
    const PRODUCT_UUID = body.product_uuid;
    const USER_UUID = request.userJwt.uuid;

    const favorite = await Favorite.query()
    .where('product_uuid', PRODUCT_UUID)
    .andWhere('user_uuid', USER_UUID).first();
    if(favorite != null){
      return response.status(StatusCode.BAD_REQUEST).json({
        success: false,
        item: null,
        message: 'product already exists in favorites'
      }); 
    }
    const created = await Favorite.create({
      user_uuid: USER_UUID,
      product_uuid: PRODUCT_UUID
    }); 

    return response.status(StatusCode.CREATED).json({
      success: true,
      item: created,
      message: 'product has been added to favorite now'
    }); 
  }

  public async delete(ctx: HttpContext){
    //validações aqui.
    const {request, response, params} = ctx;
    const PRODUCT_UUID = params.uuid;
    const USER_UUID = request.userJwt.uuid;

    const favorite = await Favorite.query()
    .where('product_uuid', PRODUCT_UUID)
    .andWhere('user_uuid', USER_UUID).first();
    if(favorite==null){
      return response.status(StatusCode.NOT_FOUND).json({
        success: false,
        item: null,
        message: 'product not found'
      }); 
    }

    await favorite.delete();

    return response.status(StatusCode.NO_CONTENT);
  }
}

export default FavoriteController;