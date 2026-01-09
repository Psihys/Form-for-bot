import express from 'express'
import Product from '../models/product.js'
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controller/productsController.js'


const productRouter = express.Router()

// Get all products
productRouter.get('/', getAllProducts)
// Get product by ID
productRouter.get('/:id', getProductById)
// Create a new product
productRouter.post('/', createNewProduct)
// Update a product
productRouter.put('/:id', updateProduct)
// Delete a product
productRouter.delete('/:id', deleteProduct)

export default productRouter
