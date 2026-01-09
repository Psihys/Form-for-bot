import express from 'express'
import { addToCart } from '../controllers/cart.controller'
import { protectRoute } from '../meddleware/auth.middleware'

const router = express.Router()

router.get('/', protectRoute, getAllFromCart)
router.post('/', protectRoute, addToCart)
router.put('/', protectRoute, updateQuantity)
router.delete('/', protectRoute, removeAllFromCart)
export default router
