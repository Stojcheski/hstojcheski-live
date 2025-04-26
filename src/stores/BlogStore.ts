// src/stores/BlogStore.ts
import { defineStore } from 'pinia'

interface BlogPost {
  id: number
  title: string
  date: string
  summary: string
  content: string
}

interface BlogState {
  posts: BlogPost[]
}

export const useBlogStore = defineStore('blog', {
  state: (): BlogState => ({
    posts: [
      {
        id: 1,
        title: 'Getting Started with Salesforce Omnistudio',
        date: 'April 15, 2025',
        summary:
          'Learn how to leverage Salesforce Omnistudio components to build powerful, responsive interfaces for your enterprise applications.',
        content: `
          <p>Salesforce Omnistudio (formerly Vlocity) provides a suite of declarative tools that enable developers and admins to build complex, industry-specific applications with minimal coding.</p>

          <h2>Key Components of Omnistudio</h2>

          <h3>OmniScripts</h3>
          <p>OmniScripts allow you to create guided, interactive forms and workflows for users. They're responsive, work across all devices, and can be embedded anywhere in Salesforce.</p>

          <h3>DataRaptors</h3>
          <p>DataRaptors are data integration tools that let you extract, transform, and load data within Salesforce. They're essential for creating the data layer for your Omnistudio applications.</p>

          <!-- Rest of content... -->
        `,
      },
      // Other blog posts...
    ],
  }),

  getters: {
    getPostById: (state) => (id: number | string) => {
      return state.posts.find((post) => post.id === Number(id))
    },

    getAllPosts: (state) => {
      return state.posts.map((post) => ({
        id: post.id,
        title: post.title,
        date: post.date,
        summary: post.summary,
      }))
    },
  },
})
