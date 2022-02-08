import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/users',
    name: 'Agendamentos',
    component: () => import('../components/Usuarios.vue')
  },
  {
    path: '/',
    name: 'LocalAgendamento',
    component: () => import('../components/CadastrarUsu.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
