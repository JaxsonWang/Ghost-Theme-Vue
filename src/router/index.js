import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      name: 'Home',
      component: () => import('@/views/Home'),
      meta: {
        title: '首页'
      }
    }]
  },
  {
    path: '/:page_id/',
    component: Layout,
    children: [{
      path: '',
      name: 'Page',
      component: () => import('@/views/Page'),
      meta: {
        title: '详细页'
      }
    }]
  },
  {
    path: '/about/',
    component: Layout,
    children: [{
      path: '',
      name: 'About',
      component: () => import('@/views/About'),
      meta: {
        title: '关于我'
      }
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  base: process.env.BASE_URL,
  routes
})

export default router
