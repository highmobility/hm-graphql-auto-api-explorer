const crypto = require('crypto')

exports.up = async function (knex) {
  await knex.schema.table('config', function (table) {
    table.string('webhook_secret')
  })

  const config = await knex('config').first()
  const randomString = crypto.randomBytes(64).toString('hex').substring(0, 30)

  if (!config) {
    await knex('config').insert({
      webhook_secret: randomString,
    })
  } else {
    await knex('config').first().update({
      webhook_secret: randomString,
    })
  }

  // TODO: create config row if doesnt exist, add webhook secret
}

exports.down = function (knex) {
  return knex.schema.table('config', function (table) {
    table.dropColumn('webhook_secret')
  })
}
