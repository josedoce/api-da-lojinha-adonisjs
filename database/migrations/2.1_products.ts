import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary();
      table.string('name');
      // table.text('description');
      // table.string('code');
      // table.decimal('price',2);
      // table.integer('available').defaultTo(0);
      // table.string('format_box');
      // table.string('weight'); 
      // table.string('length');
      // table.string('height');
      // table.string('width');
      // table.string('freight service');
      // table.string('diameter');
      // table.boolean('is_okay').defaultTo(false);
      table.uuid('seller_uuid')
        .references('seller_profiles.uuid');
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
