import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import bcrypt from 'bcrypt'

dotenv.config()

async function createTestUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully')

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'hristijan.stojcheski@outlook.com' })

    if (existingUser) {
      console.log('Test user already exists')
      mongoose.disconnect()
      return
    }

    // Create a new test user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('password123', salt)

    const newUser = new User({
      username: 'testuser',
      email: 'hristijan.stojcheski@outlook.com',
      password: hashedPassword,
      role: 'admin',
    })

    await newUser.save()
    console.log('Test user created successfully')

    mongoose.disconnect()
  } catch (err) {
    console.error('Error creating test user:', err)
    mongoose.disconnect()
  }
}

createTestUser()
