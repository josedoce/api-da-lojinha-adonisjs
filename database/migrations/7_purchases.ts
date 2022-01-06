import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Purchases extends BaseSchema {
  protected tableName = 'purchases'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary();
      table.uuid('product_uuid')
            .references('products.uuid')
            .onDelete('CASCADE').onUpdate('CASCADE');
      table.uuid('user_uuid')
            .references('client_profiles.uuid')
            .onDelete('CASCADE').onUpdate('CASCADE');
      table.uuid('seller_uuid')
            .references('seller_profiles.uuid')
            .onDelete('CASCADE').onUpdate('CASCADE');
      table.boolean('cancel').defaultTo(false);
            /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
