exports.up = async function (knex) {
  await knex.schema.table('config', function (table) {
    table.boolean('continuous_database_logging').defaultTo(false)
  })

  return knex.schema.createTable('logs', function (table) {
    table.increments()
    table.string('vin')
    table.datetime('request_time', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.json('response')
  })
}

exports.down = async function (knex) {
  await knex.schema.table('config', function (table) {
    table.dropColumn('continuous_database_logging')
  })

  return knex.schema.dropTable('logs')
}
