class CoreFunction {
  constructor (person, menu, salesTax) {
    this.person = person
    this.menu = menu
    this.salesTax = salesTax
    this.itemList = this.getItemList()
  }

  precisionRound (number, precision) {
    var factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
  }

  getItemList () {
    const person = this.person
    const menu = this.menu
    let list = []

    person.menu.forEach(item => {
      list.push({
        name: item.name,
        price: item.price,
        taxable: item.taxable
      })
    })

    menu.forEach(item => {
      item.people.forEach(name => {
        if (person.name === name) {
          list.push({
            name: item.name + ' ($' + item.price + '/' + item.people.length + ')',
            price: this.precisionRound((item.price / item.people.length), 2),
            taxable: item.taxable
          })
        }
      })
    })

    return list
  }

  getSubTotal () {
    const list = this.itemList
    let total = 0

    list.forEach(item => {
      total += item.price
    })

    return total
  }

  getSubTotalWithoutNonTaxable () {
    let total = 0

    this.itemList.forEach(item => {
      if (item.taxable) {
        total += item.price
      }
    })

    return total
  }

  getTipPayment () {
    return this.precisionRound((this.getSubTotal() * (this.person.tip / 100)), 2)
  }

  getSalesTaxPayment () {
    return this.precisionRound((this.getSubTotalWithoutNonTaxable() * (this.salesTax / 100)), 2)
  }
}

export default CoreFunction

// function precisionRound (number, precision) {
//   var factor = Math.pow(10, precision)
//   return Math.round(number * factor) / factor
// }

// export function getItemList (menu, person) {
//   let list = []

//   person.menu.forEach(item => {
//     list.push({
//       name: item.name,
//       price: item.price,
//       taxable: item.taxable
//     })
//   })

//   menu.forEach(item => {
//     item.people.forEach(name => {
//       if (person.name === name) {
//         list.push({
//           name: item.name + ' ($' + item.price + '/' + item.people.length + ')',
//           price: precisionRound((item.price / item.people.length), 2),
//           taxable: item.taxable
//         })
//       }
//     })
//   })

//   return list
// }

// export function getSubTotal (person) {
//   const itemList = getItemList(person)
//   let total = 0

//   itemList.forEach(item => {
//     total += item.price
//   })

//   return total
// }

// export function getSubTotalWithoutNonTaxable (person) {
//   const itemList = getItemList(person)
//   let total = 0

//   itemList.forEach(item => {
//     if (item.taxable) {
//       total += item.price
//     }
//   })

//   return total
// }

// export function getTipPayment (subTotal, tipRate) {
//   return precisionRound((subTotal * (tipRate / 100)), 2)
// }

// export function getSalesTaxPayment (subTotal) {
//   return precisionRound((subTotal * (this.salesTax / 100)), 2)
// }

// export function getTotalPayment (subTotal, taxPayment, tipPayment) {
//   return subTotal + taxPayment + tipPayment
// }

// export function sumSubTotal (people) {
//   let total = 0

//   people.forEach(person => {
//     total += getSubTotal(getItemList(person))
//   })

//   return total
// }

// export function sumSalesTaxPayments (people) {
//   let total = 0

//   people.forEach(person => {
//     total += getSalesTaxPayment(getSubTotalWithoutNonTaxable(getItemList(person)))
//   })

//   return total
// }

// export function sumTipPayments (people) {
//   let total = 0

//   people.forEach(person => {
//     total += getTipPayment(getSubTotal(getItemList(person)), person.tip)
//   })

//   return total
// }
