import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import Task from '../models/task.js'
import User from '../models/user.js'

// Get current file directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
const envFile = `.env.${process.env.NODE_ENV || 'development'}`
dotenv.config({ path: __dirname + '/../' + envFile })

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err))

// Sample data
const sampleTasks = [
  {
    title: 'Implement Salesforce Integration',
    description:
      'Create an integration between our platform and Salesforce using REST APIs. This will include authentication, data synchronization, and error handling. We need to ensure data flows correctly between both systems in real-time.',
    status: 'IN PROGRESS',
    priority: 'HIGH',
    severity: 'MAJOR',
    estimation: 12,
    labels: ['Integration', 'Salesforce', 'API'],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  },
  {
    title: 'Fix Blog Pagination Issue',
    description:
      'The pagination on the blog page is not working correctly. When clicking on page 2, it shows the same articles as page 1. Need to investigate and fix the issue.',
    status: 'TO DO',
    priority: 'MEDIUM',
    severity: 'MINOR',
    estimation: 3,
    labels: ['Bug', 'Frontend', 'UX'],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  },
  {
    title: 'Set Up CI/CD Pipeline',
    description:
      'Configure a CI/CD pipeline using GitHub Actions to automate testing and deployment. This should include linting, unit tests, and automatic deployment to the staging environment.',
    status: 'TO DO',
    priority: 'HIGH',
    severity: 'MAJOR',
    estimation: 8,
    labels: ['DevOps', 'Infrastructure', 'Automation'],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  },
  {
    title: 'Optimize Database Queries',
    description:
      'Our MongoDB queries are running slow, especially on the tasks page. Need to add proper indexes and refactor some of the queries to improve performance.',
    status: 'BLOCKED',
    priority: 'HIGH',
    severity: 'CRITICAL',
    estimation: 5,
    labels: ['Database', 'Performance', 'Backend'],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  {
    title: 'Add User Authentication',
    description:
      'Implement user authentication system using JWT. This will include login, registration, password reset, and account management functionalities.',
    status: 'DONE',
    priority: 'CRITICAL',
    severity: 'BLOCKER',
    estimation: 16,
    labels: ['Security', 'Authentication', 'Backend'],
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    title: 'Create Mobile-Responsive Design',
    description:
      'Make sure all pages are fully responsive on mobile devices. Test on various screen sizes and fix any layout issues.',
    status: 'IN PROGRESS',
    priority: 'MEDIUM',
    severity: 'MAJOR',
    estimation: 10,
    labels: ['Frontend', 'Responsive', 'CSS'],
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
  },
  {
    title: 'Implement Analytics Dashboard',
    description:
      'Create a dashboard that shows key metrics like page views, user engagement, and conversion rates. Use chart.js for visualizations.',
    status: 'REVIEW',
    priority: 'LOW',
    severity: 'MINOR',
    estimation: 8,
    labels: ['Analytics', 'Dashboard', 'Frontend'],
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
  },
  {
    title: 'Update NPM Packages',
    description:
      'Update all outdated NPM packages to their latest versions. Test thoroughly to ensure no breaking changes.',
    status: 'TO DO',
    priority: 'LOW',
    severity: 'MINOR',
    estimation: 2,
    labels: ['Maintenance', 'Dependencies'],
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
  },
  {
    title: 'Fix Header Navigation on Mobile',
    description:
      'The mobile menu in the header is not closing properly when clicking on a link. Need to fix the toggle behavior.',
    status: 'DONE',
    priority: 'MEDIUM',
    severity: 'MINOR',
    estimation: 1,
    labels: ['Bug', 'Frontend', 'Mobile'],
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    title: 'Implement Salesforce Data Loader',
    description:
      'Build a data loader utility that can import large datasets from CSV files into Salesforce using the bulk API. Include validation and error reporting.',
    status: 'TO DO',
    priority: 'HIGH',
    severity: 'MAJOR',
    estimation: 14,
    labels: ['Salesforce', 'Data Migration', 'Tools'],
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
  },
  {
    title: 'Create Technical Documentation',
    description:
      'Write comprehensive technical documentation for the API endpoints, database schema, and deployment process. Use Markdown format for easy maintenance.',
    status: 'IN PROGRESS',
    priority: 'MEDIUM',
    severity: 'MINOR',
    estimation: 6,
    labels: ['Documentation', 'Knowledge Base'],
    dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
  },
  {
    title: 'Set Up MongoDB Backup System',
    description:
      'Configure automated daily backups for MongoDB database. Store backups in a secure location and implement a retention policy.',
    status: 'TO DO',
    priority: 'HIGH',
    severity: 'CRITICAL',
    estimation: 4,
    labels: ['Database', 'Backup', 'DevOps'],
    dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
  },
]

// Function to generate random comments for tasks
const generateComments = () => {
  const comments = []
  const numberOfComments = Math.floor(Math.random() * 4) // 0-3 comments per task

  const users = ['Hristijan', 'John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Wilson']
  const commentTemplates = [
    'I think we should prioritize this task.',
    'Made good progress on this today!',
    'This might take longer than expected due to some unforeseen complexities.',
    'Can we discuss this in the next standup?',
    "I've started working on this. Will update progress soon.",
    'This is more complex than we initially thought.',
    'Does anyone have examples of how this was done before?',
    'I need some clarification on the requirements.',
    'Almost done with this, just need to fix a few bugs.',
    'Ran into some issues with this task. Need help.',
  ]

  for (let i = 0; i < numberOfComments; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomComment = commentTemplates[Math.floor(Math.random() * commentTemplates.length)]

    comments.push({
      user: randomUser,
      comment: randomComment,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000), // Random date in the last 10 days
    })
  }

  return comments
}

// Main seed function
const seedTasks = async () => {
  try {
    // Clear existing tasks
    await Task.deleteMany({})
    console.log('✅ Cleared existing tasks')

    // Find or create admin user
    let adminUser = await User.findOne({ username: 'admin' })

    if (!adminUser) {
      try {
        adminUser = await User.create({
          username: 'admin',
          email: 'admin@example.com',
          password: 'password123',
          role: 'admin',
        })
        console.log('✅ Created admin user')
      } catch (error) {
        console.log('❌ Could not create admin user - User model might not be ready')
        console.log('Using placeholder IDs for author and assignee')
        adminUser = { _id: new mongoose.Types.ObjectId() }
      }
    }

    const tasksToInsert = sampleTasks.map((task) => ({
      ...task,
      author: adminUser._id,
      assignee: adminUser._id,
      comments: generateComments(),
    }))

    await Task.insertMany(tasksToInsert)
    console.log(`✅ Successfully seeded ${tasksToInsert.length} tasks`)

    // Disconnect from MongoDB
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding tasks:', error)
    process.exit(1)
  }
}

// Run the seed function
seedTasks()
