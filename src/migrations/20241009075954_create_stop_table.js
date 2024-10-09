/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up=function(knex){
    return knex.schema.createTable('stops', function(table){
        table.increments('id').primary();
        table.integer('route_id').unsigned().references('id').inTable('routes').onDelete('CASCADE');
        table.integer('order').notNullable();
        table.string('name').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('stops');
};
