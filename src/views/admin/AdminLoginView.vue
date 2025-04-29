<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <h1>Admin Login</h1>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              required
              placeholder="Enter your email"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" class="login-btn" :disabled="isLoggingIn">
            {{ isLoggingIn ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="back-to-site">
          <router-link to="/">← Back to website</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const API_URL = 'http://localhost:5000'

// State
const email = ref('')
const password = ref('')
const error = ref('')
const isLoggingIn = ref(false)

// Handle login
const handleLogin = async () => {
  try {
    isLoggingIn.value = true
    error.value = ''

    const response = await axios.post(`${API_URL}/auth/login`, {
      email: email.value,
      password: password.value,
    })

    // Store auth state
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(response.data.user))

    // Redirect to admin dashboard
    router.push('/admin')
  } catch (err: any) {
    console.error('Login error:', err)

    if (err.response) {
      // Server responded with an error
      if (err.response.status === 404) {
        error.value = 'User not found. Please check your email.'
      } else if (err.response.status === 400) {
        error.value = 'Invalid password. Please try again.'
      } else {
        error.value = 'Login failed. Please try again later.'
      }
    } else {
      error.value = 'Cannot connect to the server. Please try again later.'
    }
  } finally {
    isLoggingIn.value = false
  }
}
</script>

<style scoped>
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  background-color: #f8f9fa;
  padding: 2rem 0;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 0 1rem;
}

.login-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.error-message {
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
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
  box-shadow: 0 0 0 2px rgba(65, 184, 131, 0.2);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #41b883;
  color: white;
  border: none;
}
</style>
