// File location: src/stores/BlogStore.ts

import { defineStore } from 'pinia'
import axios from 'axios'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [] as any[],
    isLoading: false,
    isError: false,
    errorMessage: '',
  }),

  actions: {
    async fetchBlogs() {
      this.isLoading = true
      this.isError = false
      this.errorMessage = ''

      try {
        const response = await axios.get('/api/blogs')
        this.blogs = response.data
      } catch (error: any) {
        this.isError = true
        this.errorMessage = error.response?.data?.message || error.message || 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },
  },
})
