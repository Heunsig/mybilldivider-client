import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import AboutMe from '@/components/AboutMe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/aboutMe',
      component: AboutMe,
      name: 'aboutMe'
    }
  ]
})
