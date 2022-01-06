import { BaseModel, beforeCreate, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash';
import { DateTime } from 'luxon'
import {v4 as uuid} from 'uuid';
import ClientProfile from './ClientProfile';
import Favorite from './Favorite';
import SellerProfile from './SellerProfile';
export default class Product extends BaseModel {

  @column({ isPrimary: true })
  public uuid: string

  @column()
  public seller_uuid: string

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async crieUUID(model: Product){
    if(!model.uuid){
      model.uuid = uuid();
    }
  }
}
