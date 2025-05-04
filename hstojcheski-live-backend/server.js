import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import taskRoutes from './routes/tasks.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const envFile = `.env.${process.env.NODE_ENV || 'development'}`
dotenv.config({ path: __dirname + '/' + envFile })

import Blog from './models/blog.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', taskRoutes)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err))

app.get('/blog', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (err) {
    console.error('❌ Error fetching blogs:', err)
    res.status(500).send('Error fetching blogs')
  }
})

app.get('/blogs/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' })
    }
    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`)
})
