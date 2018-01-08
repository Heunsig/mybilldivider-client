// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueOnsen from 'vue-onsenui' // This already imports 'onsenui'
// import Vuetify from 'vuetify'

// Webpack CSS import
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

// index.js or main.js
// import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(VueOnsen)
// Vue.use(Vuetify)
// Vue.use(Framework7)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
