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
import States from './plugins/states'
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
Vue.use(States)

Vue.use(VueAnalytics, {
  // id: 'UA-112759985-1',  // for real
  id: 'UA-113181415-1', // for test site
  router
})

// Vue.prototype.$PATH_IMAGE = 'https://mybilldivider.com/images/'
// Vue.prototype.$PATH_API = 'https://api.mybilldivider.com/api/'
Vue.prototype.$PATH_IMAGE = 'http://mybilldivider.com/images/'
Vue.prototype.$PATH_API = 'http://api.mybilldivider.com/api/'
// Vue.prototype.$PATH_IMAGE = 'http://mybilldivider.test/images/'
// Vue.prototype.$PATH_API = 'http://api.mybilldivider.test/api/'

Vue.prototype.$resetData = ($this, changingData, originalData) => {
  if (typeof originalData === 'undefined') { originalData = changingData }

  Object.assign($this.$data[changingData], $this.$options.data()[originalData])
}

router.afterEach((currentRoute) => {
  eventBus.currentRoute = currentRoute
})

Vue.prototype.$window = window

/* eslint-disable no-new */
new Vue({
  created () {
    // let bgList = [
    //   'ics-home-background-01',
    //   'ics-home-background-02',
    //   'ics-home-background-03'
    // ]

    // this.$store.commit('base/setBackgroundMainCss', { css: bgList[Math.floor(Math.random() * 3)] })
  },
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
