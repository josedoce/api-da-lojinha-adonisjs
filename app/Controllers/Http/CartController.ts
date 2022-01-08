import { HttpContext } from "@adonisjs/core/build/standalone";
import { StatusCode } from "App/Enum/HttpCode";
import Cart from "App/Models/Cart";
import Favorite from "App/Models/Favorite";
import Product from "App/Models/Product";
import User from "App/Models/User";
import UserService from "App/Services/UserService";

class CartController {
  
  constructor(){
    
  }
  public async index(ctx: HttpContext){
    const {request, response } = ctx;
    const {page, limit} = request.qs();
    const USER_UUID = request.userJwt.uuid;
    const cart = await Cart.query()
    .where('user_uuid',USER_UUID)
    .offset(page).limit(limit);
    
    return response.status(StatusCode.OK).json({cart, page: {page, limit}});
  }

  public async show(ctx:HttpContext){
    //validações aqui.
     
    const {request, response, params} = ctx;
    const USER_UUID = request.userJwt.uuid;
    const hasItemInCart = await Cart.query()
    .where('product_uuid', params.uuid)
    .andWhere('user_uuid', USER_UUID).first();

    if(hasItemInCart==null){
      return response.status(StatusCode.NOT_FOUND).json({
        success: false,
        item: null,
        message: 'product not found'
      }); 
    }

    return response.status(StatusCode.OK).json({
      success: true,
      item: hasItemInCart
    }); 
  }
  
  public async store(ctx: HttpContext){
    //validações aqui.
    const {request, response} = ctx;
    const body = request.only([
      'product_uuid',
      'unity'
    ]);
    let cart: Cart = null;
    const USER_UUID = request.userJwt.uuid;
    const hasItemInCart = await Cart.query()
    .where('product_uuid', body.product_uuid)
    .andWhere('user_uuid', USER_UUID).first();

    if(hasItemInCart==null){
      cart = await Cart.create({
        unity: body.unity,
        product_uuid: body.product_uuid,
        user_uuid: USER_UUID,
      });
    }else{
      //calculo do preço tbm vai aqui...
      hasItemInCart.unity = body.unity;
      hasItemInCart.save();
      cart = hasItemInCart;
    }

    return response.status(StatusCode.CREATED).json({
      success: true,
      item: cart,
      message: 'product has created'
    }); 
  }

  public async update(ctx: HttpContext){
    //validação é necessaria.
    const {request, response, params} = ctx;
    
    const body = request.only([
      'unity'
    ]);
    let cart: Cart = null;
    const USER_UUID = request.userJwt.uuid;
    const hasItemInCart = await Cart.query()
    .where('product_uuid', params.uuid)
    .andWhere('user_uuid', USER_UUID).first();

    if(hasItemInCart==null){
      return response.status(StatusCode.NOT_FOUND).json({
        success: false,
        item: null,
        message: 'product not found'
      }); 
    }else{
      hasItemInCart.unity = body.unity;
      hasItemInCart.save();
      cart = hasItemInCart;
    }

    return response.status(StatusCode.OK).json({
      success: true,
      item: cart,
      message: 'product has edited'
    }); 
  }

  public async delete(ctx: HttpContext){
    //validações aqui.
    const {request, response, params} = ctx; 
    const USER_UUID = request.userJwt.uuid;
    const hasItemInCart = await Cart.query()
    .where('product_uuid', params.uuid)
    .andWhere('user_uuid', USER_UUID).first();

    if(hasItemInCart==null){
      return response.status(StatusCode.NOT_FOUND).json({
        success: false,
        item: null,
        message: 'product not found'
      }); 
    }
    await hasItemInCart.delete();
    return response.status(StatusCode.NO_CONTENT).json({
      success: true,
    }); 
    
  }
}

export default CartController;