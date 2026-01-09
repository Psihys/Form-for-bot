import express from 'express'
import {
  signup,
  logout,
  login,
  refreshToken,
  getProfile,
} from '../controllers/auth.controller.js'
import { get } from 'mongoose'

const route = express.Router()

route.post('/signup', signup)
route.post('/login', login)
route.post('/logout', logout)
route.post('/refresh-token', refreshToken)
route.get('/profile', getProfile)

export default route
