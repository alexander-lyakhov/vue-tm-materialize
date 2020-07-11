import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/create',
      name: 'create',
      component: () => import(/* webpackChunkName: "about" */ '../views/create.vue')
    },
    {
      path: '/list',
      name: 'task-list',
      component: () => import(/* webpackChunkName: "about" */ '../views/task-list.vue')
    },
    {
      path: '/task/:id',
      name: 'task',
      component: () => import(/* webpackChunkName: "about" */ '../views/task-details.vue')
    },
    {
      path: '/',
      name: 'list',
      redirect: '/list'
    },
  ]
})

export default router
