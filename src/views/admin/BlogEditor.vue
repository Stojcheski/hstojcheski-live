<!-- File location: src/views/admin/BlogEditor.vue -->
<template>
  <section class="section container">
    <div class="form-header">
      <h1 class="editor-title">{{ isEditMode ? 'Edit Blog Post' : 'Create New Blog Post' }}</h1>
    </div>

    <form v-if="!isEditMode || loaded" @submit.prevent="submitBlog" class="blog-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" class="sm-input" type="text" v-model="form.title" required />
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
        <input id="tags" class="sm-input" type="text" v-model="form.tags" />
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
    </form>

    <div v-if="toast.visible" :class="['toast', toast.success ? 'toast-success' : 'toast-error']">
      {{ toast.message }}
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    const blogId = route.params.id as string | undefined
    const isEditMode = computed(() => !!blogId)
    const loaded = ref(false)

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

    const toast = ref({ visible: false, message: '', success: true })

    const showToast = (msg: string, success = true) => {
      toast.value = { visible: true, message: msg, success }
      setTimeout(() => (toast.value.visible = false), 3000)
    }

    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    }

    const fetchBlog = async () => {
      if (!blogId) return
      try {
        const apiBase = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''
        const { data } = await axios.get(`${apiBase}/api/blogs/${blogId}`)

        form.value = {
          title: data.title || '',
          summary: data.summary || '',
          content: data.content || '',
          tags: (data.tags || []).join(', '),
          isPublished: data.isPublished || false,
          isDraft: data.isDraft || false,
          isScheduled: data.isScheduled || false,
          scheduledAt: data.scheduledAt || '',
        }
        loaded.value = true
      } catch (error: any) {
        showToast('Failed to load blog. Error: ' + error, false)
      }
    }

    const submitBlog = async () => {
      try {
        const apiBase = import.meta.env.MODE === 'development' ? 'http://localhost:5000' : ''
        const payload = {
          ...form.value,
          tags: form.value.tags.split(',').map((t) => t.trim()),
          blogImage: 'placeholder.jpg',
          readTime: `${Math.max(1, Math.ceil(form.value.content.trim().split(/\s+/).length / 200))} min read`,
          author: import.meta.env.VITE_DEFAULT_AUTHOR_ID,
        }

        if (isEditMode.value) {
          await axios.put(`${apiBase}/api/blogs/${blogId}`, payload)
          showToast('Blog updated successfully!', true)
        } else {
          Object.assign(payload, { slug: generateSlug(form.value.title) })
          await axios.post(`${apiBase}/api/blogs`, payload)
          showToast('Blog saved successfully!', true)
        }

        setTimeout(() => router.push('/admin/blog/list'), 1500)
      } catch (error: any) {
        const msg = 'Something went wrong. Error: ' + error
        showToast(msg, false)
      }
    }

    onMounted(() => {
      if (isEditMode.value) fetchBlog()
    })

    return { form, submitBlog, toast, loaded, isEditMode }
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

.toast {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  z-index: 999;
}
.toast-success {
  background-color: #4caf50;
}
.toast-error {
  background-color: #f44336;
}

textarea {
  min-height: 120px;
}
</style>
