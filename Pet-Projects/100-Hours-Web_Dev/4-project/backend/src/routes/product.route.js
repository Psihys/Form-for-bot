import express from 'express'
import {
    createProduct,
  deleteProduct,
  getAllProducts,
  getCategoryProducts,
  getFeaturedProducts,
  getProductPage,
  getRecomendedProducts,
  toggleFeaturedProduct,
} from '../controllers/products.controller.js'
import { protectRoute, adminRoute } from '../meddleware/auth.middleware.js'

const router = express.Router()

router.get('/', protectRoute, adminRoute, getAllProducts)
router.get('/featured', getFeaturedProducts)
router.get("/category/:category", getCategoryProducts);
router.get('/recommended', getRecomendedProducts)
router.get('/products/:id', getProductPage)


router.post("/:id", protectRoute, adminRoute, createProduct);

router.put("/:id", protectRoute, adminRoute, toggleFeaturedProduct);

router.delete("/:id", protectRoute, adminRoute, deleteProduct);
export default router
