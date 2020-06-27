import Vue from 'vue'
import VueRouter from 'vue-router'
import create from '../views/create.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      name: 'create',
      component: create
    },
    {
      path: '/list',
      name: 'task-list',
      component: () => import(/* webpackChunkName: "about" */ '../views/task-list.vue')
    },
    {
      path: '/task',
      name: 'task',
      component: () => import(/* webpackChunkName: "about" */ '../views/task-details.vue')
    },
  ]
})

export default router
