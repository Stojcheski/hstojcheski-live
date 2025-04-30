<template>
  <div class="admin-dashboard">
    <div class="container">
      <h1>Admin Dashboard</h1>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Blog Posts</h3>
          <p class="stat-number">{{ stats.totalPosts }}</p>
        </div>
        <div class="stat-card">
          <h3>Published Posts</h3>
          <p class="stat-number">{{ stats.publishedPosts }}</p>
        </div>
        <div class="stat-card">
          <h3>Draft Posts</h3>
          <p class="stat-number">{{ stats.draftPosts }}</p>
        </div>
      </div>

      <div class="dashboard-actions">
        <router-link to="/admin/blog/new" class="btn btn-primary"> Create New Post </router-link>
        <router-link to="/admin/blog" class="btn btn-secondary"> Manage Posts </router-link>
      </div>

      <div v-if="recentPosts.length > 0" class="recent-posts">
        <h2>Recent Posts</h2>
        <div class="post-list">
          <div v-for="post in recentPosts" :key="post._id" class="post-item">
            <div class="post-info">
              <h3>{{ post.title }}</h3>
              <p class="post-date">{{ formatDate(post.createdAt) }}</p>
              <p class="post-status" :class="post.isPublished ? 'published' : 'draft'">
                {{ post.isPublished ? 'Published' : 'Draft' }}
              </p>
            </div>
            <div class="post-actions">
              <router-link :to="`/admin/blog/edit/${post._id}`" class="btn-edit">Edit</router-link>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="no-posts">
        <p>No blog posts yet. Start creating your first post!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
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

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
}

const recentPosts = ref<BlogPost[]>([])
const stats = ref<DashboardStats>({
  totalPosts: 0,
  publishedPosts: 0,
  draftPosts: 0,
})

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const fetchDashboardData = async (): Promise<void> => {
  try {
    // For local development
    const apiUrl = 'http://localhost:5000/api'

    // First, get dashboard stats
    const statsResponse = await axios.get(`${apiUrl}/blogs/stats`)
    stats.value = statsResponse.data

    // Then, get recent posts
    const postsResponse = await axios.get(`${apiUrl}/blogs/recent`)
    recentPosts.value = postsResponse.data
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    // Here you could set an error state if needed
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 1.1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #41b883;
}

.dashboard-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
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

.recent-posts {
  margin-top: 2rem;
}

.recent-posts h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.post-status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.post-status.published {
  background-color: #e6f7ef;
  color: #41b883;
}

.post-status.draft {
  background-color: #f0f0f0;
  color: #666;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #f0f8f4;
  color: #41b883;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn-edit:hover {
  background-color: #e0f0e9;
}

.no-posts {
  text-align: center;
  padding: 2rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  color: #666;
}

@media (max-width: 768px) {
  .dashboard-stats {
    grid-template-columns: 1fr;
  }

  .dashboard-actions {
    flex-direction: column;
  }

  .post-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .post-actions {
    margin-top: 1rem;
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
