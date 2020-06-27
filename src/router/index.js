import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/list',
      name: 'task-list',
      component: () => import(/* webpackChunkName: "about" */ '../views/task-list.vue')
    },
    {
      path: '/details',
      name: 'task-details',
      component: () => import(/* webpackChunkName: "about" */ '../views/task-details.vue')
    },
  ]
})

export default router
