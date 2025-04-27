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
        <router-link to="/blog" class="btn">Back to Blog</router-link>
      </div>
    </div>

    <!-- Add this for debugging -->
    <div class="container">
      <div
        class="debug"
        style="margin-top: 3rem; padding: 1rem; background: #f8f8f8; border-radius: 4px"
      >
        <h3>Debug Information</h3>
        <p>Post ID: {{ postId }}</p>
        <p>Loading: {{ loading }}</p>
        <p>Error: {{ error }}</p>
        <p>Post found: {{ post ? 'Yes' : 'No' }}</p>
        <button @click="togglePostDetails" class="btn">
          {{ showPostDetails ? 'Hide' : 'Show' }} Post Details
        </button>
        <pre v-if="showPostDetails">{{ JSON.stringify(post, null, 2) }}</pre>

        <h4 style="margin-top: 1rem">Raw Current Post</h4>
        <button @click="toggleRawPost" class="btn">
          {{ showRawPost ? 'Hide' : 'Show' }} Raw Post
        </button>
        <pre v-if="showRawPost">{{ JSON.stringify(blogStore.currentPost, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/BlogStore'

const route = useRoute()
const blogStore = useBlogStore()
const showPostDetails = ref(false)
const showRawPost = ref(false)

const loading = computed(() => blogStore.loading)
const error = computed(() => blogStore.error)

// Get post ID from route
const postId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

const post = computed(() => {
  const result = blogStore.getPostById(postId.value)
  console.log('Post computed result:', result)
  return result
})

const togglePostDetails = () => {
  showPostDetails.value = !showPostDetails.value
}

const toggleRawPost = () => {
  showRawPost.value = !showRawPost.value
}

onMounted(async () => {
  console.log('BlogPostView mounted, fetching post with ID:', postId.value)
  // Fetch the post if needed
  if (!post.value) {
    await blogStore.fetchPostById(postId.value)
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

.blog-footer {
  text-align: center;
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

pre {
  background-color: #f1f1f1;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.8rem;
  margin-top: 1rem;
}
</style>
