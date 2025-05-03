// hstojcheski-live-backend/routes/blog.js
import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ updatedAt: -1 })
      .select('-comments -likesCount -dislikesCount -sharesCount -bookmarksCount')

    res.json(blogs)
  } catch (err) {
    console.error('Error fetching all blogs for admin:', err)
    res.status(500).json({ message: 'Error fetching blogs', error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, content, summary, tags, isPublished } = req.body

    // Calculate read time (approx. 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200) + ' min read'

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')

    const newBlog = new Blog({
      title,
      content,
      summary,
      tags: tags || [],
      author: req.body.author,
      isPublished: isPublished,
      readTime,
      slug,
      publishedAt: isPublished ? new Date() : null,
    })

    const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)
  } catch (err) {
    console.error('Error creating blog post:', err)
    res.status(400).json({ message: 'Error creating blog post', error: err.message })
  }
})

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
