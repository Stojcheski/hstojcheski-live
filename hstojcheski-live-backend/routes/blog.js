// hstojcheski-live-backend/routes/blog.js
import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.get('/blogs/slug/:slug', async (req, res) => {
  try {
    console.log('Received slug:', req.params.slug)

    const allBlogs = await Blog.find({})
    console.log(
      'All Blog Slugs:',
      allBlogs.map((blog) => blog.slug),
    )

    const blog = await Blog.findOne({ slug: req.params.slug })

    if (!blog) {
      console.log('No blog found for slug:', req.params.slug)
      return res.status(404).json({ message: 'Blog post not found' })
    }

    console.log('Found Blog:', blog)
    res.json(blog)
  } catch (error) {
    console.error('Error fetching blog by slug:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
