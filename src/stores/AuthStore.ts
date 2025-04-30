// src/stores/AuthStore.ts
import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

interface User {
  _id: string
  username: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    currentUser: (state) => state.user,
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        // For local development
        const apiUrl = 'http://localhost:5000/api'
        const response = await axios.post(`${apiUrl}/auth/login`, {
          email,
          password,
        })

        const { token, user } = response.data

        // Store token in localStorage
        localStorage.setItem('authToken', token)

        // Set token for future API requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // Update state
        this.token = token
        this.user = user

        return true
      } catch (err: unknown) {
        console.error('Login error:', err)

        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError
          if (axiosError.response && axiosError.response.status === 401) {
            this.error = 'Invalid email or password'
          } else {
            this.error = 'An error occurred during login'
          }
        } else {
          this.error = 'An unexpected error occurred'
        }

        return false
      } finally {
        this.loading = false
      }
    },

    async fetchCurrentUser() {
      if (!this.token) return false

      this.loading = true
      this.error = null

      try {
        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        // For local development
        const apiUrl = 'http://localhost:5000/api'
        const response = await axios.get(`${apiUrl}/auth/me`)

        this.user = response.data
        return true
      } catch (err: unknown) {
        console.error('Error fetching user:', err)

        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError
          if (axiosError.response && axiosError.response.status === 401) {
            // Token expired or invalid
            this.logout()
          } else {
            this.error = 'Failed to fetch user information'
          }
        } else {
          this.error = 'An unexpected error occurred'
        }

        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      // Remove token from localStorage
      localStorage.removeItem('authToken')

      // Remove auth header
      delete axios.defaults.headers.common['Authorization']

      // Reset state
      this.token = null
      this.user = null
    },
  },
})
