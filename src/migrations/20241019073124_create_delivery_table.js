/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up=function(knex){
    return knex.schema.createTable('deliveries', function(table){
        table.increments('id').primary();
        table.integer('stop_id').unsigned().references('id').inTable('stops').onDelete('CASCADE');
        table.string('status').notNullable();
        table.string('note');
        table.integer('ratings').notNullable();
        table.boolean('is_deleted').defaultTo(false);
        table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('deliveries');
};
