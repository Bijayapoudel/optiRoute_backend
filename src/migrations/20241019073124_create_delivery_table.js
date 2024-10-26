/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up=function(knex){
    return knex.schema.createTable('deliveries', function(table){
        table.increments('id').primary();
        table.integer('stop_id').unsigned().references('id').inTable('stops').onDelete('CASCADE');
        table.enum('status', ['0', '1', '2', '3', '4']).notNullable().defaultTo('0');
        // 0 is pending, 1 is in progress, 2 is completed, 3 is cancelled, 4 is postponed
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
