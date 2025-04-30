<!-- File location: src/views/BlogView.vue -->

<template>
  <section class="section container">
    <div class="section-heading">
      <h1>Blog Articles</h1>
    </div>

    <div v-if="isLoading" class="text-center mt-5">
      <p>Loading blogs...</p>
    </div>

    <div v-else-if="isError" class="text-center mt-5">
      <p>Error loading blogs: {{ errorMessage }}</p>
    </div>

    <div v-else-if="blogs.length === 0" class="text-center mt-5">
      <p>No blogs found.</p>
    </div>

    <div v-else class="blog-list">
      <div v-for="blog in blogs" :key="blog._id" class="blog-card">
        <h2>{{ blog.title }}</h2>
        <p class="mb-1"><strong>Author:</strong> {{ blog.author.username || 'Unknown' }}</p>
        <p class="mb-1"><strong>Published:</strong> {{ formatDate(blog.createdAt) }}</p>
        <p class="mb-2"><strong>Summary:</strong> {{ blog.summary }}</p>
        <p>{{ previewContent(blog.content) }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useBlogStore } from '@/stores/BlogStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const blogStore = useBlogStore()
    const { blogs, isLoading, isError, errorMessage } = storeToRefs(blogStore)

    onMounted(() => {
      blogStore.fetchBlogs()
    })

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const previewContent = (content: string) => {
      if (!content) return ''
      return content.length > 100 ? content.slice(0, 100) + '...' : content
    }

    return { blogs, isLoading, isError, errorMessage, formatDate, previewContent }
  },
})
</script>

<style scoped>
.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.blog-card {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background-soft);
  transition: box-shadow 0.3s;
}

.blog-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.blog-card h2 {
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.blog-card p {
  color: var(--color-text);
}
</style>
