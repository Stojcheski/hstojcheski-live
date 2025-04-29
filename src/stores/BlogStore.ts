// src/stores/BlogStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:5000/api' // Use environment variable in production

interface BlogPost {
  _id: string
  title: string
  content: string
  summary: string
  publishedAt: string
  createdAt: string
  updatedAt: string
  tags: string[]
  slug: string
  readTime: string
  viewCount: number
  blogImage: string
  isPublished: boolean
  isDraft: boolean
  isScheduled: boolean
  scheduledAt: string | null
}

interface BlogState {
  posts: BlogPost[]
  currentPost: BlogPost | null
  adminPosts: BlogPost[]
  loading: boolean
  error: string | null
}

// Interface for Axios error response
interface ApiError {
  response?: {
    data?: {
      error?: string
    }
    status?: number
    statusText?: string
  }
  message?: string
}

export const useBlogStore = defineStore('blog', {
  state: (): BlogState => ({
    posts: [],
    currentPost: null,
    adminPosts: [],
    loading: false,
    error: null,
  }),

  actions: {
    // Fetch all published blog posts
    async fetchPosts() {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/blogs`)
        this.posts = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        this.error = 'Failed to load blog posts'
      } finally {
        this.loading = false
      }
    },

    // Fetch a single blog post by slug
    async fetchPostBySlug(slug: string) {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/blogs/slug/${slug}`)
        this.currentPost = response.data
        this.error = null
        return this.currentPost
      } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error)
        this.error = 'Failed to load blog post'
        this.currentPost = null
        return null
      } finally {
        this.loading = false
      }
    },

    // Admin functions - these will be protected in the UI

    // Fetch all blog posts for admin (including drafts)
    async fetchAdminPosts() {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/blogs/admin`)
        this.adminPosts = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching admin blog posts:', error)
        this.error = 'Failed to load blog posts'
      } finally {
        this.loading = false
      }
    },

    // Create a new blog post
    async createPost(postData: Partial<BlogPost>) {
      this.loading = true
      try {
        const response = await axios.post(`${API_URL}/blogs`, postData)
        // Add the new post to adminPosts if we have them loaded
        if (this.adminPosts.length) {
          this.adminPosts.unshift(response.data)
        }
        this.error = null
        return response.data
      } catch (error: unknown) {
        const apiError = error as ApiError
        console.error('Error creating blog post:', apiError)
        this.error = apiError.response?.data?.error || 'Failed to create blog post'
        return null
      } finally {
        this.loading = false
      }
    },

    // Update an existing blog post
    async updatePost(id: string, postData: Partial<BlogPost>) {
      this.loading = true
      try {
        const response = await axios.put(`${API_URL}/blogs/${id}`, postData)

        // Update the post in our stores if it exists
        const indexInAdminPosts = this.adminPosts.findIndex((p) => p._id === id)
        if (indexInAdminPosts !== -1) {
          this.adminPosts[indexInAdminPosts] = response.data
        }

        const indexInPosts = this.posts.findIndex((p) => p._id === id)
        if (indexInPosts !== -1) {
          this.posts[indexInPosts] = response.data
        }

        if (this.currentPost && this.currentPost._id === id) {
          this.currentPost = response.data
        }

        this.error = null
        return response.data
      } catch (error: unknown) {
        const apiError = error as ApiError
        console.error(`Error updating blog post with id ${id}:`, apiError)
        this.error = apiError.response?.data?.error || 'Failed to update blog post'
        return null
      } finally {
        this.loading = false
      }
    },

    // Delete a blog post
    async deletePost(id: string) {
      this.loading = true
      try {
        await axios.delete(`${API_URL}/blogs/${id}`)

        // Remove the post from our stores if it exists
        this.adminPosts = this.adminPosts.filter((p) => p._id !== id)
        this.posts = this.posts.filter((p) => p._id !== id)

        if (this.currentPost && this.currentPost._id === id) {
          this.currentPost = null
        }

        this.error = null
        return true
      } catch (error) {
        console.error(`Error deleting blog post with id ${id}:`, error)
        this.error = 'Failed to delete blog post'
        return false
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    // Get all published posts
    getPublishedPosts: (state) => {
      return state.posts
    },

    // Get a single post by slug
    getPostBySlug: (state) => (slug: string) => {
      return state.posts.find((post) => post.slug === slug) || null
    },

    // Get admin posts (including drafts)
    getAdminPosts: (state) => {
      return state.adminPosts
    },
  },
})
