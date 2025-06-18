<template>
  <div class="blog-post-container">
    <!-- Loading state -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading article...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="isError" class="error-state">
      <div class="error-icon">!</div>
      <h2>Something went wrong</h2>
      <p>{{ errorMessage }}</p>
      <button @click="fetchBlog" class="retry-button">Try again</button>
    </div>

    <!-- Not found state -->
    <div v-else-if="!blog" class="not-found-state">
      <h2>Article not found</h2>
      <p>The article you're looking for doesn't seem to exist.</p>
      <router-link to="/blog" class="back-button">Back to all articles</router-link>
    </div>

    <!-- Blog content -->
    <article v-else class="blog-article">
      <!-- Featured image (if available) -->
      <!-- <div v-if="blog.featuredImage" class="featured-image-container"> -->
      <!--  <img :src="blog.featuredImage" :alt="blog.title" class="featured-image" /> -->
      <!-- </div> -->

      <div class="blog-container">
        <!-- Blog header -->
        <header class="blog-header">
          <h1>{{ blog.title }}</h1>

          <div class="blog-meta">
            <div class="author-info">
              <img
                src="@/assets/profile-placeholder.png"
                alt="Author avatar"
                class="author-avatar"
              />
              <span class="author-name">{{ 'Hristijan Stojcheski' }}</span>
            </div>

            <div class="publication-info">
              <span class="publish-date">{{ formatDate(blog.createdAt) }}</span>
              <span class="read-time">{{ blog.readTime }}</span>
            </div>
          </div>
        </header>

        <!-- Blog summary -->
        <div class="blog-summary">
          <p>{{ blog.summary }}</p>
        </div>

        <!-- Blog content -->
        <div class="blog-content">
          <p v-html="formatContent(blog.content)"></p>
        </div>

        <!-- Blog footer -->
        <footer class="blog-footer">
          <div class="tags" v-if="blog.tags && blog.tags.length">
            <span class="tag" v-for="(tag, index) in blog.tags" :key="index">{{ tag }}</span>
          </div>

          <div class="social-share">
            <button class="share-button"><span class="share-icon">↗</span> Share</button>
          </div>

          <router-link to="/blog" class="back-link"> ← Back to all articles </router-link>
        </footer>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import type { BlogPost } from '@/stores/BlogStore'

export default defineComponent({
  setup() {
    const route = useRoute()
    const blog = ref<BlogPost | null>(null)
    const isLoading = ref(true)
    const isError = ref(false)
    const errorMessage = ref('')

    const fetchBlog = async () => {
      isLoading.value = true
      isError.value = false

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/blogs/slug/${route.params.slug}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        blog.value = response.data
      } catch (error: unknown) {
        console.error('Full error details:', error)
        isError.value = true
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

    const formatContent = (content: string) => {
      if (!content) return ''

      // Basic markdown-like formatting (simple implementation)
      // Replace line breaks with paragraph tags
      let formatted = content.replace(/\n\n/g, '</p><p>')

      // Replace remaining single line breaks with <br>
      formatted = formatted.replace(/\n/g, '<br>')

      // Wrap in paragraph tags if not already
      if (!formatted.startsWith('<p>')) {
        formatted = '<p>' + formatted
      }

      if (!formatted.endsWith('</p>')) {
        formatted = formatted + '</p>'
      }

      return formatted
    }

    onMounted(fetchBlog)

    return { blog, isLoading, isError, errorMessage, formatDate, formatContent, fetchBlog }
  },
})
</script>

<style scoped>
.blog-post-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Loading state */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(65, 184, 131, 0.1);
  border-radius: 50%;
  border-top-color: #41b883;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error state */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 99, 71, 0.05);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.error-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(255, 99, 71, 0.1);
  color: tomato;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.retry-button {
  margin-top: 1.5rem;
  padding: 0.5rem 1.5rem;
  background-color: #41b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.retry-button:hover {
  background-color: #349268;
}

/* Not found state */
.not-found-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.back-button {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.5rem 1.5rem;
  background-color: #41b883;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #349268;
}

/* Blog article */
.blog-article {
  max-width: 800px;
  margin: 0 auto;
}

.featured-image-container {
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
  margin-bottom: 2rem;
}

/* Blog header */
.blog-header {
  margin-bottom: 2rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  line-height: 1.2;
}

.blog-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: #333;
}

.publication-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.publish-date {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.read-time {
  font-size: 0.9rem;
  color: #41b883;
  font-style: italic;
}

/* Blog summary */
.blog-summary {
  margin-bottom: 2rem;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  font-weight: 500;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-left: 4px solid #41b883;
  border-radius: 0 4px 4px 0;
}

/* Blog content */
.blog-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

.blog-content p {
  margin-bottom: 1.5rem;
}

/* Blog footer */
.blog-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background-color: #f0f8f4;
  color: #41b883;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.social-share {
  margin: 1rem 0;
}

.share-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f0f8f4;
  color: #41b883;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.share-button:hover {
  background-color: #e0f0e9;
}

.share-icon {
  margin-right: 0.5rem;
}

.back-link {
  color: #41b883;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  transition: color 0.3s;
}

.back-link:hover {
  color: #349268;
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 768px) {
  .blog-container {
    padding: 1.5rem;
  }

  .blog-header h1 {
    font-size: 1.8rem;
  }

  .blog-meta {
    flex-direction: column;
    align-items: flex-start;
  }

  .publication-info {
    margin-top: 1rem;
    align-items: flex-start;
  }

  .blog-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .social-share {
    margin: 1rem 0;
  }

  .featured-image-container {
    height: 250px;
  }
}
</style>
