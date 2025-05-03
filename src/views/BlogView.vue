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
        <article v-for="post in blogPosts" :key="post.slug" class="blog-card">
          <h2 class="blog-title">
            <router-link :to="`/blog/${post.slug}`">{{ post.title }}</router-link>
          </h2>
          <p class="blog-date">{{ post.date }}</p>
          <div v-if="post.tags && post.tags.length" class="blog-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
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
const blogPosts = computed(() => {
  const posts = blogStore.getAllPosts
  return posts
})
const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)

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

.blog-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background-color: #f0f8f4;
  color: #41b883;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
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

pre {
  background-color: #f1f1f1;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.8rem;
  margin-top: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #41b883;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #349268;
}
</style>
