import dotenv from 'dotenv'

dotenv.config()

const config = {
  databaseUrl: `${process.env.DATABASE_URL}?ssl=true`,
}

export default config
