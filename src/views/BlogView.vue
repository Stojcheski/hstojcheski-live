<!-- src/views/BlogView.vue -->
<template>
  <div class="blog">
    <div class="container">
      <h1>Blog</h1>
      <p class="intro">
        I write about Salesforce development, best practices, and industry insights.
      </p>

      <div v-if="loading" class="loading">
        <p>Loading blog posts...</p>
      </div>
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="reloadPosts" class="btn">Try Again</button>
      </div>
      <div v-else-if="blogPosts.length === 0" class="no-posts">
        <p>No blog posts available at the moment.</p>
      </div>
      <div v-else class="blog-list">
        <article v-for="post in blogPosts" :key="post._id" class="blog-card">
          <h2 class="blog-title">
            <router-link :to="`/blog/${post.slug}`">{{ post.title }}</router-link>
          </h2>
          <div class="blog-meta">
            <span class="blog-date">{{ formatDate(post.publishedAt || post.createdAt) }}</span>
            <span class="blog-readtime">{{ post.readTime }}</span>
            <span v-if="post.tags && post.tags.length" class="blog-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
            </span>
          </div>
          <p class="blog-summary">{{ post.summary }}</p>
          <router-link :to="`/blog/${post.slug}`" class="read-more">Read more →</router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBlogStore } from '@/stores/BlogStore'
import { onMounted, computed } from 'vue'

const blogStore = useBlogStore()
const blogPosts = computed(() => blogStore.getPublishedPosts)
const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const reloadPosts = () => {
  blogStore.fetchPosts()
}

onMounted(() => {
  blogStore.fetchPosts()
})
</script>

<style scoped>
.blog {
  padding: 3rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
}

.intro {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
}

.loading,
.error,
.no-posts {
  text-align: center;
  padding: 2rem;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
}

.blog-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.blog-title a {
  color: #333;
  text-decoration: none;
}

.blog-title a:hover {
  color: #41b883;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
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

.blog-summary {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more {
  color: #41b883;
  font-weight: 600;
  text-decoration: none;
}

.read-more:hover {
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
}

.btn:hover {
  background-color: #349268;
}
</style>
