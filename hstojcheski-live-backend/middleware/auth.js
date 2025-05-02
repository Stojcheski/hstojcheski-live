// hstojcheski-live-backend/middleware/auth.js
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Get JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Middleware to verify JWT token
export const auth = async (req, res, next) => {
  try {
    // Get token from cookies (more secure) or Authorization header
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET)

    // Find user by id
    const user = await User.findById(decoded.userId)

    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Token is invalid or user no longer exists' })
    }

    // Add user info to request object
    req.user = user
    req.token = token

    next()
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message })
  }
}

// Role-based access control middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to access this resource' })
    }

    next()
  }
}
