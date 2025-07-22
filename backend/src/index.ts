import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ts-ecommerce'
mongoose.set('strictQuery', true)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  })
  


const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  })
)

app.use('/api/product', productRouter)
app.use('/api/seed', seedRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
