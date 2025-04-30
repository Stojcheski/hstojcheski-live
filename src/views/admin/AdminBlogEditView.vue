<template>
  <div class="admin-blog-edit">
    <div class="container">
      <div class="header">
        <h1>{{ isNewPost ? 'Create New Post' : 'Edit Post' }}</h1>
        <div class="header-actions">
          <router-link to="/admin/blog" class="btn btn-secondary"> Cancel </router-link>
        </div>
      </div>

      <div v-if="loading" class="loading">
        <p>Loading post data...</p>
      </div>

      <div v-else-if="error" class="error-message">
        <p>{{ error }}</p>
        <button v-if="!isNewPost" @click="fetchPost" class="btn btn-secondary">Try Again</button>
        <router-link to="/admin/blog" class="btn btn-primary"> Return to Blog List </router-link>
      </div>

      <form v-else @submit.prevent="savePost" class="blog-form">
        <div class="form-group">
          <label for="title">Title <span class="required">*</span></label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            required
            class="form-control"
            :class="{ error: validationErrors.title }"
          />
          <p v-if="validationErrors.title" class="error-text">{{ validationErrors.title }}</p>
        </div>

        <div class="form-group">
          <label for="summary">Summary <span class="required">*</span></label>
          <textarea
            id="summary"
            v-model="formData.summary"
            required
            rows="3"
            class="form-control"
            :class="{ error: validationErrors.summary }"
          ></textarea>
          <p v-if="validationErrors.summary" class="error-text">{{ validationErrors.summary }}</p>
          <p class="helper-text">Brief summary of your post (will be displayed in post listings)</p>
        </div>

        <div class="form-group">
          <label for="content">Content <span class="required">*</span></label>
          <textarea
            id="content"
            v-model="formData.content"
            required
            rows="15"
            class="form-control"
            :class="{ error: validationErrors.content }"
          ></textarea>
          <p v-if="validationErrors.content" class="error-text">{{ validationErrors.content }}</p>
          <p class="helper-text">Markdown formatting is supported</p>
        </div>

        <div class="form-group">
          <label for="tags">Tags</label>
          <input
            type="text"
            id="tags"
            v-model="tagsInput"
            class="form-control"
            placeholder="Enter tags separated by commas"
          />
          <p class="helper-text">Separate tags with commas (e.g. salesforce, development, tips)</p>

          <div v-if="formData.tags.length > 0" class="tags-list">
            <span v-for="(tag, index) in formData.tags" :key="index" class="tag">
              {{ tag }}
              <button type="button" class="remove-tag" @click="removeTag(index)">&times;</button>
            </span>
          </div>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="formData.isPublished" />
            <span>Publish this post</span>
          </label>
          <p class="helper-text">Uncheck to save as draft</p>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Saving...' : isNewPost ? 'Create Post' : 'Update Post' }}
          </button>
          <button type="button" class="btn btn-secondary" @click="previewPost" :disabled="saving">
            Preview
          </button>
        </div>
      </form>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="modal-overlay">
      <div class="preview-modal">
        <div class="preview-header">
          <h2>Post Preview</h2>
          <button @click="showPreview = false" class="btn-close">&times;</button>
        </div>
        <div class="preview-content">
          <h1 class="preview-title">{{ formData.title }}</h1>
          <div class="preview-meta">
            <span class="preview-date">{{ new Date().toLocaleDateString() }}</span>
            <span class="preview-status" :class="formData.isPublished ? 'published' : 'draft'">
              {{ formData.isPublished ? 'Published' : 'Draft' }}
            </span>
          </div>
          <div class="preview-summary"><strong>Summary:</strong> {{ formData.summary }}</div>
          <div class="preview-body">
            <!-- In a real implementation, you would render markdown here -->
            <p>{{ formData.content }}</p>
          </div>
          <div v-if="formData.tags.length > 0" class="preview-tags">
            <strong>Tags:</strong>
            <span v-for="(tag, index) in formData.tags" :key="index" class="preview-tag">
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="preview-footer">
          <button @click="showPreview = false" class="btn btn-secondary">Close Preview</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

interface BlogPost {
  _id?: string
  title: string
  content: string
  summary: string
  tags: string[]
  isPublished: boolean
  createdAt?: string
  updatedAt?: string
}

interface ValidationErrors {
  title?: string
  summary?: string
  content?: string
  tags?: string
}

const route = useRoute()
const router = useRouter()
const postId = computed(() => route.params.id as string)
const isNewPost = computed(() => postId.value === 'new' || !postId.value)

const loading = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)
const showPreview = ref(false)
const tagsInput = ref('')
const validationErrors = ref<ValidationErrors>({})

const formData = ref<BlogPost>({
  title: '',
  content: '',
  summary: '',
  tags: [],
  isPublished: false,
})

// Watch for changes in the tagsInput field
watch(tagsInput, (newValue) => {
  if (newValue.includes(',')) {
    const newTags = newValue
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '')

    // Add the new tags to the form data
    formData.value.tags = [...new Set([...formData.value.tags, ...newTags])]

    // Clear the input field
    tagsInput.value = ''
  }
})

const removeTag = (index: number): void => {
  formData.value.tags.splice(index, 1)
}

const validateForm = (): boolean => {
  const errors: ValidationErrors = {}

  if (!formData.value.title.trim()) {
    errors.title = 'Title is required'
  }

  if (!formData.value.summary.trim()) {
    errors.summary = 'Summary is required'
  } else if (formData.value.summary.length > 300) {
    errors.summary = 'Summary must be less than 300 characters'
  }

  if (!formData.value.content.trim()) {
    errors.content = 'Content is required'
  }

  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

const fetchPost = async (): Promise<void> => {
  if (isNewPost.value) return

  loading.value = true
  error.value = null

  try {
    // For local development
    const apiUrl = 'http://localhost:5000/api'
    const response = await axios.get(`${apiUrl}/blogs/${postId.value}`)

    formData.value = {
      title: response.data.title,
      content: response.data.content,
      summary: response.data.summary,
      tags: response.data.tags || [],
      isPublished: response.data.isPublished || false,
    }
  } catch (err) {
    console.error('Error fetching post:', err)
    error.value = 'Failed to load post data. Please try again.'
  } finally {
    loading.value = false
  }
}

const savePost = async (): Promise<void> => {
  if (!validateForm()) return

  saving.value = true
  error.value = null

  try {
    // For local development
    const apiUrl = 'http://localhost:5000/api'

    if (isNewPost.value) {
      // Create new post
      const response = await axios.post(`${apiUrl}/blogs`, formData.value)
      router.push(`/admin/blog/edit/${response.data._id}`)
    } else {
      // Update existing post
      await axios.put(`${apiUrl}/blogs/${postId.value}`, formData.value)
    }

    // Show success message or redirect
    router.push('/admin/blog')
  } catch (err) {
    console.error('Error saving post:', err)
    error.value = 'Failed to save post. Please try again.'
  } finally {
    saving.value = false
  }
}

const previewPost = (): void => {
  if (validateForm()) {
    showPreview.value = true
  }
}

onMounted(() => {
  if (!isNewPost.value) {
    fetchPost()
  }
})
</script>
