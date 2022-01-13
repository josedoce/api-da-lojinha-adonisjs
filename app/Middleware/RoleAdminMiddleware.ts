import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StatusCode } from 'App/Enum/HttpCode';

export default class RoleAdminMiddleware {
  public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
    if(!request.userJwt.is_admin){
      return response.status(StatusCode.FORBIDDEN).json({
        success: false, 
        token: null, 
        message: 'Token was invalided and user admin isn\'t logged.',
      });
    }
    await next();
  }
}
