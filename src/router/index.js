import { createRouter, createWebHashHistory } from 'vue-router'
import Games from '../views/Games.vue'

const routes = [
  {
    path: '/',
    name: 'Games',
    component: Games
    /* component: () => import( */ /* webpackChunkName: "about" */ /* '../views/Games.vue') */
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
