<template>
  <div class="ics-warpper">
  <v-btn icon flat class="ics-btn-refresh" v-if="refresh" @click="refreshPage">
    <v-icon color="white">refresh</v-icon>
  </v-btn>
  <v-tabs dark grow class="ics-tabs" @input="changeTab">
    <v-tabs-bar dark class="green ics-tabsBar elevation-5">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tabs-item
        v-for="(tab, i) in tabs"
        :key="i"
        :href="tab.id"
        class="ics-tabItem-nav"
      >
        <span v-html="tab.label"></span>
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items class="ics-tabItems">
      <v-tabs-content
        v-for="(tab, i) in tabs"
        :key="i"
        :id="tab.id"
        class="ics-tabContent"
      >
        <!-- <v-card flat class="grey lighten-4"> -->
        <v-card flat class="transparent">
           
          <v-card-text>
            <div :is="tab.component"></div>
          </v-card-text>
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>

  <v-dialog persistent v-model="dialogs.refreshPage">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
        Do you want to refresh this page?
      </v-card-title>
      <v-card-actions>
        <v-btn color="grey darken-2" flat block @click.native="closeDialogRefreshingPage">Cancel</v-btn>
        <template v-if="refreshMode === 'eachPerson'">
          <v-btn color="red darken-1" flat block @click.native="confirmToClearEachPersonPage">Confirm</v-btn>
        </template>
        <template v-else>
          <v-btn color="red darken-1" flat block @click.native="confirmToClearSharedMenuPage">Confirm</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogs.setSalesTax" lazy persistent scrollable max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title blue white--text">
        Set Sales Tax Rate<br/>
        Are you sure {{ salesTax + '%'}} Sales tax?
      </v-card-title>
      <v-card-text>
        <div class="pt-1 pb-2 grey--text text--darken-3">
          <div>
            Set the sales tax that you can find it on your receipt. Otherwise, click the button
          </div>
          <div class="text-xs-right">
            <v-btn small outline color="primary" @click="openSalesTaxCalculator" v-if="!isSalesTaxCalculatorActive">
              sales tax calculator
            </v-btn>
            <v-btn small outline color="red" @click="closeSalesTaxCalculator" v-else>
              close calculator
            </v-btn>
          </div>
        </div>
        <template v-if="isSalesTaxCalculatorActive">
          <v-card color="blue" flat dark>
            <v-card-title>
              <p class="subheading mb-1">Sales Tax Calculator</p>
              <span class="caption">If you can't find sales tax rate on your receipt, input the price of tax and price of sub total into the form below. It automatically calculates sales tax rate.</span>
            </v-card-title>
            <v-card-text>
              <v-text-field 
                label="Price of Sub Total" 
                type="number" 
                clearable
                hide-details
                v-model="priceOfSubTotal"
              ></v-text-field>
              <v-text-field 
                label="Price of Tax" 
                type="number" 
                clearable
                hide-details
                v-model="priceOfTax"
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-card flat>
            <v-card-text class="text-xs-center pa-1 pb-2">
              <v-icon>arrow_downward</v-icon>
            </v-card-text>
          </v-card>
        </template>
        <v-text-field
          label="Sales Tax Rate" 
          type="number" 
          clearable
          hide-details
          suffix="%"
          v-model="tempSalesTax"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-2" flat @click.native="closeDialogSettingSalesTax">Cancel</v-btn>
        <v-btn color="blue" flat @click.native="confirmToSetSalesTax">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </div>
</template>

<script>
import DefaultSetting from './DefaultSetting'
import PriceEachPerson from './PriceEachPerson'
import PriceSharedMenu from './PriceSharedMenu'
import Result from './Result'
import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

