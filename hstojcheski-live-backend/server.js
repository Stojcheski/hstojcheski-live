import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

import './models/user.js'
import './models/task.js'
import './models/blog.js'

import taskRoutes from './routes/tasks.js'
import blogRoute from './routes/blog.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const envFile = `.env.${process.env.NODE_ENV || 'development'}`
dotenv.config({ path: __dirname + '/' + envFile })

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', taskRoutes)
app.use('/', blogRoute)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err))

app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`)
})
