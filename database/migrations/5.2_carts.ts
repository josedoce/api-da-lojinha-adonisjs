import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Carts extends BaseSchema {
  protected tableName = 'carts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.uuid('product_uuid')
            .references('products.uuid');
      table.uuid('user_uuid')
            .references('users.uuid')
            .onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('unity').defaultTo(0);
      table.decimal('price_per_unity').defaultTo(0);
      table.decimal('total').defaultTo(0);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
