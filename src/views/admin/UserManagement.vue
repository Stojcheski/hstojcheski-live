<!-- src/views/admin/UserManagement.vue -->
<template>
  <div class="user-management">
    <h2>User Management</h2>

    <div v-if="loading" class="loading">Loading users...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <div class="add-user-section">
        <h3>Add New User</h3>
        <form @submit.prevent="createUser" class="user-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="newUser.username"
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="newUser.email" required class="form-control" />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="newUser.password"
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="newUser.role" class="form-control">
              <option value="viewer">Viewer</option>
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Create User</button>
        </form>
      </div>

      <div class="users-list">
        <h3>All Users</h3>
        <table class="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <select v-model="user.role" @change="updateRole(user)" class="role-select">
                  <option value="viewer">Viewer</option>
                  <option value="author">Author</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/AuthStore'

const authStore = useAuthStore()
const users = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const newUser = ref({
  username: '',
  email: '',
  password: '',
  role: 'viewer',
})

const fetchUsers = async () => {
  loading.value = true
  error.value = null

  try {
    const result = await authStore.getAllUsers()
    if (result) {
      users.value = result
    } else {
      error.value = authStore.error || 'Failed to load users'
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}

const createUser = async () => {
  try {
    const result = await authStore.createUser(newUser.value)
    if (result) {
      // Reset form
      newUser.value = {
        username: '',
        email: '',
        password: '',
        role: 'viewer',
      }

      // Refresh user list
      await fetchUsers()
    } else {
      error.value = authStore.error || 'Failed to create user'
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred'
  }
}

const updateRole = async (user: any) => {
  try {
    await authStore.updateUserRole(user.id, user.role)
    // Refresh user list to confirm changes
    await fetchUsers()
  } catch (err: any) {
    error.value = err.message || 'Failed to update user role'
    // Revert the change in the UI
    await fetchUsers()
  }
}

onMounted(fetchUsers)
</script>

<style scoped>
.user-management {
  padding: 1rem 0;
}

h2,
h3 {
  margin-bottom: 1rem;
}

.add-user-section {
  background-color: #f5f5f5;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.user-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  grid-column: 1 / 3;
}

.btn-primary {
  background-color: #41b883;
  color: white;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.role-select {
  padding: 0.25rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.loading,
.error {
  padding: 1rem;
  margin: 1rem 0;
  background-color: #f8f8f8;
  border-radius: 4px;
}

.error {
  color: #e74c3c;
  background-color: #fee;
}
</style>
