import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid';
import User from './User';

export default class ClientProfile extends BaseModel {
  @column({ isPrimary: true })
  public uuid: string;

  @column()
  public user_uuid: string;

  @column()
  public cpf: string;
  
  @belongsTo(()=> User, { foreignKey: 'user_uuid'})
  public user: BelongsTo<typeof User>
  // @column()
  // public holder: string;
  
  // @column()
  // public card_number: string;
  
  // @column()
  // public card_validity: string;
  
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
  // public receiver: string;
  
  // @column()
  // public federative_unit: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async crieUUID(model: ClientProfile){
    if(!model.uuid){
      model.uuid = uuid();
    }
  }
}
