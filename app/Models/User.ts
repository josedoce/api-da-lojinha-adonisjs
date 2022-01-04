import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash';
import { DateTime } from 'luxon'
import {v4 as uuid} from 'uuid';

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
