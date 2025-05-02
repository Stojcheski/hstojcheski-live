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
        console.log('Fetched blogs:', response.data)
        this.blogs = response.data
      } catch (error: any) {
        this.isError = true
        this.errorMessage = error.response?.data?.message || error.message || 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async deleteBlog(id: string) {
      try {
        await axios.delete(`/api/blogs/${id}`)
        this.blogs = this.blogs.filter((b) => b._id !== id)
      } catch (error: any) {
        throw new Error(error.message || 'Failed to delete blog')
      }
    },
  },
})
