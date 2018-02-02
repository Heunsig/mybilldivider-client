import imageExampleSalesTax from '@/assets/example_salesTax.gif'
import imageExampleSubtotalAndTax from '@/assets/example_subtotalAndTax.gif'

export default {
  data () {
    return {
      isGetSalesTaxMenuActive: false,
      dialogs: {
        setSalesTax: false
      },
      priceOfTax: '',
      priceOfSubTotal: '',
      isSalesTaxCalculatorActive: false,
      tempSalesTax: '',
      images: {
        imageExampleSalesTax,
        imageExampleSubtotalAndTax
      }
    }
  },
  methods: {
    openDialog () {
      if (this.salesTax) {
        this.tempSalesTax = this.salesTax
      }
      this.activeDialog = {type: 'setSalesTax', bool: true, autofocus: 'salesTaxForm'}
    },
    closeDialog () {
      this.tempSalesTax = ''
      this.priceOfTax = ''
      this.priceOfSubTotal = ''
      this.isSalesTaxCalculatorActive = false
      this.activeDialog = {type: 'setSalesTax', bool: false}
    },
    confirmSalesTax (commitFunc) {
      this.$store.commit(commitFunc, this.tempSalesTax)
      this.tempSalesTax = ''
      this.priceOfTax = ''
      this.priceOfSubTotal = ''
      this.isSalesTaxCalculatorActive = false
      this.activeDialog = {type: 'setSalesTax', bool: false}
    },
    confirmToGetSalesTaxAuto () {
      let value = this.$format.precisionRound((((this.priceOfTax || 0) / (this.priceOfSubTotal || 0)) * 100), 2)
      if (typeof value === 'number' && value !== Infinity && !isNaN(value)) {
        this.salesTax = value
        // this.tempSalesTax = value
      } else {
        this.salesTax = 0
        // this.tempSalesTax = 0
      }

      this.isGetSalesTaxMenuActive = false
    },
    closeMenuGettingSalesTaxAuto () {
      this.priceOfTax = ''
      this.priceOfSubTotal = ''
      this.isGetSalesTaxMenuActive = false
    }
  }
}
