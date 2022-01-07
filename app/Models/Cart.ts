import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public unity: number;

  @column()
  public price_per_unity: number;

  @column()
  public total: number;

  @column()
  public user_uuid: string;

  @column()
  public product_uuid: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

}
