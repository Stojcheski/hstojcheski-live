<template>
  <div class="blog">
    <div class="container">
      <h1>Blog</h1>
      <p class="intro">
        I write about Salesforce development, best practices, and industry insights.
      </p>

      <div class="blog-list">
        <article v-for="post in blogPosts" :key="post.id" class="blog-card">
          <h2 class="blog-title">
            <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
          </h2>
          <p class="blog-date">{{ post.date }}</p>
          <p class="blog-summary">{{ post.summary }}</p>
          <router-link :to="`/blog/${post.id}`" class="read-more">Read more →</router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlogStore } from '@/stores/BlogStore'

const blogStore = useBlogStore()
const blogPosts = blogStore.getAllPosts
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
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.blog-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.blog-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.blog-title a:hover {
  color: #41b883;
}

.blog-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.blog-summary {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more {
  color: #41b883;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
