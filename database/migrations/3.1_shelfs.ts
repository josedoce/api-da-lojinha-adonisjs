import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shelf extends BaseSchema {
  protected tableName = 'shelfs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      
      table.uuid('seller_uuid')
        .references('seller_profiles.uuid')
        .onDelete('CASCADE').onUpdate('CASCADE');
      // table.integer('unity').defaultTo(0);
      // table.decimal('price_per_unity').defaultTo(0);
      // table.decimal('total').defaultTo(0);

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


