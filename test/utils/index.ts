import ClientProfile from 'App/Models/ClientProfile';
import User from 'App/Models/User';
import {decodeToken, generateToken} from 'App/Utils/jsonwebtoken';
import { v4 } from 'uuid';
interface C {
  name: string;
  email: string;
  password: string;
}
const credentials:C = {
  name: 'usuarioteste2',
  email: '',
  password: 'umdoistresquatro'
};

interface IUserIs {
  is_admin?: boolean;
  is_client?: boolean;
  is_seller?: boolean;
  is_logged?: boolean;
}
const defaultUserIs: IUserIs = {
  is_admin: false,
  is_client: false,
  is_logged: true,
  is_seller: false
};
export interface IToken {
  token: string, 
  tokenDecoded: {
    email: string, 
    uuid: string
  }
}
export const createToken = async (userIs: IUserIs=defaultUserIs):Promise<IToken|null> =>{
  const {is_admin, is_client, is_seller } = userIs;
  const credentials:C = {
    name: `${(is_admin?'administrador':'user' || is_client?'cliente':'user' || is_seller?'vendedor':'user')}_${v4()}`,
    email: `${(is_admin?'administrador':'user' || is_client?'cliente':'user' || is_seller?'vendedor':'user')}_${v4()}@gmail.com`,
    password: '12345678',
  };
  
  const user = await User.create({
    ...credentials,
    ...userIs
  });

  if(user.$isPersisted){
    const userUuid = await User.query()
    .select('uuid')
    .where('email', credentials.email)
    .first();

    const token = generateToken({
      uuid: userUuid.uuid,
      email: user.email,
      ...userIs
    }, false);
    return {
      tokenDecoded: decodeToken(token),
      token
    }
  } else {
    return null;
  }
}
export interface IClientProfile {
  user: User;
  profile: ClientProfile;
}
export const createClientProfile = async (clienteUuid: string):Promise<IClientProfile|null> =>{

  const user = await User.findOrFail(clienteUuid);
  const clientCreated = await user.related('clientProfile').create({
    cpf: '000.000.000-00'
  });
  
  
  if(clientCreated.$isPersisted){
  
    return {
      user: user,
      profile: clientCreated
    }
  } else {
    return null;
  }

}

export const deleteClientProfile = async(uuid: string = null) => {

  if(uuid == null){
    await ClientProfile.query().delete();
    return;
  }
  await (await ClientProfile.find(uuid)).delete();

}

export const deleteToken = async (uuid: string = null) => {

  if(uuid == null) {
    await User.query().delete();
    return;
  }
  await (await User.find(uuid)).delete();

}

const utils = {
  createToken,
  credentials
};
export default utils; 