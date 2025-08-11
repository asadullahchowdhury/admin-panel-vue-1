import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/Login.vue'
import DashboardPage from '../views/Dashboard.vue'
import UsersPage from '../views/Users.vue'
import CategoriesPage from '../views/Categories.vue'
import ProfilePage from '../views/Profile.vue'
import AppLayout from '../components/Layout.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
            {
            path: '/login',
            name: 'Login',
            component: LoginPage,
            meta: { requiresAuth: false }
          },
          {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
              {
                path: 'dashboard',
                name: 'Dashboard',
                component: DashboardPage
              },
              {
                path: 'users',
                name: 'Users',
                component: UsersPage
              },
              {
                path: 'categories',
                name: 'Categories',
                component: CategoriesPage
              },
              {
                path: 'profile',
                name: 'Profile',
                component: ProfilePage
              }
            ]
          }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
