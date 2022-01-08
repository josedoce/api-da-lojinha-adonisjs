import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import User from './User';

export default class Shelve extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public product_uuid: string;

  @hasMany(()=>Product,{localKey: 'product_uuid'})
  public products: HasMany<typeof Product>;

  @column()
  public user_uuid: string;

  @belongsTo(()=>User, {foreignKey: 'user_uuid'})
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
