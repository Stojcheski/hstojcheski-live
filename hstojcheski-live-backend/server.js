// hstojcheski-live-backend/server.js
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// Import route files
import authRoutes from './routes/auth.js'
import blogRoutes from './routes/blog.js'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

// Use routes
app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running...')
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
