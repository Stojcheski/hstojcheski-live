<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <h1>Admin Login</h1>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              autocomplete="email"
              class="form-control"
              :class="{ error: validationErrors.email }"
            />
            <p v-if="validationErrors.email" class="error-text">{{ validationErrors.email }}</p>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              autocomplete="current-password"
              class="form-control"
              :class="{ error: validationErrors.password }"
            />
            <p v-if="validationErrors.password" class="error-text">
              {{ validationErrors.password }}
            </p>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="back-link">
          <router-link to="/">← Back to Website</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface ValidationErrors {
  email?: string
  password?: string
}

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const validationErrors = ref<ValidationErrors>({})

const validateForm = (): boolean => {
  const errors: ValidationErrors = {}

  if (!email.value.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!password.value) {
    errors.password = 'Password is required'
  }

  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

const handleLogin = async (): Promise<void> => {
  if (!validateForm()) return

  loading.value = true
  error.value = null

  try {
    // For local development
    const apiUrl = 'http://localhost:5000/api'
    const response = await axios.post(`${apiUrl}/auth/login`, {
      email: email.value,
      password: password.value,
    })

    // Store auth token in localStorage or better yet, in a secure HTTP-only cookie
    localStorage.setItem('authToken', response.data.token)

    // Redirect to admin dashboard
    router.push('/admin/dashboard')
  } catch (err: any) {
    console.error('Login error:', err)

    if (err.response && err.response.status === 401) {
      error.value = 'Invalid email or password. Please try again.'
    } else {
      error.value = 'An error occurred during login. Please try again later.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 1rem;
}

.login-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #41b883;
  box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.1);
}

.form-control.error {
  border-color: #e74c3c;
}

.error-text {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.error-message {
  background-color: #fee;
  color: #e74c3c;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  text-align: center;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  text-align: center;
}

.btn-primary {
  background-color: #41b883;
  color: white;
}

.btn-primary:hover {
  background-color: #349268;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-link {
  text-align: center;
  margin-top: 1.5rem;
}

.back-link a {
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
}

.back-link a:hover {
  color: #41b883;
  text-decoration: underline;
}
</style>