export default {
  mixins: [fixingModalBugInIphone],
  data () {
    return {
      dialogs: {
        refreshPage: false,
        setSalesTax: false
      },
      priceOfTax: 0,
      priceOfSubTotal: 0,
      isSalesTaxCalculatorActive: false,
      tempSalesTax: '',
      refresh: false,
      refreshMode: 'eachPerson',
      currentTab: {},
      tabs: [
        {
          id: 'setting',
          label: 'Settings',
          component: 'DefaultSetting'
        },
        {
          id: 'eachPerson',
          label: 'Each<br/>person',
          component: 'PriceEachPerson',
          refresh: true
        },
        {
          id: 'sharedItem',
          label: 'Shared<br/>Items',
          component: 'PriceSharedMenu',
          refresh: true
        },
        {
          id: 'result',
          label: 'Result',
          component: 'Result'
        }
      ]
    }
  },
  computed: {
    menu () {
      return this.$store.getters.getMenu
    },
    people () {
      return this.$store.getters.getPeople
    },
    salesTax () {
      return this.$store.getters.getSalesTaxRate
    },
    calculatedSalesTax () {
      // return parseFloat(((this.priceOfTax / this.priceOfSubTotal) * 100).toFixed(2))
      // console.log(this.$format.precisionRound((this.priceOfTax / this.priceOfSubTotal) * 100))
      return this.$format.precisionRound((this.priceOfTax / this.priceOfSubTotal) * 100, 2)
    }
  },
  watch: {
    calculatedSalesTax (value) {
      // console.log(value)
      if (typeof value === 'number' && value !== Infinity && !isNaN(value)) {
        this.tempSalesTax = value
      } else {
        this.tempSalesTax = 0
      }
    }
  },
  components: {
    DefaultSetting,
    PriceEachPerson,
    PriceSharedMenu,
    Result
  },
  methods: {
    openSalesTaxCalculator () {
      this.isSalesTaxCalculatorActive = true
    },
    closeSalesTaxCalculator () {
      this.isSalesTaxCalculatorActive = false
    },
    closeDialogRefreshingPage () {
      this.activeDialog = {type: 'refreshPage', bool: false}
    },
    closeDialogSettingSalesTax () {
      this.activeDialog = {type: 'setSalesTax', bool: false}
      this.priceOfTax = 0
      this.priceOfSubTotal = 0
      this.isSalesTaxCalculatorActive = false
    },
    refreshPage () {
      this.activeDialog = {type: 'refreshPage', bool: true}
      if (this.currentTab.id === 'eachPerson') {
        this.refreshMode = 'eachPerson'
      } else if (this.currentTab.id === 'sharedItem') {
        this.refreshMode = 'sharedItem'
      }
    },
    confirmToClearEachPersonPage () {
      this.$store.commit('clearPeople')

      this.activeDialog = {type: 'refreshPage', bool: false}
    },
    confirmToClearSharedMenuPage () {
      this.$store.commit('clearMenu')

      this.activeDialog = {type: 'refreshPage', bool: false}
    },
    confirmToSetSalesTax () {
      this.$store.commit('setSalesTaxRate', this.tempSalesTax)
      this.tempSalesTax = ''
      this.priceOfTax = 0
      this.priceOfSubTotal = 0
      this.isSalesTaxCalculatorActive = false
      this.activeDialog = {type: 'setSalesTax', bool: false}
    },
    changeTab (tab) {
      this.tabs.forEach(obj => {
        if (obj.id === tab) {
          if (obj.refresh) {
            this.currentTab = obj
            this.refresh = true
          } else {
            this.currentTab = {}
            this.refresh = false
          }
        }
      })

      if (tab === 'result') {
        if (this.salesTax === 0) {
          this.activeDialog = {type: 'setSalesTax', bool: true}
          this.tempSalesTax = this.salesTax
        }
      }
    }
  }
}
</script>
<style scoped>
.ics-warpper{
  height: 100%;
}
.ics-toolbar{
  position: fixed;
  z-index: 5;
}
.ics-tabItem-nav{
  font-size: 13px;
  font-weight: 500;
}
.ics-tabsBar{
  position: fixed;
  top: 48px;
  left: 0;
  z-index: 3;
  /*box-shadow: 0px 5px 16px -5px #313131;*/
}
.ics-tabItems{
  height: 100%;
}
.ics-tabContent{
  padding-top: 48px;
  height: 100%;
  /*background: url('http://icansplit.catchasoft.com/new/logo_background.png') fixed center bottom 150px no-repeat;*/
}
.ics-tabs{height: 100%;}
.ics-btn-refresh{
  position: fixed;
  top: 0;
  right: 8px;
  z-index: 4;
}

.ics-msg-setSalesTax{
  font-size: 14px;
}

</style>
