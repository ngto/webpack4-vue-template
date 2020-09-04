import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(  /* webpackChunkName: "index" */ 'views/index/index.vue'),
  },
  {
    path: '/about',
    component: () => import(  /* webpackChunkName: "about" */ 'views/about/index.vue'),
  }
]
const router = new VueRouter({ routes })

export default router
