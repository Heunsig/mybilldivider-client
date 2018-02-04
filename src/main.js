// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import Format from './plugins/format'
import GetPosition from './plugins/get-position'
import VueClipboard from 'vue-clipboard2'
import Accounting from './plugins/accounting'
import VueAnalytics from 'vue-analytics'
import VueResource from 'vue-resource'

// index.js or main.js
import 'vuetify/dist/vuetify.min.css'
// import 'swiper/dist/css/swiper.css'

import eventBus from './event-bus'

Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.use(VueClipboard)
Vue.use(Format)
Vue.use(GetPosition)
Vue.use(Accounting)
Vue.use(VueResource)

Vue.use(VueAnalytics, {
  id: ['UA-113181415-1', 'UA-112759985-1'],
  router
})

Vue.prototype.$PATH_API = 'https://api.mybilldivider.com/api/'

Vue.prototype.$resetData = ($this, changingData, originalData) => {
  if (typeof originalData === 'undefined') { originalData = changingData }

  Object.assign($this.$data[changingData], $this.$options.data()[originalData])
}

// Formatting number - old
// Vue.prototype.$formatNumber = (num) => {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
// }

// Vue.prototype.$saveWindowPosition = () => {
//   let supportPageOffset = window.pageXOffset !== undefined
//   let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

//   let scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop

//   return scrollTop
// }

// Vue.prototype.$fixToModalBugOnIphone = (bodyEle, bool, scrolledPosition) => {
//   // console.log('1', scrolledPosition)
//   if (bool === true) {
//     bodyEle.className += 'modal-open'
//     // window.scrollTo(0, scrolledPosition)
//   } else {
//     var reg = new RegExp('(\\s|^)' + 'modal-open' + '(\\s|$)')
//     bodyEle.className = bodyEle.className.replace(reg, ' ')
//     window.scrollTo(0, scrolledPosition)
//   }
// }

router.afterEach((currentRoute) => {
  eventBus.currentRoute = currentRoute
})

Vue.prototype.$window = window

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
