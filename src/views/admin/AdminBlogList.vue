<template>
  <div class="admin-blog-list">
    <div class="container">
      <div class="admin-header">
        <h1>Manage Blog Posts</h1>
        <router-link to="/admin/blog/editor" class="btn btn-primary">
          <span class="icon">+</span> New Post
        </router-link>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="loading" class="loading">
        <p>Loading blog posts...</p>
      </div>

      <div v-else-if="posts.length === 0" class="no-posts">
        <p>No blog posts found. Create your first post to get started!</p>
      </div>

      <div v-else class="blog-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post._id">
              <td class="post-title">{{ post.title }}</td>
              <td class="post-status">
                <span
                  class="status-badge"
                  :class="{ published: post.isPublished, draft: !post.isPublished }"
                >
                  {{ post.isPublished ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td class="post-date">{{ formatDate(post.createdAt) }}</td>
              <td class="post-actions">
                <button @click="editPost(post._id)" class="action-btn edit-btn" title="Edit post">
                  Edit
                </button>
                <button
                  @click="togglePublishStatus(post._id, post.isPublished)"
                  class="action-btn publish-btn"
                  :title="post.isPublished ? 'Unpublish post' : 'Publish post'"
                >
                  {{ post.isPublished ? 'Unpublish' : 'Publish' }}
                </button>
                <button
                  @click="confirmDeletePost(post._id, post.title)"
                  class="action-btn delete-btn"
                  title="Delete post"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete "{{ postToDelete.title }}"?</p>
        <p class="warning">This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="deletePost" class="btn btn-danger">Delete</button>
          <button @click="cancelDelete" class="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
// Use environment variable for API URL with fallback to localhost
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Define proper interface for blog post
interface BlogPost {
  _id: string
  title: string
  content: string
  summary: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

// State
const posts = ref<BlogPost[]>([])
const loading = ref(true)
const error = ref('')
const showDeleteModal = ref(false)
const postToDelete = ref({ id: '', title: '' })

const fetchPosts = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_BASE}/api/blogs`)
    console.log('Response data:', response.data)
    posts.value = response.data
  } catch (err) {
    console.error('Error fetching posts:', err)
    error.value = 'Failed to load blog posts. Please try again later.'
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const editPost = (postId: string) => {
  router.push(`/admin/blog/edit/${postId}`)
}

const togglePublishStatus = async (postId: string, currentStatus: boolean) => {
  try {
    console.log(
      `Toggling publish status for post ${postId} from ${currentStatus} to ${!currentStatus}`,
    )

    const response = await axios.patch(`${API_BASE}/api/blogs/${postId}`, {
      isPublished: !currentStatus,
    })

    console.log('Toggle publish response:', response.data)

    await fetchPosts()
  } catch (err) {
    console.error('Error updating post status:', err)
    error.value = 'Failed to update the post status. Please try again later.'
  }
}

const confirmDeletePost = (postId: string, postTitle: string) => {
  postToDelete.value = { id: postId, title: postTitle }
  showDeleteModal.value = true
}

const deletePost = async () => {
  try {
    console.log(`Deleting post: ${postToDelete.value.id}`)

    await axios.delete(`${API_BASE}/api/blogs/${postToDelete.value.id}`)

    console.log('Post deleted successfully')
    showDeleteModal.value = false

    // Refresh the posts list
    await fetchPosts()
  } catch (err) {
    console.error('Error deleting post:', err)
    error.value = 'Failed to delete the post. Please try again later.'
    showDeleteModal.value = false
  }
}

// Cancel delete
const cancelDelete = () => {
  showDeleteModal.value = false
  postToDelete.value = { id: '', title: '' }
}

// Load posts on mount
onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.admin-blog-list {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.2rem;
  color: #333;
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: #41b883;
  color: white;
}

.btn-primary:hover {
  background-color: #349268;
}

.icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.error-message {
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}

.loading,
.no-posts {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.blog-table {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
}

.post-title {
  font-weight: 500;
  color: #333;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
}

.status-badge.published {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.draft {
  background-color: #f8f9fa;
  color: #6c757d;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: #e9ecef;
  color: #495057;
}

.edit-btn:hover {
  background-color: #dee2e6;
}

.publish-btn {
  background-color: #cff4fc;
  color: #055160;
}

.publish-btn:hover {
  background-color: #b6effb;
}

.delete-btn {
  background-color: #f8d7da;
  color: #721c24;
}

.delete-btn:hover {
  background-color: #f5c2c7;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  margin-top: 0;
  color: #333;
}

.warning {
  color: #721c24;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-secondary {
  background-color: #f2f2f2;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
</style>
