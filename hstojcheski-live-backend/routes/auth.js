// hstojcheski-live-backend/routes/auth.js
import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { auth, authorize } from '../middleware/auth.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Update last login
    user.lastLogin = Date.now()
    await user.save()

    // Create token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' })

    // Set token as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    // Return user info (without password)
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    }

    res.status(200).json({ message: 'Login successful', user: userResponse })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out successfully' })
})

// Get current user info
router.get('/me', auth, (req, res) => {
  const user = {
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  }

  res.status(200).json({ user })
})

// ADMIN ONLY: Create a new user (for creating authors)
router.post('/users', auth, authorize('admin'), async (req, res) => {
  try {
    const { username, email, password, role = 'viewer' } = req.body

    // Only admin can create admin or author accounts
    if ((role === 'admin' || role === 'author') && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to create this type of user' })
    }

    const newUser = new User({
      username,
      email,
      password,
      role,
      createdBy: req.user._id,
    })

    await newUser.save()

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    })
  } catch (err) {
    console.error('User creation error:', err)
    res.status(500).json({ message: 'Error creating user', error: err.message })
  }
})

// ADMIN ONLY: Change user role (promote to author)
router.patch('/users/:id/role', auth, authorize('admin'), async (req, res) => {
  try {
    const { role } = req.body

    if (!['viewer', 'author', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.role = role
    user.updatedAt = Date.now()
    await user.save()

    res.status(200).json({
      message: 'User role updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    console.error('Role update error:', err)
    res.status(500).json({ message: 'Error updating user role', error: err.message })
  }
})

// ADMIN ONLY: Get all users
router.get('/users', auth, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json({ users })
  } catch (err) {
    console.error('Get users error:', err)
    res.status(500).json({ message: 'Error fetching users', error: err.message })
  }
})

export default router
