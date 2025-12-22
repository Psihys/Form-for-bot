import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'

import connectDB from './lib/db.js'

const app = express()

dotenv.config()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  connectDB()
})
