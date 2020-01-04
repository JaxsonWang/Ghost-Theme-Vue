import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

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
