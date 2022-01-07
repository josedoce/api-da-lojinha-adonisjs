import { BaseModel, beforeCreate, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash';
import { DateTime } from 'luxon'
import {v4 as uuid} from 'uuid';
import ClientProfile from './ClientProfile';
import Favorite from './Favorite';
import SellerProfile from './SellerProfile';
import Cart from './Cart';
export default class User extends BaseModel {

  @column({ isPrimary: true })
  public uuid: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public is_client: boolean;

  @column()
  public is_seller: boolean;

  @column()
  public is_admin: boolean;

  @column()
  public is_logged: boolean;

  @hasOne(()=> ClientProfile, {foreignKey: 'user_uuid'})
  public clientProfile: HasOne<typeof ClientProfile>;
  
  @hasOne(()=> SellerProfile, {foreignKey: 'user_uuid'})
  public sellerProfile: HasOne<typeof SellerProfile>;
  
  @hasMany(()=> Favorite, {foreignKey: 'user_uuid'})
  public productsInFavorites: HasMany<typeof Favorite>;
  
  @hasMany(()=> Cart, {foreignKey: 'user_uuid'})
  public productsInCart: HasMany<typeof Cart>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async crieUUID(model: User){
    if(!model.uuid){
      model.uuid = uuid();
    }
    if(model.$dirty.password){
      model.password = await Hash.make(model.password);
    }
  }
}
