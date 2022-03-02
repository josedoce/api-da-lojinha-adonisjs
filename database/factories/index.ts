import Factory, { FactoryContextContract } from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product';

export const ProductsFactory = Factory
.define(Product, ({faker})=>{
  return {
    name: faker.commerce.productName(),
    seller_uuid: '1a7280f3-58fa-4fa3-90e6-6937e1f99711'
  }
}).build();