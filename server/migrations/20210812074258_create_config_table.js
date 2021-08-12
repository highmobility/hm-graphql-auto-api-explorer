exports.up = function (knex) {
  return knex.schema.createTable('config', function (table) {
    table.increments()
    table.string('view')
    table.integer('updateFrequency')
    table.integer('selected_vehicle_id').unsigned()
    table.string('google_maps_api_key')

    table
      .foreign('selected_vehicle_id')
      .references('vehicles.id')
      .onDelete('set null')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('config')
}
