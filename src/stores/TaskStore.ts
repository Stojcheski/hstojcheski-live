// src/stores/TaskStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Task {
  _id: string
  title: string
  description: string
  status: 'TO DO' | 'IN PROGRESS' | 'DONE' | 'BLOCKED' | 'REVIEW'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  severity: 'MINOR' | 'MAJOR' | 'CRITICAL' | 'BLOCKER'
  estimation: number
  author: {
    _id: string
    username: string
  }
  assignee: {
    _id: string
    username: string
  }
  createdAt: string
  updatedAt: string
  dueDate?: string
  completedAt?: string
  labels: string[]
  comments: Array<{
    user: string
    comment: string
    createdAt: string
  }>
}

interface TasksState {
  tasks: Task[]
  currentTask: Task | null
  loading: boolean
  error: string | null
}

export const useTaskStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
    currentTask: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchTasks(
      params: {
        sort?: string
        order?: 'asc' | 'desc'
        status?: string
        priority?: string
        severity?: string
      } = {},
    ) {
      this.loading = true
      this.error = null

      try {
        const queryParams = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, value)
        })

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/tasks?${queryParams.toString()}`,
        )

        this.tasks = response.data
      } catch (error) {
        console.error('Error fetching tasks:', error)
        this.error = 'Failed to load tasks'
      } finally {
        this.loading = false
      }
    },

    async fetchTaskById(id: string) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`)
        this.currentTask = response.data
        return this.currentTask
      } catch (error) {
        console.error(`Error fetching task with id ${id}:`, error)
        this.error = 'Failed to load task'
        throw error
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    // Get tasks grouped by status
    getTasksByStatus: (state) => {
      const groupedTasks: Record<string, Task[]> = {
        'TO DO': [],
        'IN PROGRESS': [],
        DONE: [],
        BLOCKED: [],
        REVIEW: [],
      }

      state.tasks.forEach((task) => {
        if (groupedTasks[task.status]) {
          groupedTasks[task.status].push(task)
        }
      })

      return groupedTasks
    },

    // Get tasks by priority
    getTasksByPriority: (state) => {
      const groupedTasks: Record<string, Task[]> = {
        LOW: [],
        MEDIUM: [],
        HIGH: [],
        CRITICAL: [],
      }

      state.tasks.forEach((task) => {
        if (groupedTasks[task.priority]) {
          groupedTasks[task.priority].push(task)
        }
      })

      return groupedTasks
    },
  },
})
