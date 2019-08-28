<template>
  <v-speed-dial
    v-model="fab"
    bottom
    left
    fixed
    direction="top"
    transition="slide-y-reverse-transition"
    class="ics-speed-dial-combinedPrice"
  >
    <v-btn
      slot="activator"
      color="green"
      dark
      fab
      v-model="fab"
      class="elevation-4"
    >
      <v-icon>attach_money</v-icon>
      <v-icon>close</v-icon>
    </v-btn>      
    <v-tooltip v-model="fab" right content-class="ics-combinedTotal-tooltip">
      <span>This price is the sum of everybody's payments.</span>
    </v-tooltip>
    
    <div class="text-xs-left ics-box-combinedTotal blue pa-2 ma-1 white--text">
      <div class="ics-box-combinedTotal-title">Sub Total + Tax + Tip :</div> 
      <div class="ics-box-combinedTotal-content pl-2">
        {{ $accounting.formatMoney(subTotals + salesTaxPayments + tipPayments) }}
      </div>
    </div>
    <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
      <div class="ics-box-combinedTotal-title caption">Tip : </div>
      <div class="ics-box-combinedTotal-content pl-2 caption">
        {{ $accounting.formatMoney(tipPayments) }}
      </div>
    </div>
    <div class="ics-box-combinedTotal blue pa-2 ma-1 white--text">
      <div class="ics-box-combinedTotal-title">Sub Total + Tax : </div>
      <div class="ics-box-combinedTotal-content pl-2">
        {{ $accounting.formatMoney(subTotals + salesTaxPayments) }}
      </div>
    </div>
    <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
      <div class="ics-box-combinedTotal-title caption">Tax : </div>
      <div class="ics-box-combinedTotal-content pl-2 caption">
        {{ $accounting.formatMoney(salesTaxPayments) }}
      </div>
    </div>
    <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
      <div class="ics-box-combinedTotal-title caption">Sub Total : </div>
      <div class="ics-box-combinedTotal-content pl-2 caption">
        {{ $accounting.formatMoney(subTotals) }}
      </div>
    </div>
  </v-speed-dial>
</template>
<script>
  import CoreFunctions from '@/coreFunctions'
  export default {
    props: [
      'salesTax',
      'people',
      'menu'
    ],
    data () {
      return {
        fab: false
      }
    },
    computed: {
      subTotals () {
        let total = 0

        this.people.forEach(person => {
          const core = new CoreFunctions(person, this.menu, this.salesTax)
          total += core.getSubTotal()
        })

        return total
      },
      salesTaxPayments () {
        let total = 0

        this.people.forEach(person => {
          const core = new CoreFunctions(person, this.menu, this.salesTax)
          total += core.getSalesTaxPayment()
        })

        return total
      },
      tipPayments () {
        let total = 0

        this.people.forEach(person => {
          const core = new CoreFunctions(person, this.menu, this.salesTax)
          total += core.getTipPayment()
        })

        return total
      }

    }
  }
</script>
<style scoped>
  .ics-box-combinedTotal {
    white-space: nowrap;
    display: flex;
    border-radius: 8px;
  }

  .ics-box-combinedTotal .ics-box-combinedTotal-title {
    /*min-width: 80px;*/
    font-size: 14px;
    font-weight: 500;
    text-align:right;
  }

  .ics-box-combinedTotal .ics-box-combinedTotal-content {
  }

  .ics-combinedTotalAndTax{
    font-size: 11px!important;
  }
</style>
<style>
  .ics-speed-dial-combinedPrice .speed-dial__list{
    align-items: flex-start;
  }

  .ics-combinedTotal-tooltip{
    position: fixed!important;
    top: auto!important;
    bottom:36px!important;
    left: 94px!important;
    right: auto!important;
    font-size:11px;
  }
</style>