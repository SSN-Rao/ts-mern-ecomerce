
import { ProductModel } from './models/productModel'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'
import { userRouter } from './routers/userRouter'
import { orderRouter } from './routers/orderRouter'

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
    origin: true, // Allow all origins for development (Codespaces compatibility)
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/product', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter) 
app.use('/api/seed', seedRouter)

// Root route to return all products
app.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find({})
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' })
  }
})

const PORT = 4000
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
