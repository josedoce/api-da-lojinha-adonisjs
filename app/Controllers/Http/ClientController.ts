import { HttpContext } from "@adonisjs/core/build/standalone";
import User from "App/Models/User";

class ClientController {
  public async index(ctx: HttpContext) {
    const U = '1c816e6e-ab6c-4261-831d-99bb170edaba';
    let z = await User.query().where('uuid', U)
    .preload('clientProfile')
    .preload('productsInCart')
    .preload('productsInFavorites').first();
    return ctx.response.status(200).json({user: z});
  }
}

export default ClientController;