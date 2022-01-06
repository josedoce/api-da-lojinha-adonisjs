import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ClientInformation extends BaseSchema {
  protected tableName = 'admin_profiles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary();
      table.string('cpf').notNullable();
      // table.string('rg').notNullable();
      // table.string('phone_number').notNullable();
      // table.string('sector').notNullable();
      // table.string('hierarchy').notNullable();
      // table.string('address').notNullable();
      // table.string('city').notNullable();
      // table.string('district').notNullable();
      // table.string('zip_code').notNullable();
      // table.string('federative_unit').notNullable();
      table.uuid('user_uuid')
        .references('users.uuid')
        .onDelete('CASCADE').onUpdate('CASCADE');
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
