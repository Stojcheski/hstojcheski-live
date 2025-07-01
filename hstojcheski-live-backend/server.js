import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'

import './models/user.js'
import './models/blog.js'

import blogRoutes from './routes/blog.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '../dist')))
app.use('/api/blogs', blogRoutes)

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`)
})
