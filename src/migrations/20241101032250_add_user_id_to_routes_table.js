/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('routes', function (table) {
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.schema.table('routes', function (table) {
    table.dropColumn('user_id'); // Remove the user_id field
  });
};
