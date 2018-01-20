import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Calculator from '@/components/calculator'
import AboutMe from '@/components/AboutMe'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/calculator',
      component: Calculator,
      name: 'calculator'
    },
    {
      path: '/aboutMe',
      component: AboutMe,
      name: 'aboutMe'
    }
  ]
})  
