<!-- src/views/admin/AdminDashboard.vue -->
<template>
  <div class="admin-dashboard">
    <div class="container">
      <h1>Admin Dashboard</h1>

      <div class="admin-nav">
        <router-link to="/admin/users" class="admin-nav-link">User Management</router-link>
        <router-link to="/admin/blogs" class="admin-nav-link">Blog Management</router-link>
      </div>

      <router-view />
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  margin-bottom: 2rem;
}

.admin-nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.admin-nav-link {
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}

.admin-nav-link.router-link-active {
  background-color: #41b883;
  color: white;
}
</style>
