import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    salesTaxRate: '',
    people: [],
    menu: []
  },
  getters: {
    getSalesTaxRate (state) {
      return state.salesTaxRate
    },
    getPeople (state) {
      return state.people
    },
    getMenu (state) {
      return state.menu
    }
  },
  mutations: {
    setSalesTaxRate (state, salesTaxRate) {
      state.salesTaxRate = salesTaxRate
    },
    addPerson (state, person) {
      state.people.push(person)
    },
    addMenu (state, menu) {
      state.menu.push(menu)
    },
    addPeopleToItem (state, addingItem) {
      state.menu.forEach(item => {
        if (item === addingItem) {
          item.people = addingItem.people
        }
      })
    }
  }
})
