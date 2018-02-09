import Vue from 'vue'
import Vuex from 'vuex'

import base from './modules/base'
import calculator from './modules/calculator'
import tutorial from './modules/tutorial'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base,
    calculator,
    tutorial
  }
})
