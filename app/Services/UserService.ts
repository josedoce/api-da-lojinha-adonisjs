import User from "App/Models/User";
import Logger from '@ioc:Adonis/Core/Logger';
import Hash from '@ioc:Adonis/Core/Hash';
import { HttpContext } from "@adonisjs/core/build/standalone";
import { generateToken, IPayload } from "App/Utils/jsonwebtoken";
import { StatusCode } from "App/Enum/HttpCode";

export default class UserService {

  public async signUp({request, response}: HttpContext){
    const body = request.only(['email','password','name','remember']);
    const userExists = await User.query()
    .select('email')
    .where('email', body.email)
    .first();
    if(userExists!=null){
      return response.status(400).json({
        success: false, 
        token: null, 
        message: 'user already exists'
      });
    }
    const user = new User();
    
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    await user.save();
    if(!user.$isPersisted){
      Logger.warn('has not saved');
      return response.status(201).json({
        success: true, 
        token: null, 
        message: 'has not saved'
      });
    };
    Logger.info('has saved');
    const userUuid = await User.query()
    .select('uuid')
    .where('email', body.email)
    .first();

    if(userUuid == null){
      return response.status(201).json({
        success: false, 
        token: null, 
        message: 'do not create token, try sign in again'
      });
    }
    user.is_logged = true;
    user.save();
    user.uuid = userUuid.uuid;
    const payload = this.generatePayload(user);
    const token = generateToken(payload, body.remember);
    
    return response.status(201).json({
      success: true, 
      token: token, 
      message: 'user is created',
    });
  }

  public async signIn({request, response}: HttpContext){
    const body = request.only(['email','password','remember']);
    const userExists = await User.query()
    .select('uuid','email','password')
    .where('email', body.email)
    .first();
    if(userExists==null){
      return response.status(400).json({
        success: false, 
        token: null, 
        message: 'user don\'t exists'
      });
    }
    const isValidPassword = await Hash.verify(userExists.password, body.password);
    //return {isValidPassword, userPassword: userExists.password, body: body.password};
    if(!isValidPassword){
      return response.status(400).json({
        success: false, 
        token: null, 
        message: 'password is invalid'
      });
    }
    userExists.is_logged = true;
    userExists.save();
    const payload = this.generatePayload(userExists);
    const token = generateToken(payload, body.remember);

    return response.status(200).json({
      success: true, 
      token: token, 
      message: 'user is authenticated',
    });
  }

  public async signOut({request, response}: HttpContext){
    const user = await User.query()
    .select('*')
    .where('email', request.userJwt.email).first();
    if(user == null){
      return response.status(StatusCode.NOT_FOUND).json({
        success: true,
        token: null,
        message: 'user not found, logout isn\'t ok.',
      });
    }
    user.is_logged = false;
    user.save();
    
    return response.status(StatusCode.OK).json({
      success: true,
      token: null,
      message: 'logout is ok.',
      data: null
    });
  }

  private generatePayload(user: User){
    const payload: IPayload = {
      uuid: user.uuid,
      email: user.email,
      is_admin: user.is_admin,
      is_client: user.is_client,
      is_seller: user.is_seller
    };
    return payload;
  }
}