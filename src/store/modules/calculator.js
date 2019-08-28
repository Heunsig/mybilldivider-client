import getters from '../getters/calculator'
import mutations from '../mutations/calculator'

const calculator = {
  namespaced: true,
  state: {
    salesTax: 0,
    people: [],
    menu: [],
    orderForPeople: 0,
    orderForItem: 0
  },
  getters: getters,
  mutations: mutations
}

export default calculator
