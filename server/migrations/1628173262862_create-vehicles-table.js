/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('vehicles', {
    id: 'id',
    vin: { type: 'varchar(255)', notNull: true },
    brand: { type: 'varchar(255)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('vehicles')
}
