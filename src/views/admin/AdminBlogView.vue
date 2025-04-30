<template>
  <div class="admin-blog">
    <div class="container">
      <div class="header">
        <h1>Blog Management</h1>
        <router-link to="/admin/blog/new" class="btn btn-primary">
          <span class="icon">+</span> Create New Post
        </router-link>
      </div>

      <div class="filters">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search posts..."
            @input="filterPosts"
          />
        </div>
        <div class="filter-options">
          <select v-model="statusFilter" @change="filterPosts">
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="loading">
        <p>Loading posts...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="fetchPosts" class="btn btn-secondary">Try Again</button>
      </div>

      <div v-else-if="filteredPosts.length === 0" class="no-posts">
        <p v-if="searchQuery || statusFilter !== 'all'">No posts match your filters.</p>
        <p v-else>No blog posts found. Start by creating a new post!</p>
      </div>

      <div v-else class="blog-list">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in filteredPosts" :key="post._id">
              <td class="post-title">{{ post.title }}</td>
              <td>
                <span class="status-badge" :class="post.isPublished ? 'published' : 'draft'">
                  {{ post.isPublished ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td>{{ formatDate(post.createdAt) }}</td>
              <td>{{ formatDate(post.updatedAt) }}</td>
              <td class="actions">
                <router-link :to="`/admin/blog/edit/${post._id}`" class="btn-edit">
                  Edit
                </router-link>
                <button @click="togglePublishStatus(post)" class="btn-toggle">
                  {{ post.isPublished ? 'Unpublish' : 'Publish' }}
                </button>
                <button @click="confirmDelete(post)" class="btn-delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirm Delete</h3>
        <p>
          Are you sure you want to delete "<strong>{{ postToDelete?.title }}</strong
          >"?
        </p>
        <p class="warning">This action cannot be undone.</p>
        <div class="modal-actions">
          <button @click="showDeleteModal = false" class="btn-cancel">Cancel</button>
          <button @click="deletePost" class="btn-confirm">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

interface BlogPost {
  _id: string
  title: string
  content: string
  summary: string
  createdAt: string
  updatedAt: string
  isPublished: boolean
}

const posts = ref<BlogPost[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const statusFilter = ref('all')
const showDeleteModal = ref(false)
const postToDelete = ref<BlogPost | null>(null)

const filteredPosts = computed(() => {
  return posts.value.filter((post) => {
    // Filter by search query
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase())

    // Filter by status
    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'published' && post.isPublished) ||
      (statusFilter.value === 'draft' && !post.isPublished)

    return matchesSearch && matchesStatus
  })
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const fetchPosts = async (): Promise<void> => {
  loading.value = true
  error.value = null

  try {
    // For local development
    const apiUrl = 'http://localhost:5000/api'
    const response = await axios.get(`${apiUrl}/blogs`)
    posts.value = response.data
  } catch (err) {
    error.value = 'Failed to load blog posts. Please try again.'
    console.error('Error fetching posts:', err)
  } finally {
    loading.value = false
  }
}

const filterPosts = (): void => {
  // This function is just a placeholder to trigger the computed property
  // The actual filtering is done in the computed property
}

const togglePublishStatus = async (post: BlogPost): Promise<void> => {
  try {
    // For local development
    const apiUrl = 'http://localhost:5000/api'
    await axios.patch(`${apiUrl}/blogs/${post._id}/publish`, {
      isPublished: !post.isPublished,
    })

    // Update the post in the local state
    const index = posts.value.findIndex((p) => p._id === post._id)
    if (index !== -1) {
      posts.value[index].isPublished = !post.isPublished
    }
  } catch (err) {
    console.error('Error toggling publish status:', err)
    // You could show an error message here
  }
}

const confirmDelete = (post: BlogPost): void => {
  postToDelete.value = post
  showDeleteModal.value = true
}

const deletePost = async (): Promise<void> => {
  if (!postToDelete.value) return

  try {
    // For local development
    const apiUrl = 'http://localhost:5000/api'
    await axios.delete(`${apiUrl}/blogs/${postToDelete.value._id}`)

    // Remove the post from the local state
    posts.value = posts.value.filter((p) => p._id !== postToDelete.value?._id)

    // Close the modal
    showDeleteModal.value = false
    postToDelete.value = null
  } catch (err) {
    console.error('Error deleting post:', err)
    // You could show an error message here
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.admin-blog {
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background-color: #41b883;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #349268;
}

.btn-secondary {
  background-color: white;
  color: #41b883;
  border: 1px solid #41b883;
}

.btn-secondary:hover {
  background-color: #f0f8f4;
}

.icon {
  font-weight: bold;
  margin-right: 0.5rem;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.search-box input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filter-options select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
}

.blog-list {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  background-color: #f8f8f8;
  font-weight: 600;
  color: #333;
}

.post-title {
  font-weight: 500;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.published {
  background-color: #e6f7ef;
  color: #41b883;
}

.status-badge.draft {
  background-color: #f0f0f0;
  color: #666;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-toggle,
.btn-delete {
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  font-weight: 500;
}

.btn-edit {
  background-color: #f0f8f4;
  color: #41b883;
  text-decoration: none;
}

.btn-toggle {
  background-color: #e6f0f9;
  color: #3498db;
}

.btn-delete {
  background-color: #fee;
  color: #e74c3c;
}

.loading,
.error-message,
.no-posts {
  text-align: center;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  color: #666;
}

.error-message {
  color: #e74c3c;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal h3 {
  margin-top: 0;
  color: #333;
}

.warning {
  color: #e74c3c;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn-cancel,
.btn-confirm {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #666;
}

.btn-confirm {
  background-color: #e74c3c;
  color: white;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filters {
    flex-direction: column;
    gap: 1rem;
  }

  .search-box {
    max-width: 100%;
  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    margin-bottom: 1rem;
    border: 1px solid #ddd;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    left: 1rem;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: 600;
  }

  td:nth-of-type(1):before {
    content: 'Title';
  }
  td:nth-of-type(2):before {
    content: 'Status';
  }
  td:nth-of-type(3):before {
    content: 'Created';
  }
  td:nth-of-type(4):before {
    content: 'Last Updated';
  }
  td:nth-of-type(5):before {
    content: 'Actions';
  }

  .actions {
    flex-wrap: wrap;
  }
}
</style>
