import dotenv from 'dotenv'

dotenv.config()

const config = {
  databaseUrl: process.env.DATABASE_URL,
}

export default config
