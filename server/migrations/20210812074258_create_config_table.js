exports.up = function (knex) {
  return knex.schema.createTable('config', function (table) {
    table.increments()
    table.string('view')
    table.integer('update_frequency')
    table.integer('selected_vehicle_id').unsigned()
    table.string('google_maps_api_key')
    table.boolean('basic_auth_enabled').defaultTo(false)
    table.string('basic_auth_username')
    table.string('basic_auth_password')

    table
      .foreign('selected_vehicle_id')
      .references('vehicles.id')
      .onDelete('set null')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('config')
}
