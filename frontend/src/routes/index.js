import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/UserList'
import VueGraph from '@/components/VueGraph'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'


Vue.use(Router)
export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/graph',
      name: 'VueGraph',
      component: VueGraph
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList
    }
  ]
})