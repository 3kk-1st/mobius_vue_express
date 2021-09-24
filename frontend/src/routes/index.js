import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/MovieIndexPage'
//import Show from '@/components/MovieShowPage'
//import List from '@/components/userList'
import Graph from '@/components/VueGraph'

Vue.use(Router)
export const router = new Router({
 mode: 'history',
 routes: [
   /*{
     path: '/',
     name: 'index',
     component: Index
   },
   {
     path: '/:id',
     name: 'show',
     component: Show
   },
   {
    path: '/',
    name: 'list',
    component: List
  }*/
  {
      path: '/',
      name: 'graph',
      component: Graph
  }
 ]
})