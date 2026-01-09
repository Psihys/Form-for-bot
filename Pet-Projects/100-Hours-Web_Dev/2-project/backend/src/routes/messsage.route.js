import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { upload } from '../middleware/upload.middleware.js'
import {
  getAllUseres,
  getMessages,
  sendMessage,
} from '../controllers/message.controller.js'

const router = express.Router()

router.get('/users', protectRoute, getAllUseres)
router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', protectRoute, upload.single('image'), sendMessage)

export default router
