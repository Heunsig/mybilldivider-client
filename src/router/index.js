import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Example from '@/components/example'
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
      path: '/example',
      component: Example,
      name: 'example'
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
