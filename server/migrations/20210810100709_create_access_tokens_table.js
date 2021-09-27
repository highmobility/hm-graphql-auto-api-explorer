exports.up = async (knex) => {
  return knex.schema.createTable('access_tokens', function (table) {
    table.increments()
    table.integer('vehicle_id').unsigned().notNullable()
    table.string('access_token', 1000)
    table.string('refresh_token', 1000)
    table.string('scope', 100000)

    table.foreign('vehicle_id').references('vehicles.id').onDelete('cascade')
  })
}

exports.down = async (knex) => {
  return knex.schema.dropTable('access_tokens')
}
