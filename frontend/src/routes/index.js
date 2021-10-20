import Vue from 'vue'
import Router from 'vue-router'
import UserList from '@/components/UserList'
import VueGraph from '@/components/VueGraph'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import MainMenu from '@/components/MainMenu'


Vue.use(Router)
export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login', 
      component: Login
      //Login Page
    },
    {
      path: '/',
      name: 'SignUp',
      component: SignUp
      //SignUp Page
    },
    {
      path: '/vuegraph',
      name: 'VueGraph',
      component: VueGraph
      //VueGraph Page connected to Mobius, imports Mqtt.vue
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList
      //Displays list of users
    },
    {
      path: '/mainmenu',
      name: 'MainMenu',
      component: MainMenu
      //Main menu, can choose to navigate to UserList or VueGraph
    }
  ]
})