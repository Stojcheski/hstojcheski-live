// hstojcheski-live-backend/routes/blog.js
import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.get('/blog', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })
    res.json(blogs)
  } catch (err) {
    console.error('❌ Error fetching blogs:', err)
    res.status(500).send('Error fetching blogs')
  }
})

router.get('/blogs/slug/:slug', async (req, res) => {
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

export default router
