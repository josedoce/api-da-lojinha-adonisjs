import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Hash from '@ioc:Adonis/Core/Hash';
import User from 'App/Models/User';

interface IUser {
  name: string;
  email: string;
  password: string;
  is_client?: boolean;
  is_seller?: boolean;
  is_admin?: boolean;
}

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true
  public async run () {
    const defaultPassword = '12345678';
    const users: IUser[] = [
      {
        name: 'usuario',
        email: 'usuario@gmail.com',
        password: '',
      },
      {
        name: 'cliente',
        email: 'cliente@gmail.com',
        password: '',
        is_client: true,
      },
      {
        name: 'vendedor',
        email: 'vendedor@gmail.com',
        password: '',
        is_seller: true,
      },
      {
        name: 'administrador',
        email: 'administrador@gmail.com',
        password: '',
        is_admin: true,
      },
    ];
    const userWithHashInPassword = await Promise.all(
      users.map(
        async (obj: IUser)=>{
          obj.password = await Hash.make(defaultPassword);
          return obj;
        }
      )
    );
    
    await User.createMany(userWithHashInPassword);
  }
}
