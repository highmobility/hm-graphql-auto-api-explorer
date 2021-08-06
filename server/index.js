import router from './routes'
import path from 'path'
import express from 'express'
import cors from 'cors'

const PORT = process.env.PORT || 3001
const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

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
