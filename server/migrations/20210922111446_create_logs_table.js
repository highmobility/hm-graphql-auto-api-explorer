exports.up = function (knex) {
  return knex.schema.createTable('logs', function (table) {
    table.increments()
    table.string('vin')
    table.datetime('request_time', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.json('response')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('logs')
}
