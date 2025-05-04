// src/stores/BlogStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

interface BlogPost {
  id: string
  slug: string
  post: string
  title: string
  content: string
  summary: string
  createdAt: string
  tags: string[]
}

interface FormattedPost {
  id: string
  slug: string
  title: string
  date: string
  summary: string
  content?: string
  tags?: string[]
}

interface BlogState {
  posts: BlogPost[]
  currentPost: BlogPost | null
  loading: boolean
  error: string | null
}

export const useBlogStore = defineStore('blog', {
  state: (): BlogState => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blog`)
        this.posts = response.data
        this.error = null
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        this.error = 'Failed to load blog posts'
      } finally {
        this.loading = false
      }
    },

    async fetchPostBySlug(slug: string) {
      this.loading = true
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/slug/${slug}`)
        this.currentPost = response.data
        this.error = null
        return this.currentPost
      } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error)
        this.error = 'Failed to load blog post'
        this.currentPost = null
        throw error
      } finally {
        this.loading = false
      }
    },
  },

  getters: {
    getAllPosts: (state): FormattedPost[] => {
      return state.posts.map((post: BlogPost) => {
        return {
          id: post.id,
          slug: post.slug,
          title: post.title || 'Untitled',
          date: new Date(post.createdAt).toLocaleDateString(),
          summary: post.summary || 'No summary available',
          tags: post.tags,
        }
      })
    },

    getPostBySlug:
      (state) =>
      (slug: string): FormattedPost | null => {
        const post =
          state.posts.find((p) => p.slug === slug) ||
          (state.currentPost && state.currentPost.slug === slug ? state.currentPost : null)

        if (!post) return null

        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          date: new Date(post.createdAt).toLocaleDateString(),
          summary: post.summary,
          content: post.content,
          tags: post.tags,
        }
      },

    getPostById:
      (state) =>
      (id: string): FormattedPost | null => {
        const post =
          state.posts.find((p) => p.id === id) ||
          (state.currentPost && state.currentPost.id === id ? state.currentPost : null)

        if (!post) return null

        return {
          id: post.id,
          slug: post.slug,
          title: post.title || 'Untitled',
          date: new Date(post.createdAt).toLocaleDateString(),
          summary: post.summary || 'No summary available',
          content: post.content,
          tags: post.tags,
        }
      },
  },
})
