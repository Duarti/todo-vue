import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/components/Inicio'
import Login from '@/components/Login'
import PaginaNaoEncontrada from '@/components/PaginaNaoEncontrada'

Vue.use(Router)

const Route = new Router({
  mode: 'history',
  base: '/todo/frontend/todo-vue',
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: Inicio,
      meta: {auth: true},
      children: [
        {
          path: '/inicio',
          component: Inicio,
          meta: {auth: true}
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {auth: false}
    },
    {
      path: '*',
      name: 'pagina-nao-encontrada',
      component: PaginaNaoEncontrada,
      meta: {auth: false}
    }
  ]
})

export default Route
