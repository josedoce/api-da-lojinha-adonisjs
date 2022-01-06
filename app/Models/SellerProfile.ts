import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuid} from 'uuid';
import Product from './Product';

export default class SellerProfile extends BaseModel {
  @column({ isPrimary: true })
  public uuid: string;
  
  @column()
  public user_uuid: string;
  
  @column()
  public cpf: string;
  
  
  @hasMany(()=>Product, {foreignKey: 'seller_uuid'})
  public products: HasMany<typeof Product>;
  // @column()
  // public holder: string;
  
  // @column()
  // public bank_agency: string;
  
  // @column()
  // public account_number: string;
  
  // @column()
  // public phone_number: string;
  
  // @column()
  // public address: string;
  
  // @column()
  // public city: string;
  
  // @column()
  // public district: string;
  
  // @column()
  // public zip_code: string;
  
  // @column()
  // public federative_unit: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async crieUUID(model: SellerProfile){
    if(!model.uuid){
      model.uuid = uuid();
    }
  }
}
