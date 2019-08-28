export default {
  setSalesTax (state, salesTax) {
    state.salesTax = parseFloat(salesTax || 0)
  },
  addPerson (state, payload) {
    state.people = [...state.people, payload]
    state.orderForPeople++
  },
  addItemToPerson (state, payload) {
    payload.person.menu = [...payload.person.menu, payload.item]
    state.orderForItem++
    // payload.person.menu.push(payload.item)
  },
  addItemToMenu (state, payload) {
    state.menu = [...state.menu, payload]
    state.orderForItem++
  },
  deleteItemFromMenu (state, payload) {
    state.menu.forEach((obj, i) => {
      if (obj === payload) {
        state.menu.splice(i, 1)
        return false
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
  deletePersonFromPeople (state, payload) {
    state.people.forEach((obj, i) => {
      if (obj === payload) {
        state.people.splice(i, 1)
        return false
      }
    })

    // Delete person in Menu.people's array
    // WARNNING: It might make the app slow
    state.menu.forEach(obj => {
      obj.people.forEach((name, i) => {
        if (name === payload.name) {
          obj.people.splice(i, 1)
        }
      })
    })
  },
  clearPeople (state) {
    state.people = []

    // Delete people in Menu.people's array
    // WARNNING: It might make the app slow
    state.menu.forEach(obj => {
      obj.people = []
    })
  },
  clearMenu (state) {
    state.menu = []
  },
  refreshAll (state) {
    /*
     *  Refresh everything
     */
    state.people = []
    state.menu = []
    state.salesTax = 0
  }
}
