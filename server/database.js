import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const database = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export default database
