exports.up = async function (knex) {
  await knex.schema.alterTable('vehicles', function (table) {
    table.string('fleet_clearance').nullable()
  })
}

exports.down = async function (knex) {
  await knex.schema.alterTable('vehicles', function (table) {
    table.dropColumn('fleet_clearance')
  })
}
