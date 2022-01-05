import { IPayload } from "App/Utils/jsonwebtoken";

declare module '@ioc:Adonis/Core/Request' {
  export interface RequestContract {
    userJwt: IPayload;
  }
}