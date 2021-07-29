import router from './routes'
import path from 'path'
import express from 'express'
import database from './database'

const PORT = process.env.PORT || 3001
const app = express()

// Connect database
database.connect()

// Api routes
app.use(express.json())
app.use('/api', router)

// Client routes
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

// Init server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
