/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('admins', (table) => {
      table.bigIncrements('id').primary();
      table.string('name').notNullable();
      table.string('phone_number').notNullable();
      table.string('company').notNullable();
      table.string('address').notNullable();
      table.string('email').notNullable().unique();
      table.string('profile_image');
      table.string('password').notNullable();
      table.enum('role', ['0', '1', '2', '3']).notNullable().defaultTo('1'); //0 is superAdmin and 1 is admin 
      table.enum('status', ['0', '1']).notNullable().defaultTo('0');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('admins');
  };
  