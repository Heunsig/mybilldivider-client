// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import Format from './plugins/format'
import GetPosition from './plugins/get-position'

// index.js or main.js
import 'vuetify/dist/vuetify.min.css'

import eventBus from './event-bus'

Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.use(Format)
Vue.use(GetPosition)

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
