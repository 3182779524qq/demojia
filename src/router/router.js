import Vue from 'vue'
import Home from '../components/Home'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/demo',
      children: [{
        path: '/demo',
        name: 'demo',
        component: () => import( /* webpackChunkName: "login" */ '../views/demo/demo.vue')
      },{
        path: '/demoForm',
        name: 'demoForm',
        component: () => import( /* webpackChunkName: "demoForm" */ '../views/demoForm/demoForm.vue')
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ '../views/login.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import( /* webpackChunkName: "404" */ '../views/404.vue')
    },
    {
      path: '/403',
      name: '403',
      component: () => import( /* webpackChunkName: "403" */ '../views/403.vue')
    }
  ]
})
