/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('routes', function (table) {
    table.increments('id').primary(); // Primary key for the Route
    table.bigInteger('admin_id').unsigned().references('id').inTable('admins').onDelete('CASCADE');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('name').notNullable(); // Route name
    table.string('note'); // Additional notes about the route
    table.enu('optimize_mode', ['shortest', 'fastest']).notNullable(); // Optimization mode
    table.enu('travel_mode', ['driving', 'bicycling', 'walking']).notNullable(); // Travel mode
    table.boolean('is_optimized').defaultTo(false); // Indicates if the route is optimized
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
