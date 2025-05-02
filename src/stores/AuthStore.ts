// src/stores/AuthStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

// Define the User interface
interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'author' | 'viewer'
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

// Use the API URL from environment variables or default to localhost in development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isAuthor: (state) => state.user?.role === 'author' || state.user?.role === 'admin',
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post(
          `${API_URL}/auth/login`,
          { email, password },
          { withCredentials: true }, // Important for cookies
        )

        this.user = response.data.user
        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Authentication failed'
        return false
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
        this.user = null
      } catch (error: any) {
        console.error('Logout error:', error)
      }
    },

    async checkAuth() {
      this.loading = true

      try {
        const response = await axios.get(`${API_URL}/auth/me`, { withCredentials: true })

        if (response.data.user) {
          this.user = response.data.user
        }
      } catch (error) {
        this.user = null
      } finally {
        this.loading = false
      }
    },

    // Admin-only: Create a new user
    async createUser(userData: {
      username: string
      email: string
      password: string
      role: string
    }) {
      if (!this.isAdmin) {
        this.error = 'Not authorized'
        return false
      }

      try {
        const response = await axios.post(`${API_URL}/auth/users`, userData, {
          withCredentials: true,
        })

        return response.data.user
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error creating user'
        return false
      }
    },

    // Admin-only: Update user role
    async updateUserRole(userId: string, role: 'admin' | 'author' | 'viewer') {
      if (!this.isAdmin) {
        this.error = 'Not authorized'
        return false
      }

      try {
        const response = await axios.patch(
          `${API_URL}/auth/users/${userId}/role`,
          { role },
          { withCredentials: true },
        )

        return response.data.user
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error updating user role'
        return false
      }
    },

    // Admin-only: Get all users
    async getAllUsers() {
      if (!this.isAdmin) {
        this.error = 'Not authorized'
        return false
      }

      try {
        const response = await axios.get(`${API_URL}/auth/users`, { withCredentials: true })

        return response.data.users
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error fetching users'
        return false
      }
    },
  },
})
