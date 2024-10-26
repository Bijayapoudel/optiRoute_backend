/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('routes', function (table) {
    table.increments('id').primary(); // Primary key for the Route
    table.bigInteger('admin_id').unsigned().references('id').inTable('admins').onDelete('CASCADE');
    table.string('name').notNullable(); // Route name
    table.date('date').notNullable(); // Date of the route
    table.string('note'); // Additional notes about the route
    table.boolean('is_deleted').defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('routes');
};
