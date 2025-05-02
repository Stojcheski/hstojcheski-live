// hstojcheski-live-backend/server.js (with auth additions)
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser' // Add this dependency
import Blog from './models/blog.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser()) // Parse cookies
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? 'https://hstojcheski.live' : 'http://localhost:5173',
    credentials: true,
  }),
)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

// Routes
app.use('/auth', authRoutes)

// Existing blog routes
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.json(blogs)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error fetching blogs')
  }
})

app.post('/blogs', async (req, res) => {
  try {
    const { title, content } = req.body
    const newBlog = new Blog({ title, content })
    await newBlog.save()
    res.status(201).json(newBlog)
  } catch (err) {
    console.log(err)
    res.status(400).send('Error creating blog')
  }
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
