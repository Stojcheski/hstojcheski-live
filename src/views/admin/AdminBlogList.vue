<!-- File location: src/views/admin/AdminBlogList.vue -->
<template>
  <section class="admin-section">
    <div class="section-header">
      <h1 class="title">Manage Blog Posts</h1>
      <input
        type="text"
        class="search-input"
        v-model="searchQuery"
        placeholder="Search by title..."
      />
    </div>

    <table class="blog-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filteredPosts" :key="post._id">
          <td class="post-title">{{ post.title }}</td>
          <td>
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
              ✏️
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
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface Blog {
  _id: string
  title: string
  isPublished: boolean
  createdAt: string
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const posts = ref<Blog[]>([])
    const searchQuery = ref('')

    const fetchBlogs = async () => {
      try {
        const apiBase = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''
        const { data } = await axios.get(`${apiBase}/api/blogs`)
        posts.value = data
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    const filteredPosts = computed(() => {
      return posts.value.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
    })

    const formatDate = (dateStr: string) => {
      return new Date(dateStr).toLocaleDateString()
    }

    const editPost = (id: string) => {
      router.push(`/admin/blog/edit/${id}`)
    }

    const togglePublishStatus = async (id: string, currentStatus: boolean) => {
      try {
        const apiBase = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''
        await axios.put(`${apiBase}/api/blogs/${id}`, { isPublished: !currentStatus })
        await fetchBlogs()
      } catch (error) {
        console.error('Error updating publish status:', error)
      }
    }

    const confirmDeletePost = async (id: string, title: string) => {
      if (!confirm(`Are you sure you want to delete "${title}"?`)) return
      try {
        const apiBase = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''
        await axios.delete(`${apiBase}/api/blogs/${id}`)
        await fetchBlogs()
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }

    onMounted(fetchBlogs)

    return {
      posts,
      searchQuery,
      filteredPosts,
      formatDate,
      editPost,
      togglePublishStatus,
      confirmDeletePost,
    }
  },
})
</script>

<style scoped>
.admin-section {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 250px;
}

.blog-table {
  width: 100%;
  border-collapse: collapse;
}

.blog-table th,
.blog-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.blog-table .post-title {
  font-weight: 500;
}

.blog-table .post-date {
  font-size: 0.9rem;
  color: #666;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status-badge.published {
  background-color: #e0fbe2;
  color: #2e7d32;
}

.status-badge.draft {
  background-color: #fbe9e7;
  color: #d84315;
}

.action-btn {
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.edit-btn {
  background-color: #e3f2fd;
  color: #1565c0;
}

.publish-btn {
  background-color: #fff8e1;
  color: #f9a825;
}

.delete-btn {
  background-color: #ffebee;
  color: #c62828;
}
</style>
