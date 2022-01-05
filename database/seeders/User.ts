import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

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
    const users: IUser[] = [
      {
        name: 'usuario',
        email: 'usuario@gmail.com',
        password: '$bcrypt$v=98$r=10$wJ8+Zp/mcdmW65TOjxb8Ug$edMnltsONxWXR4tm3RNCyL7SQFMtCXs',
      },
      {
        name: 'cliente',
        email: 'cliente@gmail.com',
        password: '$bcrypt$v=98$r=10$wJ8+Zp/mcdmW65TOjxb8Ug$edMnltsONxWXR4tm3RNCyL7SQFMtCXs',
        is_client: true,
      },
      {
        name: 'vendedor',
        email: 'vendedor@gmail.com',
        password: '$bcrypt$v=98$r=10$wJ8+Zp/mcdmW65TOjxb8Ug$edMnltsONxWXR4tm3RNCyL7SQFMtCXs',
        is_seller: true,
      },
      {
        name: 'administrador',
        email: 'administrador@gmail.com',
        password: '$bcrypt$v=98$r=10$wJ8+Zp/mcdmW65TOjxb8Ug$edMnltsONxWXR4tm3RNCyL7SQFMtCXs',
        is_admin: true,
      },
    ];
    await User.createMany(users);
  }
}