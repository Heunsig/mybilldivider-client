import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Calculator from '@/components/calculator'
import Feedback from '@/components/Feedback'
import AboutUs from '@/components/AboutUs'

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
      component: Calculator,
      name: 'tutorial'
    },
    {
      path: '/calculator/:page',
      component: Calculator,
      name: 'calculator'
    },
    {
      path: '/feedback',
      component: Feedback,
      name: 'feedback'
    },
    {
      path: '/aboutUs',
      component: AboutUs,
      name: 'aboutUs'
    }
  ]
})
