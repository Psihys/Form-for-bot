import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({ message: 'Not authorized: No token' })
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET)
      const user = await User.findById(decoded.userId).select('-password')

      if (!user) {
        return res
          .status(401)
          .json({ message: 'Not authorized: User not found' })
      }

      req.user = user
      next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Not authorized: Token expired' })
      } else {
        res.status(401).json({ message: 'Not authorized: Invalid token' })
      }
    }
  } catch (error) {
    console.error('Error in protectRoute middleware:', error)
    return res.status(401).json({ message: 'Not authorized: Invalid token' })
  }
}

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' })
  }
}
