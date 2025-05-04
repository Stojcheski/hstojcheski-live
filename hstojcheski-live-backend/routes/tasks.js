// hstojcheski-live-backend/routes/tasks.js
import express from 'express'
import Task from '../models/task.js'

const router = express.Router()

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const { sort, order, status, priority, severity } = req.query

    const filter = { isDeleted: false }
    if (status) filter.status = status
    if (priority) filter.priority = priority
    if (severity) filter.severity = severity

    let sortOptions = {}
    if (sort) {
      sortOptions[sort] = order === 'desc' ? -1 : 1
    } else {
      sortOptions = { createdAt: -1 }
    }

    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .populate('author', 'username')
      .populate('assignee', 'username')

    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get a task by ID
router.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('author', 'username')
      .populate('assignee', 'username')

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(task)
  } catch (error) {
    console.error('Error fetching task by ID:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
