import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    salesTax: 0,
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
      state.salesTax = parseFloat(salesTax || 0)
    },
    addPerson (state, payload) {
      state.people.push(payload.person)
    },
    addItemToPerson (state, payload) {
      payload.person.menu.push(payload.item)
    },
    addItemToMenu (state, payload) {
      state.menu.push(payload.item)
    },
    deleteItemFromMenu (state, payload) {
      state.menu.forEach((obj, i) => {
        if (obj === payload.item) {
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
    },
    deletePersonFromPeople (state, person) {
      state.people.forEach((obj, i) => {
        if (obj === person) {
          state.people.splice(i, 1)
        }
      })
    }
  }
})
