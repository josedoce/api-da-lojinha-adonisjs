import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AdminProfile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cpf: string;
  
  @column()
  public rg: string;
  
  @column()
  public phone_number: string;
  
  @column()
  public sector: string;
  
  @column()
  public hierarchy: string;
  
  @column()
  public address: string;
  
  @column()
  public city: string;
  
  @column()
  public district: string;
  
  @column()
  public zip_code: string;
  
  @column()
  public federative_unit: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
