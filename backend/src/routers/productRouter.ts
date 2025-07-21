import express from 'express'
import { ProductModel } from '../models/productModel'
import asyncHandler from 'express-async-handler'


export const productRouter = express.Router()
// /api/product
productRouter.get(
    '/', 
    asyncHandler(async (req, res) => {
        const products = await ProductModel.find({})
        res.json(products)
    })
)
// /api/slug/the-product-slug
productRouter.get(
    '/slug/:slug', 
    asyncHandler(async (req, res) => {
        const product = await ProductModel.find({slug: req.params.slug})
        if (product) {
            res.json(product)
        } else {
            res.status(404).send({ message: 'Product Not Found' })
        }
    })
)

