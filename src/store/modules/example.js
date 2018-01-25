const example = {
  namespaced: true,
  state: {
    salesTax: 9.5,
    people: [
      {
        name: 'David',
        tip: 15,
        menu: [
          {
            name: 'Double Cheese Burger',
            price: 12.00
          },
          {
            name: 'French Fries',
            price: 4.50
          },
          {
            name: 'Soda',
            price: 2.50
          }
        ]
      },
      {
        name: 'Mary',
        tip: 18,
        menu: [
          {
            name: 'Cheese Burger',
            price: 10.00
          },
          {
            name: 'French Fries',
            price: 4.50
          },
          {
            name: 'Soda',
            price: 2.50
          }
        ]
      },
      {
        name: 'Michael',
        tip: 20,
        menu: [
          {
            name: 'Hot Dog',
            price: 9.00
          },
          {
            name: 'Soda',
            price: 2.50
          }
        ]
      },
      {
        name: 'Rose',
        tip: 25,
        menu: [
          {
            name: 'Sandwich',
            price: 8.00
          },
          {
            name: 'Soda',
            price: 2.50
          }
        ]
      }
    ],
    menu: [
      {
        name: 'Pepperoni Pizza',
        price: 16.00,
        people: [
          'David',
          'Mary',
          'Michael',
          'Rose'
        ]
      },
      {
        name: 'Salad',
        price: 6.99,
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
  }
}

export default example
