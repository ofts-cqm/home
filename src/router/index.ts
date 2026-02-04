import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmptyView from '@/views/EmptyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: EmptyView,
    },
    {
      path: '/contact',
      name: 'contact',
      meta: { label: 'Contact.md'},
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/about-me',
      name: 'about-me',
      meta: { label: 'MoreAboutMe.md'},
      component: () => import('../views/MoreAboutMeView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { label: 'README.md' }
    },
    {
      path: '/projects',
      name: 'projects',
      meta: { label: 'Projects.md' },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProjectsView.vue'),
    },
  ],
})

export default router
