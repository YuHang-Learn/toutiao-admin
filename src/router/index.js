import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from 'views/Login/'
import Layout from 'layout/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    // 如果有默认子路由，则不能给该路由起名
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('views/home/')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('views/article/')
      },
      {
        path: '/image',
        name: 'image',
        component: () => import('views/image/')
      },
      {
        path: '/publish',
        name: 'publish',
        component: () => import('views/publish/')
      },
      {
        path: '/comment',
        name: 'comment',
        component: () => import('views/comment/')
      },
      {
        path: '/fans',
        name: 'fans',
        component: () => import('views/fans/index'),
        children: [
          {
            path: 'list',
            component: () => import('views/fans/list')
          },
          {
            path: 'show',
            component: () => import('views/fans/show')
          }
        ]
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('views/settings/')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const user = window.localStorage.getItem('user')
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
