import { HttpContext } from "@adonisjs/core/build/standalone";
import { StatusCode } from "App/Enum/HttpCode";
import ClientProfile from "App/Models/ClientProfile";
import User from "App/Models/User";

class ClientController {
  public async index(ctx: HttpContext) {
    const {page, limit} = ctx.request.qs();
    let clients  = await ClientProfile
      .query()
      .offset(page)
      .limit(limit);
    return ctx.response.status(200).json({ clients });
  }

  public async show(ctx: HttpContext) {
    const { uuid } = ctx.params;

    let client = await ClientProfile
      .query()
      .where('user_uuid', uuid)
      .preload('user')
      .first();

    if(!client){
      return ctx.response.status(404).json({
        success: false, 
        token: null, 
        message: 'client profile dont exists'
      });
    }

    return ctx.response.status(200).json(client);
  }

  public async store(ctx: HttpContext) {
    const body = ctx.request.only(['cpf']);
    const user = await User.findOrFail(ctx.request.userJwt.uuid);
    if(!user){
      return ctx.response.status(404).json({
        success: false, 
        token: null, 
        message: 'user dont exists'
      });
    }

    const clientProfileCreated = await user.related('clientProfile').create({
      cpf: body.cpf
    });
    
    if(clientProfileCreated.$isPersisted){
      return ctx.response.status(203).json({
        success: true, 
        token: null, 
        message: 'client profile is created'
      });
    }

    return ctx.response.status(400).json({
      success: false, 
      token: null, 
      message: 'user dont created'
    });
  }

  public async update(ctx: HttpContext) {
    const {uuid} = ctx.params;
    const body = ctx.request.only(['cpf']);
    const user = await User.findOrFail(ctx.request.userJwt.uuid);
    if(!user){
      return ctx.response.status(404).json({
        success: false, 
        token: null, 
        message: 'user dont exists'
      });
    }

    const clientProfileCreated = await user.related('clientProfile')
    .query()
    .update({cpf: body.cpf});


    if(clientProfileCreated){
      return ctx.response.status(203).json({
        success: true, 
        token: null, 
        message: 'client profile is created',
      });
    }

    return ctx.response.status(400).json({
      success: false, 
      token: null, 
      message: 'user dont created'
    });
  }

  public async delete(ctx: HttpContext) {
    const { response, request, params } = ctx;
    const user = await User.findOrFail(params.uuid);
    if(!user){
      return ctx.response.status(404).json({
        success: false, 
        token: null, 
        message: 'user dont exists'
      });
    }
    const clientProfileCreated = await user.related('clientProfile')
    .query()
    .where('user_uuid', params.uuid)
    .delete();
    
    return response.status(StatusCode.NO_CONTENT);
  }
}

export default ClientController;