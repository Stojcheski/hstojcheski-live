// src/stores/BlogStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

interface ContentChild {
  type: string
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

interface ContentBlock {
  type: string
  children: ContentChild[] | ListItem[]
  level?: number
  format?: string
}

// Define proper types for list items
interface ListItem {
  type: string
  children: ParagraphChild[]
}

interface ParagraphChild {
  type: string
  children: ContentChild[]
}

interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

interface ImageFormats {
  thumbnail?: ImageFormat
  small?: ImageFormat
  medium?: ImageFormat
  large?: ImageFormat
  [key: string]: ImageFormat | undefined
}

// FeaturedImage as stored in our state
interface FeaturedImage {
  id: number
  documentId?: string
  name?: string
  alternativeText?: string | null
  caption?: string | null
  width?: number
  height?: number
  formats?: ImageFormats
  hash?: string
  ext?: string
  mime?: string
  size?: number
  url: string
  previewUrl?: string | null
  provider?: string
  provider_metadata?: Record<string, unknown> | null
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

// Blog post model in our state
interface BlogPost {
  id: number
  documentId?: string
  Title: string
  Content: ContentBlock[]
  Summary: string
  PublishDate: string
  Slug: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  FeaturedImage?: FeaturedImage
}

interface FormattedPost {
  id: number
  title: string
  date: string
  summary: string
  content?: string
  slug?: string
  image?: string | null
}

interface BlogState {
  posts: BlogPost[]
  currentPost: BlogPost | null
  loading: boolean
  error: string | null
}

const API_URL = 'http://localhost:1337/api'

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
        console.log('Fetching posts from:', `${API_URL}/blog-posts?populate=*`)
        const response = await axios.get(`${API_URL}/blog-posts?populate=*`)
        console.log('API response data:', response.data)

        if (response.data && response.data.data) {
          const responseData = response.data.data

          if (Array.isArray(responseData)) {
            // Based on console logs, we know the data is already flattened
            // Just directly use the response data
            this.posts = responseData
            console.log('All processed posts:', this.posts)
          } else if (typeof responseData === 'object' && responseData !== null) {
            // Handle single post response
            this.posts = [responseData]
          } else {
            console.error('Unexpected response data structure:', responseData)
            this.posts = []
          }
        } else {
          console.error('Unexpected API response structure:', response.data)
          this.posts = []
        }
        this.error = null
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        this.error = 'Failed to load blog posts'
        this.posts = []
      } finally {
        this.loading = false
      }
    },

    async fetchPostById(id: string | number) {
      this.loading = true
      try {
        const response = await axios.get(`${API_URL}/blog-posts/${id}?populate=*`)
        console.log('Post detail response:', response.data)

        if (response.data && response.data.data) {
          // Transform the data to match our expected structure
          const postData = response.data.data
          if ('id' in postData) {
            // The data is already flattened as seen in logs
            this.currentPost = postData
            console.log('Processed post by ID:', this.currentPost)
          } else {
            this.currentPost = null
          }
        } else {
          this.currentPost = null
        }

        this.error = null
        return this.currentPost
      } catch (error) {
        console.error(`Error fetching blog post with id ${id}:`, error)
        this.error = 'Failed to load blog post'
        this.currentPost = null
        return null
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
          title: post.Title || 'Untitled',
          date: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString()
            : new Date().toLocaleDateString(),
          summary: post.Summary || 'No summary available',
          slug: post.Slug || '',
          image: post.FeaturedImage?.url || null,
        }
      })
    },

    getPostById:
      (state) =>
      (id: string | number): FormattedPost | null => {
        // Find post by id
        const post =
          state.posts.find((p: BlogPost) => p.id === Number(id)) ||
          (state.currentPost && state.currentPost.id === Number(id) ? state.currentPost : null)

        if (!post) return null

        // Process content to create HTML
        let content = ''
        if (post.Content && Array.isArray(post.Content)) {
          content = post.Content.map((block: ContentBlock) => {
            if (block.type === 'paragraph') {
              return `<p>${(block.children as ContentChild[])
                ?.map((child: ContentChild) => {
                  let textContent = child.text || ''
                  if (child.bold) textContent = `<strong>${textContent}</strong>`
                  if (child.italic) textContent = `<em>${textContent}</em>`
                  if (child.underline) textContent = `<u>${textContent}</u>`
                  return textContent
                })
                .join('')}</p>`
            }

            if (block.type === 'heading') {
              const level = block.level || 2
              return `<h${level}>${(block.children as ContentChild[])?.map((child: ContentChild) => child.text || '').join('')}</h${level}>`
            }

            if (block.type === 'list') {
              const listType = block.format === 'ordered' ? 'ol' : 'ul'

              // Try to recursively process list items
              const processListChildren = (children: ListItem[]): string => {
                return children
                  .map((child) => {
                    if (child.type === 'list-item') {
                      let itemContent = ''
                      if (child.children && child.children.length) {
                        // Process the children of the list item
                        itemContent = child.children
                          .map((itemChild: ParagraphChild) => {
                            if (itemChild.type === 'paragraph' && itemChild.children) {
                              return itemChild.children
                                .map((c: ContentChild) => c.text || '')
                                .join('')
                            }
                            return ''
                          })
                          .join('')
                      }
                      return `<li>${itemContent}</li>`
                    }
                    return ''
                  })
                  .join('')
              }

              if (block.children && block.children.length) {
                return `<${listType}>${processListChildren(block.children as ListItem[])}</${listType}>`
              }

              return `<${listType}></${listType}>`
            }

            return '' // Return empty string for unhandled block types
          }).join('')
        }

        return {
          id: post.id,
          title: post.Title || 'Untitled',
          date: post.PublishDate
            ? new Date(post.PublishDate).toLocaleDateString()
            : post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : new Date().toLocaleDateString(),
          summary: post.Summary || 'No summary available',
          content: content,
          slug: post.Slug || '',
          image: post.FeaturedImage?.url || null,
        }
      },
  },
})
