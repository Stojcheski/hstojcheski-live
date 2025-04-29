<!-- src/views/admin/AdminDashboard.vue -->
<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <div class="container">
        <h1>Admin Dashboard</h1>
        <div class="user-info">
          <span v-if="authStore.user">{{ authStore.user.username }}</span>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </div>
      </div>
    </header>

    <div class="container">
      <div class="admin-content">
        <aside class="sidebar">
          <nav class="admin-nav">
            <router-link :to="{ name: 'admin-blogs' }" class="nav-link"> Blog Posts </router-link>
            <!-- Add more nav links as needed -->
          </nav>
        </aside>

        <main class="main-content">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'admin-login' })
}

onMounted(() => {
  // Check authentication
  if (!authStore.isAuthenticated) {
    router.push({ name: 'admin-login' })
  }
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.admin-header {
  background-color: #41b883;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.admin-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.admin-content {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.sidebar {
  width: 250px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-link {
  padding: 0.75rem;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: #f0f8f4;
  color: #41b883;
}

.main-content {
  flex: 1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .admin-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}
</style>
