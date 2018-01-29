const tutorial = {
  namespaced: true,
  state: {
    salesTax: 9.5,
    people: [
      {
        name: 'David',
        tip: 25,
        menu: [
          {
            name: 'Double Cheese Burger',
            price: 12.00,
            taxable: true
          },
          {
            name: 'French Fries',
            price: 4.50,
            taxable: true
          }
        ]
      },
      {
        name: 'Michael',
        tip: 20,
        menu: [
          {
            name: 'Cheese Burger',
            price: 9.00,
            taxable: true
          },
          {
            name: 'Soda',
            price: 2.50,
            taxable: true
          }
        ]
      },
      {
        name: 'Mary',
        tip: 18,
        menu: [
          {
            name: 'Hot Dog',
            price: 10.00,
            taxable: true
          },
          {
            name: 'Soda',
            price: 2.50,
            taxable: true
          }
        ]
      },
      {
        name: 'Rose',
        tip: 20,
        menu: [
          {
            name: 'Sandwich',
            price: 8.00,
            taxable: true
          },
          {
            name: 'coffee',
            price: 3.00,
            taxable: true
          }
        ]
      }
    ],
    menu: [
      {
        name: 'Pepperoni Pizza',
        price: 16.00,
        taxable: true,
        people: [
          'David',
          'Mary',
          'Michael',
          'Rose'
        ]
      },
      {
        name: 'Salmon Salad',
        price: 6.99,
        taxable: true,
        people: [
          'David',
          'Michael'
        ]
      }
    ]
  },
  getters: {
    getSalesTax (state) {
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
    deletePersonFromPeople (state, payload) {
      state.people.forEach((obj, i) => {
        if (obj === payload.person) {
          state.people.splice(i, 1)
        }
      })

      // Delete person in Menu.people's array
      // WARNNING: It might make the app slow
      state.menu.forEach(obj => {
        obj.people.forEach((name, i) => {
          if (name === payload.person.name) {
            obj.people.splice(i, 1)
          }
        })
      })
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
    }
  }
}

export default tutorial
