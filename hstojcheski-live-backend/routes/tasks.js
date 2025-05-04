import express from 'express'
import Task from '../models/task.js'

const router = express.Router()

// Get all tasks
router.get('/tasks', async (req, res) => {
  try {
    const { sort, order, status, priority, severity } = req.query

    // Build query filters
    const filter = { isDeleted: false }
    if (status) filter.status = status
    if (priority) filter.priority = priority
    if (severity) filter.severity = severity

    // Build sort options
    let sortOptions = {}
    if (sort) {
      sortOptions[sort] = order === 'desc' ? -1 : 1
    } else {
      // Default sort by createdAt descending (newest first)
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

// Create new task
router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
    const savedTask = await task.save()

    res.status(201).json(savedTask)
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Update a task
router.put('/tasks/:id', async (req, res) => {
  try {
    // Set updatedAt to current time
    req.body.updatedAt = new Date()

    // If status is changed to DONE, set completedAt
    if (req.body.status === 'DONE') {
      req.body.completedAt = new Date()
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete a task (soft delete)
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Add a comment to a task
router.post('/tasks/:id/comments', async (req, res) => {
  try {
    const { user, comment } = req.body

    if (!user || !comment) {
      return res.status(400).json({ message: 'User and comment are required' })
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: { user, comment } },
        updatedAt: new Date(),
      },
      { new: true },
    )

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(201).json(task)
  } catch (error) {
    console.error('Error adding comment:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
