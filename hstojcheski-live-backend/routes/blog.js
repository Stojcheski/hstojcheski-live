// hstojcheski-live-backend/routes/blog.js
import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({
      isPublished: true,
      isDraft: false,
      isDeleted: false,
    })
      .sort({ publishedAt: -1 }) // Sort by publish date, newest first
      .select('-comments -likesCount -dislikesCount -sharesCount -bookmarksCount') // Exclude unnecessary fields for listing

    res.json(blogs)
  } catch (err) {
    console.error('Error fetching blogs:', err)
    res.status(500).send('Error fetching blogs')
  }
})

// Get a single blog post by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
      isDraft: false,
      isDeleted: false,
    })

    if (!blog) {
      return res.status(404).send('Blog post not found')
    }

    // Increment view count
    blog.viewCount += 1
    await blog.save()

    res.json(blog)
  } catch (err) {
    console.error('Error fetching blog by slug:', err)
    res.status(500).send('Error fetching blog post')
  }
})

// Admin routes below (these will be protected later)

// Get all blog posts (including drafts) for admin
router.get('/admin', async (req, res) => {
  try {
    const blogs = await Blog.find({ isDeleted: false }).sort({ updatedAt: -1 })

    res.json(blogs)
  } catch (err) {
    console.error('Error fetching admin blogs:', err)
    res.status(500).send('Error fetching blogs')
  }
})

// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const {
      title,
      content,
      summary,
      tags,
      author,
      blogImage,
      isPublished,
      isDraft,
      isScheduled,
      scheduledAt,
      slug,
    } = req.body

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug })
    if (existingBlog) {
      return res.status(400).json({ error: 'A blog post with this slug already exists' })
    }

    // Calculate read time (simple implementation - can be improved)
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200) + ' min read' // Assuming 200 words per minute

    const blog = new Blog({
      title,
      content,
      summary,
      tags: tags || [],
      author,
      blogImage: blogImage || '',
      isPublished: isPublished || false,
      isDraft: isDraft || true,
      isScheduled: isScheduled || false,
      scheduledAt: scheduledAt || null,
      readTime,
      slug,
      viewCount: 0,
    })

    await blog.save()
    res.status(201).json(blog)
  } catch (err) {
    console.error('Error creating blog:', err)
    res.status(400).send('Error creating blog: ' + err.message)
  }
})

// Update a blog post
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      content,
      summary,
      tags,
      blogImage,
      isPublished,
      isDraft,
      isScheduled,
      scheduledAt,
      slug,
    } = req.body

    // Check if slug already exists and is not the current blog post
    if (slug) {
      const existingBlog = await Blog.findOne({
        slug,
        _id: { $ne: req.params.id },
      })

      if (existingBlog) {
        return res.status(400).json({ error: 'A blog post with this slug already exists' })
      }
    }

    // Calculate read time if content is provided
    let readTime
    if (content) {
      const wordCount = content.split(/\s+/).length
      readTime = Math.ceil(wordCount / 200) + ' min read'
    }

    const updateData = {
      ...(title && { title }),
      ...(content && { content }),
      ...(summary && { summary }),
      ...(tags && { tags }),
      ...(blogImage && { blogImage }),
      ...(isPublished !== undefined && { isPublished }),
      ...(isDraft !== undefined && { isDraft }),
      ...(isScheduled !== undefined && { isScheduled }),
      ...(scheduledAt && { scheduledAt }),
      ...(slug && { slug }),
      ...(readTime && { readTime }),
      updatedAt: Date.now(),
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true })

    if (!blog) {
      return res.status(404).send('Blog post not found')
    }

    res.json(blog)
  } catch (err) {
    console.error('Error updating blog:', err)
    res.status(400).send('Error updating blog: ' + err.message)
  }
})

// Delete a blog post (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: Date.now(),
      },
      { new: true },
    )

    if (!blog) {
      return res.status(404).send('Blog post not found')
    }

    res.json({ message: 'Blog post deleted successfully' })
  } catch (err) {
    console.error('Error deleting blog:', err)
    res.status(500).send('Error deleting blog post')
  }
})

export default router
