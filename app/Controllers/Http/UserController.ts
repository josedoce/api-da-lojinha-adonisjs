import { HttpContext } from "@adonisjs/core/build/standalone";
import UserService from "App/Services/UserService";

class UserController {
  private userService: UserService;
  constructor(){
    this.userService = new UserService();
  }
  public async index(){
    //alguma lista
  }

  public async show(ctx:HttpContext){
    //validações aqui.
    return await this.userService.signIn(ctx);
  }
  
  public async store(ctx: HttpContext){
    //validações aqui.
    return await this.userService.signUp(ctx);
  }

}

export default UserController;