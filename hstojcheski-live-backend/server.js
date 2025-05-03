// hstojcheski-live-backend/server.js
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Blog from './models/blog.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (err) {
    console.log(err)
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
  console.log(`Server is running on port ${process.env.PORT}`)
})
