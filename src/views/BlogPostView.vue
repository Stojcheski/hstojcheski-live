<template>
  <div class="blog-post" v-if="post">
    <div class="container">
      <div class="blog-header">
        <h1>{{ post.title }}</h1>
        <p class="date">{{ post.date }}</p>
      </div>

      <div class="blog-content" v-html="post.content"></div>

      <div class="blog-footer">
        <router-link to="/blog" class="back-link">← Back to all articles</router-link>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <div class="container">
      <h1>Post Not Found</h1>
      <p>The blog post you're looking for doesn't exist.</p>
      <router-link to="/blog" class="btn btn-primary">Back to Blog</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const route = useRoute()
const blogStore = useBlogStore()
const post = computed(() => blogStore.getPostById(route.params.id))
</script>

<style scoped>
.blog-post,
.not-found {
  padding: 3rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.blog-header {
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
}

.date {
  font-size: 1rem;
  color: #666;
}

.blog-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.blog-content :deep(h2) {
  font-size: 1.8rem;
  color: #41b883;
  margin: 2rem 0 1rem;
}

.blog-content :deep(h3) {
  font-size: 1.4rem;
  margin: 1.5rem 0 0.75rem;
}

.blog-content :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
  margin-bottom: 1.5rem;
  margin-left: 1.5rem;
}

.blog-content :deep(li) {
  margin-bottom: 0.5rem;
}

.blog-footer {
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #41b883;
  font-weight: 600;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.not-found {
  text-align: center;
}

.not-found h1 {
  margin-bottom: 1rem;
}

.not-found p {
  margin-bottom: 2rem;
}
</style>
