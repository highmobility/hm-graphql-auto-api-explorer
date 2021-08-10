require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: `${__dirname}/server/migrations`,
  },
}
