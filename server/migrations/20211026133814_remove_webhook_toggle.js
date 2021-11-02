exports.up = function (knex) {
  return knex.schema.table('config', function (table) {
    table.dropColumn('continuous_database_logging')
  })
}

exports.down = function (knex) {
  return knex.schema.table('config', function (table) {
    table.boolean('continuous_database_logging').defaultTo(false)
  })
}
