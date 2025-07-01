import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 })
  res.json(blogs)
})

router.get('/slug/:slug', async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
  if (!blog) return res.status(404).json({ message: 'Blog post not found' })
  res.json(blog)
})

export default router
