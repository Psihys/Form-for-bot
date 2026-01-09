import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js'
import Product from './models/product.js'
import productRouter from './routes/productRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use('/api/products', productRouter)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})
// Start the server
app.listen(process.env.PORT, () => {
  if (connectDb()) {
    console.log('Connected to MongoDB')
  } else {
    console.log('Error connecting to MongoDB')
  }
  console.log(`Server is running on port ${process.env.PORT}`)
})
