import { knex as initKnex } from 'knex'
import dotenv from 'dotenv'

dotenv.config()

export const knex = initKnex({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public'],
})
