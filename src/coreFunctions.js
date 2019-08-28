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
