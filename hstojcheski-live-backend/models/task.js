import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['TO DO', 'IN PROGRESS', 'DONE', 'BLOCKED', 'REVIEW'],
    default: 'TO DO',
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM',
  },
  severity: {
    type: String,
    enum: ['MINOR', 'MAJOR', 'CRITICAL', 'BLOCKER'],
    default: 'MINOR',
  },
  estimation: {
    type: Number, // Estimation in hours
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  completedAt: {
    type: Date,
    required: false,
  },
  labels: {
    type: [String],
    default: [],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

taskSchema.index({ title: 'text', description: 'text' })

const Task = mongoose.model('Task', taskSchema)

export default Task
