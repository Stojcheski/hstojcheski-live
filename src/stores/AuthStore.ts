// src/stores/AuthStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api' // Use environment variable in production

interface AuthState {
  token: string | null
  user: UserInfo | null
  loading: boolean
  error: string | null
}

interface UserInfo {
  _id: string
  username: string
  email: string
  role: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface ApiError {
  response?: {
    data?: {
      error?: string
    }
    status?: number
    statusText?: string
  }
  message?: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('adminToken'),
    user: JSON.parse(localStorage.getItem('adminUser') || 'null'),
    loading: false,
    error: null,
  }),

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials)

        // Store the token and user info
        this.token = response.data.token || 'dummytoken' // For now, since our backend doesn't generate a token yet
        this.user = response.data.user

        // Save to localStorage
        localStorage.setItem('adminToken', this.token)
        localStorage.setItem('adminUser', JSON.stringify(this.user))

        return true
      } catch (error: unknown) {
        const apiError = error as ApiError
        console.error('Login error:', apiError)
        this.error = apiError.response?.data?.error || 'Failed to login'
        return false
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null

      // Remove from localStorage
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.role === 'admin',
  },
})
