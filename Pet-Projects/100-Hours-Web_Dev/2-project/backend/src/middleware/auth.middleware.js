import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
try {
  const token = req.cookies.token || '';

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }

  const user = await User.findById(decoded.userId).select('-password');

  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  req.user = user;
  next();
} catch (error) {
  console.error('Error in protectRoute:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}

}
