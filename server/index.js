import router from './routes'
import path from 'path'
import express from 'express'
import cors from 'cors'
import basicAuth from 'express-basic-auth'
import { knex } from './database'
import argon2 from 'argon2'
import https from 'https'
import http from 'http'
import fs from 'fs'
import dotenv from 'dotenv'
import sslRedirect from 'heroku-ssl-redirect'

dotenv.config()

const PORT = process.env.PORT || 3001
const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use(sslRedirect())

// app.use(
//   basicAuth({
//     authorizer: async (username, password) => {
//       const authorize = async () => {
//         const config = await knex('config').first()
//         if (!config.basic_auth_enabled) {
//           return true
//         }

//         const passwordValid = await argon2.verify(
//           config.basic_auth_password,
//           password
//         )
//         return username === config.basic_auth_username && passwordValid
//       }

//       const res = await authorize()
//       return res
//     },
//     challenge: true,
//   })
// )

// Api routes
app.use(express.json())
app.use('/api', router)

// Client routes
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

if (process.env.NODE_ENV === 'production') {
  http.createServer(app).listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
  })
} else {
  // For localhost, use self-signed cert to force https
  https
    .createServer(
      {
        key: fs.readFileSync(`${__dirname}/client-key.pem`),
        cert: fs.readFileSync(`${__dirname}/client-cert.pem`),
      },
      app
    )
    .listen(PORT, () => {
      console.log(`Server listening on ${PORT}`)
    })
}
