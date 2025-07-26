import { createConnection } from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

export const connection = await createConnection({
  host: process.env.DATABASE_HOST, 
  user: process.env.DATABASE_USERNAME, 
  password: process.env.DATABASE_PASSWORD, 
  database: process.env.DATABASE_NAME
})
