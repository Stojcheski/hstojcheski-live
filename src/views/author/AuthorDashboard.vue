<!-- src/views/author/AuthorDashboard.vue -->
<template>
  <div class="author-dashboard">
    <div class="container">
      <h1>Author Dashboard</h1>

      <div v-if="loading" class="loading">Loading your posts...</div>

      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else>
        <div class="author-controls">
          <button class="btn btn-primary">Create New Post</button>
        </div>

        <div class="author-posts">
          <h2>Your Blog Posts</h2>

          <div v-if="posts.length === 0" class="no-posts">
            You haven't created any posts yet. Click the button above to get started!
          </div>

          <div v-else class="posts-list">
            <div v-for="(post, index) in posts" :key="index" class="post-card">
              <h3>{{ post.title }}</h3>
              <div class="post-meta">
                <span class="post-date">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
                <span class="post-status" :class="post.isPublished ? 'published' : 'draft'">
                  {{ post.isPublished ? 'Published' : 'Draft' }}
                </span>
              </div>
              <p class="post-summary">{{ post.summary }}</p>
              <div class="post-actions">
                <button class="btn-sm btn-edit">Edit Post</button>
                <button class="btn-sm btn-delete">Delete</button>
                <button v-if="!post.isPublished" class="btn-sm btn-publish">Publish</button>
                <button v-else class="btn-sm btn-unpublish">Unpublish</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/AuthStore'

const authStore = useAuthStore()
const posts = ref<any[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(() => {
  // Simulate getting author's posts - will be replaced with actual API calls
  setTimeout(() => {
    // Sample data
    posts.value = [
      {
        id: 1,
        title: 'My First Blog Post',
        summary: 'This is a short summary of the first blog post content.',
        createdAt: '2025-04-20T12:00:00',
        isPublished: true,
      },
      {
        id: 2,
        title: 'Working Draft Post',
        summary: 'This is a draft post that is still being worked on.',
        createdAt: '2025-04-25T10:30:00',
        isPublished: false,
      },
    ]
    loading.value = false
  }, 500)
})
</script>

<style scoped>
.author-dashboard {
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1,
h2 {
  margin-bottom: 1.5rem;
}

.author-controls {
  margin-bottom: 2rem;
}

.no-posts {
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  text-align: center;
  color: #666;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.post-status {
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.post-status.published {
  background-color: #d4edda;
  color: #155724;
}

.post-status.draft {
  background-color: #f8f9fa;
  color: #6c757d;
}

.post-summary {
  margin-bottom: 1rem;
  color: #333;
}

.post-actions {
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

.btn-publish {
  background-color: #2ecc71;
  color: white;
}

.btn-unpublish {
  background-color: #f39c12;
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
