import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  },

  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
  },
  
  {
    path: '/receipt',
    name: 'Receipt',
    component: () => import(/* webpackChunkName: "receipt" */ '../views/Receipt.vue')
  }
]

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: "history",
})

export default router
