import {Secret, sign, verify} from 'jsonwebtoken';
const SECRET_KEY: Secret = process.env.APP_KEY || 'umachavequalquer';
interface IPayload {
  uuid: string;
  email: string;
  is_admin?: boolean;
  is_client?: boolean;
  is_seller?: boolean;
}

function generateToken(payload: IPayload, remember: boolean){
  const expiresIn = remember?(60*60*24*7):(60*60*24);

  return sign(payload, SECRET_KEY, {expiresIn: expiresIn});
}

function decodeToken(token: string){
  try{
    return verify(token, SECRET_KEY);
  }catch(e){
    return null;
  }
}

export {
  generateToken,
  decodeToken,
  IPayload
};