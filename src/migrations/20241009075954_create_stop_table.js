/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('stops', function (table) {
    table.increments('id').primary();
    table.integer('route_id').unsigned().references('id').inTable('routes').onDelete('CASCADE');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('order').notNullable();
    table.string('name').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    // 0 is pending, 1 is in progress, 2 is completed, 3 is cancelled, 4 is postponed
    table.enum('delivery_status', ['0', '1', '2', '3', '4']).notNullable().defaultTo('0');
    table.string('note');
    // 0 to 5
    table.integer('ratings').notNullable();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('stops');
};
