import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Tutorial from '@/components/tutorial'
import Calculator from '@/components/calculator'
import AboutMe from '@/components/AboutMe'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'main'
    },
    {
      path: '/tutorial/:page',
      component: Tutorial,
      name: 'tutorial'
    },
    {
      path: '/calculator/:page',
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
