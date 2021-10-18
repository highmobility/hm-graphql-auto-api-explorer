exports.up = async (knex) => {
  await knex.schema.table('properties', function (table) {
    table.dropColumn('id')
  })

  return knex.schema.createTable('property_values', function (table) {
    table.string('property_unique_id', 1000)
    table.integer('vehicle_id').unsigned().notNullable()
    table.json('value')
    table.datetime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6))

    table.foreign('vehicle_id').references('vehicles.id').onDelete('cascade')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('property_values')

  return knex.schema.table('properties', function (table) {
    table.increments()
  })
}
