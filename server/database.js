import { knex as initKnex } from 'knex'
import config from '../knexfile'

export const knex = initKnex(config)
