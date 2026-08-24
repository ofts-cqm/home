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
      component: () => import('../views/ProjectsView.vue'),
    },
  ],
})

export default router
