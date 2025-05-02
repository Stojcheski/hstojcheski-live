<!-- src/views/admin/BlogManagement.vue -->
<template>
  <div class="blog-management">
    <h2>Blog Management</h2>

    <div v-if="loading" class="loading">Loading blog posts...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else>
      <div class="blog-controls">
        <button class="btn btn-primary">Add New Blog Post</button>
      </div>

      <div class="blog-list">
        <h3>All Blog Posts</h3>
        <table class="blog-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(blog, index) in blogs" :key="index">
              <td>{{ blog.title }}</td>
              <td>{{ blog.author || 'Unknown' }}</td>
              <td>{{ new Date(blog.createdAt).toLocaleDateString() }}</td>
              <td>{{ blog.isPublished ? 'Published' : 'Draft' }}</td>
              <td>
                <div class="action-buttons">
                  <button class="btn-sm btn-edit">Edit</button>
                  <button class="btn-sm btn-delete">Delete</button>
                </div>
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

const blogs = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Placeholder for blog management logic
// This will be implemented in the future
onMounted(() => {
  // Simulate API fetch
  setTimeout(() => {
    blogs.value = [
      {
        id: 1,
        title: 'Getting Started with Salesforce Omnistudio',
        author: 'Admin',
        createdAt: '2025-04-15T12:00:00',
        isPublished: true,
      },
      {
        id: 2,
        title: 'Best Practices for Apex Development',
        author: 'Admin',
        createdAt: '2025-03-28T14:30:00',
        isPublished: true,
      },
    ]
    loading.value = false
  }, 500)
})
</script>

<style scoped>
.blog-management {
  padding: 1rem 0;
}

h2,
h3 {
  margin-bottom: 1rem;
}

.blog-controls {
  margin-bottom: 2rem;
}

.blog-table {
  width: 100%;
  border-collapse: collapse;
}

.blog-table th,
.blog-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.btn-edit {
  background-color: #3498db;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
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
