/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('access_tokens', {
    id: 'id',
    vehicle_id: {
      type: 'integer',
      notNull: true,
      references: '"vehicles"',
      onDelete: 'cascade',
    },
    access_token: { type: 'varchar(1000)', notNull: true },
    refresh_token: { type: 'varchar(1000)', notNull: true },
    scope: { type: 'varchar(100000)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('access_tokens')
}
