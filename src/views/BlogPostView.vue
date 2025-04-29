<!-- src/views/BlogPostView.vue -->
<template>
  <div class="blog-post-container">
    <div v-if="loading" class="loading">
      <p>Loading blog post...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <router-link to="/blog" class="btn">Back to Blog</router-link>
    </div>

    <div v-else-if="post" class="blog-post">
      <div class="container">
        <div class="blog-header">
          <h1>{{ post.title }}</h1>
          <div class="blog-meta">
            <span class="blog-date">{{ formatDate(post.publishedAt || post.createdAt) }}</span>
            <span class="blog-readtime">{{ post.readTime }}</span>
            <span v-if="post.tags && post.tags.length" class="blog-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
          </div>
        </div>

        <div class="blog-content" v-html="renderContent(post.content)"></div>

        <div class="blog-footer">
          <router-link to="/blog" class="back-link">← Back to all articles</router-link>
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <div class="container">
        <h1>Post Not Found</h1>
        <p>The blog post you're looking for doesn't exist or has been removed.</p>
        <router-link to="/blog" class="btn">Back to Blog</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/BlogStore'

const route = useRoute()
const blogStore = useBlogStore()
const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)

// Get post slug from route
const slug = computed(() => route.params.slug as string)

// Fetch the post and watch for changes
const post = computed(() => {
  return blogStore.currentPost
})

// Format date for display
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Function to render content with proper formatting
// This is a simple version - in a real app, you might use a markdown parser
const renderContent = (content: string) => {
  // For now, we'll assume content is stored as HTML
  return content
}

// Fetch the post when component is mounted
onMounted(async () => {
  if (slug.value) {
    await blogStore.fetchPostBySlug(slug.value)
  }
})
</script>

<style scoped>
.blog-post-container {
  padding: 3rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading,
.error,
.not-found {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.blog-header {
  margin-bottom: A2rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 2rem;
}

.blog-date {
  position: relative;
}

.blog-date::after {
  content: '•';
  margin-left: 0.5rem;
}

.blog-readtime {
  font-style: italic;
}

.blog-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background-color: #f0f8f4;
  color: #41b883;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.blog-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  line-height: 1.7;
}

/* Styles for rendered content */
.blog-content :deep(h2) {
  font-size: 1.8rem;
  margin: 1.5rem 0 1rem;
  color: #41b883;
}

.blog-content :deep(h3) {
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
}

.blog-content :deep(p) {
  margin-bottom: 1.5rem;
}

.blog-content :deep(a) {
  color: #41b883;
  text-decoration: underline;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin-bottom: 1.5rem;
  margin-left: 2rem;
}

.blog-content :deep(li) {
  margin-bottom: 0.5rem;
}

.blog-content :deep(blockquote) {
  padding-left: 1rem;
  border-left: 4px solid #41b883;
  font-style: italic;
  margin: 1.5rem 0;
  color: #666;
}

.blog-content :deep(pre) {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.blog-content :deep(code) {
  font-family: monospace;
  background-color: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 2px;
}

.blog-footer {
  text-align: center;
  margin-top: 3rem;
}

.back-link {
  color: #41b883;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.back-link:hover {
  text-decoration: underline;
}

.btn {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  display: inline-block;
  text-decoration: none;
}

.btn:hover {
  background-color: #349268;
}
</style>
