exports.up = async (knex) => {
  return knex.schema.createTable('vehicles', function (table) {
    table.increments()
    table.string('vin')
    table.string('brand')
  })
}

exports.down = async (knex) => {
  return knex.schema.dropTable('vehicles')
}
