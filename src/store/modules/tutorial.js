import getters from '../getters/calculator'
import mutations from '../mutations/calculator'

const calculator = {
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
            name: 'Chili Hot Dog',
            price: 10.00,
            taxable: true
          },
          {
            name: 'Soda',
            price: 2.50,
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
          'Michael'
        ]
      }
    ]
  },
  getters: getters,
  mutations: mutations
}

export default calculator
