import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    salesTax: '',
    people: [],
    menu: []
  },
  getters: {
    getSalesTaxRate (state) {
      return state.salesTax
    },
    getPeople (state) {
      return state.people
    },
    getMenu (state) {
      return state.menu
    }
  },
  mutations: {
    setSalesTaxRate (state, salesTax) {
      state.salesTax = salesTax
    },
    addPerson (state, person) {
      state.people.push(person)
    },
    addItemToMenu (state, item) {
      state.menu.push(item)
    },
    deleteItemFromMenu (state, item) {
      state.menu.forEach((obj, i) => {
        if (obj === item) {
          state.menu.splice(i, 1)
        }
      })
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
