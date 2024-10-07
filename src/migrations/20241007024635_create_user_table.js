/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); 
      table.bigInteger('admin_id').unsigned().references('id').inTable('admins').onDelete('CASCADE'); // Foreign key to admins table
      table.string('name').notNullable();
      table.string('phone_number').notNullable();
      table.string('email').unique().notNullable();
      table.string('address').notNullable();
      table.string('password').notNullable();
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps(true, true); // Automatically manages created_at and updated_at fields
    });
  };
  
   /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  