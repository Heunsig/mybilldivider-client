<template>
  <div>
    <v-btn 
      icon 
      flat 
      style="position: fixed;top: 0;right: 8px;z-index: 4;" 
      @click="$router.back()"
    >
      <v-icon color="white">keyboard_arrow_left</v-icon>
    </v-btn>
    <template v-if="people.length">
      <v-card flat class="transparent">
        <v-card-text>
          <v-container fluid class="ics-grid">
            <v-layout row wrap class="mb-5">
              <v-flex xs12>

                <AlertMsg />

              </v-flex>
              <template v-for="(person, i) in people">
                <v-flex xs12 class="mb-3">

                  <PersonCard
                    :key="person.name"
                    :person="person"
                    :salesTax="salesTax"
                    :menu="menu"
                    :openDialogSettingTip="openDialogSettingTip"
                  />

                </v-flex>
              </template>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>

      <ResultSummarySpeedDial 
        :salesTax="salesTax"
        :people="people"
        :menu="menu"
      />

    </template>
    <template v-else>
      <div class="ics-msgNoItem-main text-xs-center mt-5 grey--text" style="font-size:16px;">
        No result are listed yet<br/>
        Add people first at <a @click="$router.push({name: $route.params.mode, params: {page: 'eachPerson'}})">EACH PERSON</a> tab
      </div>
    </template>
  
    <DialogSettingTip 
      ref="dialogSettingTip"
    />

    <DialogLoading 
      ref="dialogLoading"
    />
  </div>
</template>
<script>
  import AlertMsg from './AlertMsg'
  import PersonCard from './PersonCard'
  import ResultSummarySpeedDial from './ResultSummarySpeedDial'
  import DialogSettingTip from './DialogSettingTip'
  import DialogLoading from './DialogLoading'

  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

  export default {
    components: {
      AlertMsg,
      PersonCard,
      ResultSummarySpeedDial,
      DialogSettingTip,
      DialogLoading
    },
    mixins: [
      fixingModalBugInIphone
    ],
    created () {
      // if (this.people.length) {
      //   this.$store.commit('base/setPermissionToSeeResult', false)
      //   this.makeResult()
      // }
      // if (this.people.length && !this.isAllowedToSee()) {
      //   this.makeResult()
      // } else {
      //   if (this.$route.params.mode !== 'tutorial') {
      //     this.recordLog()
      //   }
      // }
    },
    computed: {
      people () {
        return this.$store.getters[this.$route.params.mode + '/' + 'getPeople']
      },
      menu () {
        return this.$store.getters[this.$route.params.mode + '/' + 'getMenu']
      },
      salesTax () {
        return this.$store.getters[this.$route.params.mode + '/' + 'getSalesTax']
      }
      // permissionToSeeResult () {
      //   return this.$store.getters['base/getPermissionToSeeResult']
      // }
    },
    methods: {
      openDialogLoading () {
        this.$refs.dialogLoading.openDialog()
      },
      closeDialogLoading () {
        this.$refs.dialogLoading.closeDialog()
      },
      openDialogSettingTip (person) {
        this.$refs.dialogSettingTip.openDialog(person)
      }
      // isAllowedToSee () {
      //   // if (this.$route.params.mode === 'tutorial' || this.permissionToSeeResult) {
      //   // if (this.permissionToSeeResult) {
      //   //   return true
      //   // } else {
      //   //   return false
      //   // }
      //   return true
      // },
      // makeResult () {
      //   // this.activeDialog = { type: 'loading', bool: true }
      //   this.openDialogLoading()

      //   if (this.$route.params.mode === 'tutorial') {
      //     setTimeout(() => {
      //       this.closeDialogLoading()
      //       // this.$store.commit('base/setPermissionToSeeResult', { bool: true })
      //     }, 1000)
      //   } else {
      //     this.$http.post(this.$PATH_API + 'log').then(res => {
      //       setTimeout(() => {
      //         this.closeDialogLoading()
      //         // this.$store.commit('base/setPermissionToSeeResult', { bool: true })
      //       }, 1000)
      //     }, err => {
      //       console.log(err)
      //     })
      //   }
      // },
      // recordLog () {
      //   this.$http.post(this.$PATH_API + 'log').then(res => {
      //     // console.log(res)
      //   }, err => {
      //     console.log(err)
      //   })
      // },
      // getItemList (person) {
      //   let list = []

      //   person.menu.forEach(item => {
      //     list.push({
      //       name: item.name,
      //       price: item.price,
      //       taxable: item.taxable
      //     })
      //   })

      //   this.menu.forEach(item => {
      //     item.people.forEach(name => {
      //       if (person.name === name) {
      //         list.push({
      //           name: item.name + ' ($' + item.price + '/' + item.people.length + ')',
      //           price: this.$format.precisionRound((item.price / item.people.length), 2),
      //           taxable: item.taxable
      //         })
      //       }
      //     })
      //   })

      //   return list
      // },
      // subTotal (itemList) {
      //   let total = 0

      //   itemList.forEach(item => {
      //     total += item.price
      //   })

      //   return total
      // },
      // subTotalWithoutNonTaxable (itemList) {
      //   let total = 0

      //   itemList.forEach(item => {
      //     if (item.taxable) {
      //       total += item.price
      //     }
      //   })

      //   return total
      // },
      // tipPayment (subTotal, tipRate) {
      //   return this.$format.precisionRound((subTotal * (tipRate / 100)), 2)
      // },
      // salesTaxPayment (subTotal) {
      //   return this.$format.precisionRound((subTotal * (this.salesTax / 100)), 2)
      // },
      // totalPayment (subTotal, taxPayment, tipPayment) {
      //   return subTotal + taxPayment + tipPayment
      // },
      // sumSubTotal () {
      //   let total = 0

      //   this.people.forEach(person => {
      //     total += this.subTotal(this.getItemList(person))
      //   })

      //   return total
      // },
      // sumSalesTaxPayments () {
      //   let total = 0

      //   this.people.forEach(person => {
      //     total += this.salesTaxPayment(this.subTotalWithoutNonTaxable(this.getItemList(person)))
      //   })

      //   return total
      // },
      // sumTipPayments () {
      //   let total = 0

      //   this.people.forEach(person => {
      //     total += this.tipPayment(this.subTotal(this.getItemList(person)), person.tip)
      //   })

      //   return total
      // }
    }
  }
</script>
<style scoped>
  .container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 8px;}
</style>
