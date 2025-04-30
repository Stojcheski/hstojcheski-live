<!-- File location: src/views/admin/BlogEditor.vue -->

<template>
  <section class="section container">
    <div class="form-header" style="text-align: center">
      <h1 class="editor-title">{{ isEditMode ? 'Edit Blog Post' : 'Create New Blog Post' }}</h1>
    </div>

    <form @submit.prevent="submitBlog" class="blog-form">
      <div class="button-container top-cancel">
        <router-link to="/admin" class="btn btn-secondary">Cancel</router-link>
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          class="sm-input"
          type="text"
          v-model="form.title"
          required
          style="width: 100%; max-width: 500px"
        />
      </div>

      <div class="form-group">
        <label for="summary">Summary</label>
        <textarea id="summary" v-model="form.summary" required></textarea>
      </div>

      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="content" v-model="form.content" required></textarea>
      </div>

      <div class="form-group">
        <label for="tags">Tags (comma-separated)</label>
        <input
          id="tags"
          class="sm-input"
          type="text"
          v-model="form.tags"
          style="width: 100%; max-width: 500px"
        />
      </div>

      <div class="checkbox-row grouped">
        <div class="form-checkbox">
          <input
            id="isPublished"
            type="checkbox"
            v-model="form.isPublished"
            :disabled="form.isDraft || form.isScheduled"
          />
          <label for="isPublished">Publish immediately</label>
        </div>

        <div class="form-checkbox">
          <input
            id="isDraft"
            type="checkbox"
            v-model="form.isDraft"
            :disabled="form.isPublished || form.isScheduled"
          />
          <label for="isDraft">Save as draft</label>
        </div>
      </div>

      <div class="form-group">
        <div class="form-checkbox">
          <input
            id="isScheduled"
            type="checkbox"
            v-model="form.isScheduled"
            :disabled="form.isPublished || form.isDraft"
          />
          <label for="isScheduled">Schedule post</label>
        </div>
      </div>

      <div v-if="form.isScheduled" class="form-group">
        <label for="scheduledAt">Scheduled Date & Time</label>
        <input
          id="scheduledAt"
          type="text"
          v-model="form.scheduledAt"
          placeholder="DD/MM/YYYY, HH:MM"
        />
      </div>

      <div class="button-container">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update Blog' : 'Save Blog' }}
        </button>
      </div>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  setup() {
    const route = useRoute()
    const form = ref({
      title: '',
      summary: '',
      content: '',
      tags: '',
      isPublished: false,
      isDraft: false,
      isScheduled: false,
      scheduledAt: '',
    })

    const successMessage = ref('')
    const errorMessage = ref('')
    const isEditMode = ref(false)

    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    }

    const calculateReadTime = (content: string) => {
      const wordCount = content.trim().split(/\s+/).length
      const minutes = Math.max(1, Math.ceil(wordCount / 200))
      return `${minutes} min read`
    }

    const submitBlog = async () => {
      successMessage.value = ''
      errorMessage.value = ''

      try {
        const apiBase = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''

        if (isEditMode.value) {
          await axios.put(`${apiBase}/api/blogs/${route.params.id}`, {
            ...form.value,
            slug: generateSlug(form.value.title),
            tags: form.value.tags.split(',').map((t) => t.trim()),
            readTime: calculateReadTime(form.value.content),
          })
          successMessage.value = 'Blog updated successfully!'
        } else {
          await axios.post(`${apiBase}/api/blogs`, {
            ...form.value,
            slug: generateSlug(form.value.title),
            tags: form.value.tags.split(',').map((t) => t.trim()),
            blogImage: 'placeholder.jpg',
            readTime: calculateReadTime(form.value.content),
            author: import.meta.env.VITE_DEFAULT_AUTHOR_ID,
          })
          successMessage.value = 'Blog saved successfully!'
          form.value = {
            title: '',
            summary: '',
            content: '',
            tags: '',
            isPublished: false,
            isDraft: false,
            isScheduled: false,
            scheduledAt: '',
          }
        }
      } catch (error: any) {
        errorMessage.value = error.response?.data?.message || 'Something went wrong.'
      }
    }

    const loadBlog = async () => {
      if (route.params.id) {
        isEditMode.value = true
        try {
          const apiBase = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''
          const { data } = await axios.get(`${apiBase}/api/blogs/${route.params.id}`)
          form.value = {
            title: data.title,
            summary: data.summary,
            content: data.content,
            tags: data.tags.join(', '),
            isPublished: data.isPublished,
            isDraft: data.isDraft,
            isScheduled: data.isScheduled,
            scheduledAt: data.scheduledAt || '',
          }
        } catch (error) {
          console.error('Failed to load blog for editing.', error)
        }
      }
    }

    onMounted(loadBlog)

    return { form, submitBlog, successMessage, errorMessage, isEditMode }
  },
})
</script>

<style scoped>
.editor-title {
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
}
.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.blog-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: var(--color-background-soft);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  max-width: 720px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.checkbox-row.grouped {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

input[type='text'],
textarea {
  resize: vertical;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.4;
}

.sm-input {
  height: 2.25rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.95rem;
  line-height: 1.2;
}

.small-width {
  max-width: 500px;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.form-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.success-message {
  color: green;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}
.top-cancel {
  justify-content: flex-start;
  margin-bottom: -1rem;
}

textarea {
  min-height: 120px;
}
</style>
