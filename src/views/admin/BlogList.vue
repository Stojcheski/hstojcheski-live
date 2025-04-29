<!-- src/views/admin/BlogList.vue -->
<template>
  <div class="blog-list">
    <div class="list-header">
      <h2>Blog Posts</h2>
      <router-link :to="{ name: 'create-blog' }" class="create-btn"> Create New Post </router-link>
    </div>

    <div v-if="blogStore.loading" class="loading">
      <p>Loading blog posts...</p>
    </div>

    <div v-else-if="blogStore.error" class="error">
      <p>{{ blogStore.error }}</p>
      <button @click="fetchPosts" class="btn">Try Again</button>
    </div>

    <div v-else-if="adminPosts.length === 0" class="no-posts">
      <p>No blog posts yet. Create your first post!</p>
    </div>

    <div v-else class="posts-table-container">
      <table class="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in adminPosts" :key="post._id">
            <td>
              <div class="post-title">{{ post.title }}</div>
              <div class="post-slug">{{ post.slug }}</div>
            </td>
            <td>
              <span class="status" :class="getStatusClass(post)">
                {{ getStatus(post) }}
              </span>
            </td>
            <td>{{ formatDate(post.publishedAt || post.createdAt) }}</td>
            <td>{{ post.viewCount }}</td>
            <td>
              <div class="actions">
                <router-link :to="{ name: 'edit-blog', params: { id: post._id } }" class="edit-btn">
                  Edit
                </router-link>
                <button @click="confirmDelete(post)" class="delete-btn">Delete</button>
                <a :href="`/blog/${post.slug}`" target="_blank" class="view-btn">View</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showDeleteModal" class="delete-modal">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete "{{ postToDelete?.title }}"?</p>
        <p>This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="cancelDelete" class="cancel-btn">Cancel</button>
          <button @click="deletePost" class="confirm-delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBlogStore } from '@/stores/BlogStore'

const blogStore = useBlogStore()
const adminPosts = computed(() => blogStore.getAdminPosts)

const showDeleteModal = ref(false)
const postToDelete = ref(null)

const fetchPosts = () => {
  blogStore.fetchAdminPosts()
}

const getStatus = (post) => {
  if (post.isPublished) return 'Published'
  if (post.isDraft) return 'Draft'
  if (post.isScheduled) return 'Scheduled'
  return 'Unknown'
}

const getStatusClass = (post) => {
  if (post.isPublished) return 'published'
  if (post.isDraft) return 'draft'
  if (post.isScheduled) return 'scheduled'
  return ''
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const confirmDelete = (post) => {
  postToDelete.value = post
  showDeleteModal.value = true
}

const cancelDelete = () => {
  postToDelete.value = null
  showDeleteModal.value = false
}

const deletePost = async () => {
  if (postToDelete.value) {
    const success = await blogStore.deletePost(postToDelete.value._id)
    if (success) {
      // Refresh the list if needed
      fetchPosts()
    }
    showDeleteModal.value = false
    postToDelete.value = null
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.blog-list {
  position: relative;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.create-btn {
  padding: 0.5rem 1rem;
  background-color: #41b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.create-btn:hover {
  background-color: #349268;
}

.loading,
.error,
.no-posts {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.posts-table-container {
  overflow-x: auto;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table th,
.posts-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.posts-table th {
  font-weight: 600;
  color: #333;
  background-color: #f5f5f5;
}

.post-title {
  font-weight: 500;
  color: #333;
}

.post-slug {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}

.status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status.published {
  background-color: #d1e7dd;
  color: #0a3622;
}

.status.draft {
  background-color: #e2e3e5;
  color: #41464b;
}

.status.scheduled {
  background-color: #cff4fc;
  color: #055160;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn,
.view-btn {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #e2e3e5;
  color: #41464b;
  border: none;
}

.edit-btn:hover {
  background-color: #d3d4d5;
}

.delete-btn {
  background-color: #f8d7da;
  color: #721c24;
  border: none;
}

.delete-btn:hover {
  background-color: #f5c2c7;
}

.view-btn {
  background-color: #cff4fc;
  color: #055160;
  border: none;
}

.view-btn:hover {
  background-color: #b6effb;
}

.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.modal-content h3 {
  margin-top: 0;
  color: #333;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-btn,
.confirm-delete-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.cancel-btn {
  background-color: #e2e3e5;
  color: #41464b;
  border: none;
}

.confirm-delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
}

.btn {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn:hover {
  background-color: #349268;
}
</style>
