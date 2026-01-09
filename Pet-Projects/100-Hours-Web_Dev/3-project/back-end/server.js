import express from 'express'
import dotenv from 'dotenv'
import notesRoutes from './src/routes/notesRoutes.js'
import { connectDb } from './src/config/db.js'
import rateLimiter from './src/middleware/rateLimiter.js'
import cors from 'cors'

dotenv.config()

const port = process.env.PORT || 3000

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(rateLimiter)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

connectDb().then(() => {
  app.use('/api/notes', notesRoutes)

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})
