import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import BasicLayout from '@/layouts/BasicLayout.vue'
// import MobileLayout from '@/layouts/MobileLayout.vue'
import SimpleLayout from '@/layouts/simpleLayout.vue'

// 判断是否为移动设备
// const isMobile = window.innerWidth <= 768

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // component: isMobile ? MobileLayout : BasicLayout,
    component: SimpleLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'mine',
        name: 'Mine',
        component: () => import('@/views/mine/index.vue'),
        meta: { title: '我的' }
      }
    ]
  },
  {
    path: '/error',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router 