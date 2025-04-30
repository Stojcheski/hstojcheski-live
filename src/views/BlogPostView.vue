<!-- File location: src/views/BlogPostView.vue -->

<template>
  <section class="section container">
    <div v-if="isLoading" class="text-center mt-5">
      <p>Loading blog post...</p>
    </div>

    <div v-else-if="isError" class="text-center mt-5">
      <p>Error loading blog: {{ errorMessage }}</p>
    </div>

    <div v-else-if="!blog" class="text-center mt-5">
      <p>Blog post not found.</p>
    </div>

    <div v-else class="blog-content">
      <h1>{{ blog?.title }}</h1>
      <p class="mb-1"><strong>Author:</strong> {{ blog?.author?.username || 'Unknown' }}</p>
      <p class="mb-2"><strong>Published:</strong> {{ formatDate(blog?.publishedAt) }}</p>
      <p class="mb-3 text-muted">
        <em>{{ blog?.readTime }}</em>
      </p>
      <p class="mb-4 blog-summary">{{ blog?.summary }}</p>
      <p class="blog-full-content">{{ blog?.content }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  setup() {
    const route = useRoute()
    const blog = ref<any | null>(null)
    const isLoading = ref(true)
    const isError = ref(false)
    const errorMessage = ref('')

    const fetchBlog = async () => {
      isLoading.value = true
      try {
        const apiBase = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''
        const response = await axios.get(`${apiBase}/api/blogs/slug/${route.params.slug}`)
        blog.value = response.data
      } catch (error: any) {
        isError.value = true
        errorMessage.value = error.response?.data?.message || error.message || 'Unknown error'
      } finally {
        isLoading.value = false
      }
    }

    const formatDate = (dateString: string) => {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return isNaN(date.getTime())
        ? 'N/A'
        : date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
    }

    onMounted(fetchBlog)

    return { blog, isLoading, isError, errorMessage, formatDate }
  },
})
</script>

<style scoped>
.blog-content {
  margin-top: 2rem;
  padding: 1rem;
}

.blog-content h1 {
  margin-bottom: 1rem;
  color: var(--color-heading);
}

.blog-summary {
  font-size: 1.1rem;
  color: var(--color-text);
}

.blog-full-content {
  margin-top: 1.5rem;
  white-space: pre-line;
  line-height: 1.7;
  color: var(--color-text);
}
</style>
