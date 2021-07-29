/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('config', {
    id: 'id',
    env: { type: 'varchar(1000)', notNull: true },
    app_id: { type: 'varchar(1000)', notNull: true },
    client_private_key: { type: 'varchar(1000)', notNull: true },
    client_certificate: { type: 'varchar(1000)', notNull: true },
    client_id: { type: 'varchar(1000)', notNull: true },
    client_secret: { type: 'varchar(1000)', notNull: true },
    auth_url: { type: 'varchar(1000)', notNull: true },
    token_url: { type: 'varchar(1000)', notNull: true },
  })
}

exports.down = (pgm) => {}
