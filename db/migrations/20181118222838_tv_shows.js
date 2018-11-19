exports.up = function(knex, Promise) {
  return knex.schema.createTable('shows', function(table){
    table.increments();
    table.string('name').notNullable().unique();
    table.string('email').notNullable();
    table.string('country').notNullable();
    table.integer('phone').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shows');
};