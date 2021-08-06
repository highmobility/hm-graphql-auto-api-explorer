import { knex as initKnex } from 'knex'
import config from './config'

export const knex = initKnex({
  client: 'pg',
  connection: config.databaseUrl,
  searchPath: ['knex', 'public'],
})
