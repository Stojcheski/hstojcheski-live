// File location: src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

// Public Views
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ExperienceView from '@/views/ExperienceView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import ContactView from '@/views/ContactView.vue'

// Admin Views
import AdminLoginView from '@/views/admin/AdminLoginView.vue'
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import AdminBlogView from '@/views/admin/AdminBlogView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/experience', name: 'Experience', component: ExperienceView },
  { path: '/skills', name: 'Skills', component: SkillsView },
  { path: '/projects', name: 'Projects', component: ProjectsView },
  { path: '/blog', name: 'Blog', component: BlogView },
  { path: '/blog/:slug', name: 'BlogPost', component: BlogPostView, props: true },
  { path: '/contact', name: 'Contact', component: ContactView },

  // Admin
  { path: '/admin', name: 'AdminLogin', component: AdminLoginView },
  { path: '/admin/dashboard', name: 'AdminDashboard', component: AdminDashboardView },
  { path: '/admin/blog', name: 'AdminBlog', component: AdminBlogView },
  {
    path: '/admin/blog/editor',
    name: 'BlogEditorCreate',
    component: () => import('@/views/admin/BlogEditor.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/blog/edit/:id',
    name: 'BlogEditorEdit',
    component: () => import('@/views/admin/BlogEditor.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/blog/list',
    name: 'AdminBlogList',
    component: () => import('@/views/admin/AdminBlogList.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
