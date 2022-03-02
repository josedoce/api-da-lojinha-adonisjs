import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StatusCode } from 'App/Enum/HttpCode';
import User from 'App/Models/User';
import { decodeToken } from 'App/Utils/jsonwebtoken';

export default class BearerAuthorization {
  public async handle({response, request}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const bearerToken = request.headers().authorization?.split(' ');
    if(!bearerToken){
      response.status(StatusCode.FORBIDDEN).json({
        success: false, 
        token: 1, 
        message: 'Bearer token is necessary for this route.'
      });
      return;
    }

    const validatedToken = decodeToken(bearerToken[1]);
    if(validatedToken == null){
      response.status(StatusCode.UNAUTHORIZED).json({
        success: false, 
        token: null, 
        message: 'Token is invalid or expired.',
      });
      return;
    }
    const user = await User.query()
    .select('is_logged')
    .where('email', validatedToken.email).first();

    if(user == null){
      response.status(StatusCode.UNAUTHORIZED).json({
        success: false, 
        token: null, 
        message: 'Token isn\'t compatible or user isn\'t exists.',
      });
      return;
    }

    const isLogged = Boolean(user.is_logged);
    const isLoggedToken = Boolean(validatedToken);
    if(isLogged !== isLoggedToken){
      response.status(StatusCode.UNAUTHORIZED).json({
        success: false, 
        token: null, 
        message: 'Token was invalided and user isn\'t logged.',
      });
      return;
    }
    request.userJwt = validatedToken;
    await next()
  }
}
