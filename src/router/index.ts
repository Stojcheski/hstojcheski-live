// src/router/index.ts (with auth guards)
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import { useAuthStore } from '../stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('../views/ExperienceView.vue'),
    },
    {
      path: '/skills',
      name: 'skills',
      component: () => import('../views/SkillsView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/BlogView.vue'),
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: () => import('../views/BlogPostView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    // New admin routes (protected)
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminDashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UserManagement.vue'),
        },
        {
          path: 'blogs',
          name: 'admin-blogs',
          component: () => import('../views/admin/BlogManagement.vue'),
        },
      ],
    },
    // Author dashboard (protected)
    {
      path: '/author',
      name: 'author-dashboard',
      component: () => import('../views/author/AuthorDashboard.vue'),
      meta: { requiresAuth: true, requiresAuthor: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Check if auth state is already loaded
  if (!authStore.loading && !authStore.user) {
    // Try to load user info (silently)
    await authStore.checkAuth()
  }

  // Admin route check
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    console.log('Attempted to access admin-only route')
    return next('/')
  }

  // Author route check
  if (to.meta.requiresAuthor && !authStore.isAuthor) {
    console.log('Attempted to access author-only route')
    return next('/')
  }

  // Regular auth check
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Attempted to access protected route')
    return next('/')
  }

  next()
})

export default router
