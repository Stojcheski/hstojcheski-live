<template>
  <div class="blog-editor">
    <div class="container">
      <h1>{{ isEditMode ? 'Edit Blog Post' : 'Create New Blog Post' }}</h1>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="editor-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            v-model="post.title"
            class="form-control"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div class="form-group">
          <label for="summary">Summary</label>
          <textarea
            id="summary"
            v-model="post.summary"
            class="form-control"
            rows="3"
            placeholder="Enter a brief summary"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            id="content"
            v-model="post.content"
            class="form-control"
            rows="15"
            placeholder="Write your blog post content here..."
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="slug">Slug</label>
          <input
            type="text"
            id="slug"
            v-model="post.slug"
            class="form-control"
            placeholder="blog-post-url-slug"
            required
          />
          <small class="form-text"
            >This will be used in the URL: hstojcheski.live/blog/your-slug-here</small
          >
        </div>

        <div class="form-group">
          <label for="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            v-model="tagsInput"
            class="form-control"
            placeholder="salesforce, apex, development, etc."
          />
        </div>

        <div class="form-group">
          <label for="image">Featured Image URL</label>
          <input
            type="text"
            id="image"
            v-model="post.image"
            class="form-control"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="form-actions">
          <button @click="savePost" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post' }}
          </button>
          <button @click="cancel" class="btn btn-secondary" :disabled="isSubmitting">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const API_URL = 'http://localhost:5000'

// State
const post = ref({
  title: '',
  summary: '',
  content: '',
  slug: '',
  tags: [] as string[],
  image: '',
  isPublished: false,
})
const tagsInput = ref('')
const error = ref('')
const isSubmitting = ref(false)
const isEditMode = computed(() => !!route.params.id)

// Get post if in edit mode
onMounted(async () => {
  if (isEditMode.value) {
    try {
      const postId = route.params.id
      const response = await axios.get(`${API_URL}/blogs/${postId}`)
      const loadedPost = response.data

      post.value = {
        title: loadedPost.title || '',
        summary: loadedPost.summary || '',
        content: loadedPost.content || '',
        slug: loadedPost.slug || '',
        tags: loadedPost.tags || [],
        image: loadedPost.blogImage || '',
        isPublished: loadedPost.isPublished || false,
      }

      // Convert tags array to string for the input
      tagsInput.value = post.value.tags.join(', ')
    } catch (err) {
      console.error('Error loading post:', err)
      error.value = 'Failed to load the blog post. Please try again later.'
    }
  }
})

// Helper to create slug from title
const createSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
}

// Auto-generate slug when title changes if slug is empty
const updateSlugFromTitle = () => {
  if (!post.value.slug && post.value.title) {
    post.value.slug = createSlugFromTitle(post.value.title)
  }
}

// Save post
const savePost = async () => {
  // Process tags from comma-separated string to array
  post.value.tags = tagsInput.value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '')

  // Auto-generate slug if empty
  if (!post.value.slug) {
    post.value.slug = createSlugFromTitle(post.value.title)
  }

  // Validate required fields
  if (!post.value.title || !post.value.content || !post.value.summary || !post.value.slug) {
    error.value = 'Please fill in all required fields: title, summary, content, and slug.'
    return
  }

  try {
    isSubmitting.value = true

    if (isEditMode.value) {
      // Update existing post
      await axios.put(`${API_URL}/blogs/${route.params.id}`, post.value)
    } else {
      // Create new post
      await axios.post(`${API_URL}/blogs`, post.value)
    }

    router.push('/admin/blog')
  } catch (err) {
    console.error('Error saving post:', err)
    error.value = `Failed to ${isEditMode.value ? 'update' : 'create'} the blog post. Please try again later.`
  } finally {
    isSubmitting.value = false
  }
}

// Cancel and go back
const cancel = () => {
  router.push('/admin/blog')
}

// Watch for title changes to update slug
const handleTitleChange = () => {
  if (!post.value.slug || post.value.slug === createSlugFromTitle(post.value.title)) {
    post.value.slug = createSlugFromTitle(post.value.title)
  }
}
</script>

<style scoped>
.blog-editor {
  padding: 2rem 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 2rem;
  color: #333;
}

.editor-form {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #41b883;
  box-shadow: 0 0 0 2px rgba(65, 184, 131, 0.2);
}

textarea.form-control {
  resize: vertical;
}

.form-text {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #6c757d;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background-color: #41b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #349268;
}

.btn-secondary {
  background-color: #f2f2f2;
  color: #333;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}
</style>
