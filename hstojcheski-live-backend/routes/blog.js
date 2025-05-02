// hstojcheski-live-backend/routes/blogs.js
import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

// Get all blogs for admin (no filters)
router.get('/', async (req, res) => {
  try {
    // Find ALL blog posts, sort by date descending, newest first
    const blogs = await Blog.find()
      .sort({ updatedAt: -1 })
      .select('-comments -likesCount -dislikesCount -sharesCount -bookmarksCount')

    res.json(blogs)
  } catch (err) {
    console.error('Error fetching all blogs for admin:', err)
    res.status(500).json({ message: 'Error fetching blogs', error: err.message })
  }
})

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      isPublished: true,
      isDeleted: false,
    })

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    // Increment view count
    blog.viewCount += 1
    await blog.save()

    res.json(blog)
  } catch (err) {
    console.error(`Error fetching blog with id ${req.params.id}:`, err)
    res.status(500).json({ message: 'Error fetching blog post', error: err.message })
  }
})

// Create a new blog post (protected route - requires authentication)
router.post('/', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    // if (!req.user || req.user.role !== 'admin') {
    //   return res.status(401).json({ message: 'Unauthorized' })
    // }

    const { title, content, summary, tags, blogImage, isPublished } = req.body

    // Calculate read time (approx. 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200) + ' min read'

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')

    const newBlog = new Blog({
      title,
      content,
      summary,
      tags: tags || [],
      author: req.body.author || 'Hristijan Stojcheski', // Default author
      blogImage: blogImage || '',
      isPublished: isPublished || false,
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

// Update a blog post (protected route)
router.put('/:id', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    // if (!req.user || req.user.role !== 'admin') {
    //   return res.status(401).json({ message: 'Unauthorized' })
    // }

    const { title, content, summary, tags, blogImage, isPublished } = req.body

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    // If title changed, update slug
    if (title && title !== blog.title) {
      blog.slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-')
    }

    // If content changed, update read time
    if (content && content !== blog.content) {
      const wordCount = content.split(/\s+/).length
      blog.readTime = Math.ceil(wordCount / 200) + ' min read'
    }

    // If publishing for the first time, set publishedAt date
    if (isPublished && !blog.isPublished) {
      blog.publishedAt = new Date()
    }

    // Update fields
    blog.title = title || blog.title
    blog.content = content || blog.content
    blog.summary = summary || blog.summary
    blog.tags = tags || blog.tags
    blog.blogImage = blogImage || blog.blogImage
    blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished
    blog.updatedAt = new Date()

    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  } catch (err) {
    console.error(`Error updating blog with id ${req.params.id}:`, err)
    res.status(400).json({ message: 'Error updating blog post', error: err.message })
  }
})

// Delete a blog post (protected route)
router.delete('/:id', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    // if (!req.user || req.user.role !== 'admin') {
    //   return res.status(401).json({ message: 'Unauthorized' })
    // }

    // Soft delete - mark as deleted but keep in database
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true },
    )

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    res.json({ message: 'Blog post deleted successfully' })
  } catch (err) {
    console.error(`Error deleting blog with id ${req.params.id}:`, err)
    res.status(500).json({ message: 'Error deleting blog post', error: err.message })
  }
})

// GET single blog by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
      isDeleted: false,
    }).populate('author', 'username') // show author info

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' })
    }

    // Optional: increment view count
    blog.viewCount += 1
    await blog.save()

    res.json(blog)
  } catch (err) {
    console.error(`Error fetching blog with slug ${req.params.slug}:`, err)
    res.status(500).json({ message: 'Error fetching blog by slug', error: err.message })
  }
})

// Toggle blog publish status (partial update - PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const { isPublished } = req.body

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' })
    }

    // Toggle publish status and set/unset publishedAt date
    blog.isPublished = isPublished
    blog.publishedAt = isPublished ? new Date() : null
    blog.updatedAt = new Date()

    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  } catch (err) {
    console.error(`Error toggling publish status for blog ${req.params.id}:`, err)
    res.status(500).json({ message: 'Error updating publish status', error: err.message })
  }
})

export default router
