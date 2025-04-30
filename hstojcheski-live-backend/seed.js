// File location: hstojcheski-live-backend/seed.js

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import Blog from './models/blog.js'

dotenv.config()

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing test user and blogs if any
    await User.deleteMany({ email: 'test@example.com' })
    await Blog.deleteMany({ slug: { $in: ['enterprise-patterns', 'integration-best-practices'] } })

    // Create test author
    const testUser = new User({
      username: 'testauthor',
      email: 'test@example.com',
      password: '123456',
      role: 'author',
    })
    await testUser.save()

    // Create blog post 1
    const blog1 = new Blog({
      title: 'Importance of Enterprise Patterns',
      summary: 'Why reusable architectural patterns matter in enterprise development.',
      content:
        'In large-scale enterprise systems, repeatable design patterns help maintain structure and scalability. This post explores key patterns every Salesforce developer should know...',
      tags: ['Salesforce', 'Architecture', 'Best Practices'],
      slug: 'enterprise-patterns',
      isPublished: true,
      author: testUser._id,
      blogImage: 'placeholder.jpg',
      readTime: '3 min read',
    })

    const blog2 = new Blog({
      title: 'Integration Best Practices for Salesforce Devs',
      summary: 'Tips and strategies to manage integrations effectively.',
      content:
        'Integrating Salesforce with external systems can be tricky. In this post, we’ll cover authentication, middleware, and error handling strategies you should adopt...',
      tags: ['Salesforce', 'Integration', 'API'],
      slug: 'integration-best-practices',
      isPublished: true,
      author: testUser._id,
      blogImage: 'placeholder.jpg',
      readTime: '4 min read',
    })

    await blog1.save()
    await blog2.save()

    console.log('✅ Database seeded successfully with 1 user and 2 blog posts.')
    process.exit()
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
