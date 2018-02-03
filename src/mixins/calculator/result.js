export default {
  data () {
    return {
      // tooltip: true,
      // fab: false,
      // person: {},
      // tempTipRate: '',
      // selectedPerson: {},
      // dialogs: {
      //   settingTip: false
      // }
    }
  },
  methods: {
  //   openDialogSettingTip (person) {
  //     this.person = person
  //     if (person.tip) {
  //       this.tempTipRate = person.tip
  //     }
  //     this.activeDialog = {type: 'settingTip', bool: true, autofocus: 'tipRateForm'}
  //   },
  //   confirmTipRate () {
  //     this.person.tip = this.__modifyTipRate(this.tempTipRate)

  //     this.person = {}
  //     this.tempTipRate = ''
  //     this.activeDialog = {type: 'settingTip', bool: false}
  //   },
  //   closeDialog () {
  //     this.person = {}
  //     this.tempTipRate = ''
  //     this.activeDialog = {type: 'settingTip', bool: false}
  //   },
  //   getItemList (person) {
  //     let list = []

  //     person.menu.forEach(item => {
  //       list.push({
  //         name: item.name,
  //         price: item.price,
  //         taxable: item.taxable
  //       })
  //     })

  //     this.menu.forEach(item => {
  //       item.people.forEach(name => {
  //         if (person.name === name) {
  //           list.push({
  //             name: item.name + ' ($' + item.price + '/' + item.people.length + ')',
  //             price: this.$format.precisionRound((item.price / item.people.length), 2),
  //             taxable: item.taxable
  //           })
  //         }
  //       })
  //     })

  //     return list
  //   },
  //   subTotal (itemList) {
  //     let total = 0

  //     itemList.forEach(item => {
  //       total += item.price
  //     })

  //     return total
  //   },
  //   subTotalWithoutNonTaxable (itemList) {
  //     let total = 0

  //     itemList.forEach(item => {
  //       if (item.taxable) {
  //         total += item.price
  //       }
  //     })

  //     return total
  //   },
  //   tipPayment (subTotal, tipRate) {
  //     return this.$format.precisionRound((subTotal * (tipRate / 100)), 2)
  //   },
  //   salesTaxPayment (subTotal) {
  //     return this.$format.precisionRound((subTotal * (this.salesTax / 100)), 2)
  //   },
  //   totalPayment (subTotal, taxPayment, tipPayment) {
  //     return subTotal + taxPayment + tipPayment
  //   },
  //   sumSubTotal () {
  //     let total = 0

  //     this.people.forEach(person => {
  //       total += this.subTotal(this.getItemList(person))
  //     })

  //     return total
  //   },
  //   sumSalesTaxPayments () {
  //     let total = 0

  //     this.people.forEach(person => {
  //       total += this.salesTaxPayment(this.subTotalWithoutNonTaxable(this.getItemList(person)))
  //     })

  //     return total
  //   },
  //   sumTipPayments () {
  //     let total = 0

  //     this.people.forEach(person => {
  //       total += this.tipPayment(this.subTotal(this.getItemList(person)), person.tip)
  //     })

  //     return total
  //   },
  //   __modifyTipRate (pureData) {
  //     let modifedData = pureData

  //     modifedData = parseFloat(modifedData) || 0

  //     return modifedData
  //   }
  // }
  }
}
