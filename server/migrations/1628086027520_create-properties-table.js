/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('properties', {
    id: 'id',
    unique_id: { type: 'varchar(1000)', notNull: true, unique: true },
    shown: { type: 'boolean', notNull: true },
    pinned: { type: 'boolean', notNull: true },
  })
}

exports.down = (pgm) => {}
