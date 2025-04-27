import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Blog from './models/blog.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))

// Route to get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.json(blogs)
  } catch (err) {
    console.log(err) // Log the error
    res.status(500).send('Error fetching blogs')
  }
})

// Route to create a new blog
app.post('/blogs', async (req, res) => {
  try {
    const { title, content } = req.body
    const newBlog = new Blog({ title, content })
    await newBlog.save()
    res.status(201).json(newBlog)
  } catch (err) {
    console.log(err) // Log the error
    res.status(400).send('Error creating blog')
  }
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
