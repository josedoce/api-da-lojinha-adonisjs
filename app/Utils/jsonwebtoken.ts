import {Secret, sign, verify} from 'jsonwebtoken';
const SECRET_KEY: Secret = process.env.APP_KEY || 'umachavequalquer';
interface IPayload {
  uuid: string;
  email: string;
  is_admin?: boolean;
  is_client?: boolean;
  is_seller?: boolean;
  is_logged?: boolean;
}

function generateToken(payload: IPayload, remember: boolean){
  const expiresIn = remember?(60*60*24*7):(60*60*24);
  payload.is_logged = true;
  return sign(payload, SECRET_KEY, {expiresIn: expiresIn});
}

function decodeToken(token: string): IPayload | null{
  try{
    return verify(token, SECRET_KEY) as IPayload;
  }catch(e){
    return null;
  }
}

export {
  generateToken,
  decodeToken,
  IPayload
};