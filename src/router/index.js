import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Calculator from '@/components/calculator/index'
import Result from '@/components/Result'

import Faq from '@/components/faq/Index'
import FaqList from '@/components/faq/List'
import FaqShow from '@/components/faq/Show'

import Feedback from '@/components/Feedback'
import AboutUs from '@/components/AboutUs'

import Page404 from '@/components/Page404'

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
      path: '/result/:mode',
      component: Result,
      name: 'result'
    },
    {
      path: '/faq',
      component: Faq,
      children: [
        {
          path: '',
          component: FaqList,
          name: 'faq.list'
        },
        {
          path: ':slug',
          component: FaqShow,
          name: 'faq.show'
        }
      ]
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
    },
    {
      path: '*',
      component: Page404
    }
  ]
})
