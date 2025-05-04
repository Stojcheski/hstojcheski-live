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

    async createTask(taskData: Partial<Task>) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tasks`, taskData)

        // Add the new task to the tasks array
        this.tasks.unshift(response.data)

        return response.data
      } catch (error) {
        console.error('Error creating task:', error)
        this.error = 'Failed to create task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTask(id: string, taskData: Partial<Task>) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`,
          taskData,
        )

        // Update the task in the tasks array
        const index = this.tasks.findIndex((task) => task._id === id)
        if (index !== -1) {
          this.tasks[index] = response.data
        }

        // If this is the current task, update it as well
        if (this.currentTask && this.currentTask._id === id) {
          this.currentTask = response.data
        }

        return response.data
      } catch (error) {
        console.error(`Error updating task with id ${id}:`, error)
        this.error = 'Failed to update task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTask(id: string) {
      this.loading = true
      this.error = null

      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`)

        // Remove the task from the tasks array
        this.tasks = this.tasks.filter((task) => task._id !== id)

        // If this is the current task, set it to null
        if (this.currentTask && this.currentTask._id === id) {
          this.currentTask = null
        }
      } catch (error) {
        console.error(`Error deleting task with id ${id}:`, error)
        this.error = 'Failed to delete task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async addComment(taskId: string, user: string, comment: string) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}/comments`,
          { user, comment },
        )

        // Update the task in the tasks array
        const index = this.tasks.findIndex((task) => task._id === taskId)
        if (index !== -1) {
          this.tasks[index] = response.data
        }

        // If this is the current task, update it as well
        if (this.currentTask && this.currentTask._id === taskId) {
          this.currentTask = response.data
        }

        return response.data
      } catch (error) {
        console.error(`Error adding comment to task with id ${taskId}:`, error)
        this.error = 'Failed to add comment'
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

    // Get tasks by severity
    getTasksBySeverity: (state) => {
      const groupedTasks: Record<string, Task[]> = {
        MINOR: [],
        MAJOR: [],
        CRITICAL: [],
        BLOCKER: [],
      }

      state.tasks.forEach((task) => {
        if (groupedTasks[task.severity]) {
          groupedTasks[task.severity].push(task)
        }
      })

      return groupedTasks
    },

    // Get total number of tasks
    getTotalTasks: (state) => {
      return state.tasks.length
    },

    // Get completed tasks
    getCompletedTasks: (state) => {
      return state.tasks.filter((task) => task.status === 'DONE')
    },

    // Get pending tasks
    getPendingTasks: (state) => {
      return state.tasks.filter((task) => task.status !== 'DONE')
    },
  },
})
