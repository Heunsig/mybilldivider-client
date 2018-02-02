<template>
  <div class="ics-warpper">
  <v-btn icon flat class="ics-btn-refresh" v-if="refresh" @click="refreshPage">
    <v-icon color="white">refresh</v-icon>
  </v-btn>
  <v-tabs dark grow class="ics-tabs" @input="changeTab" v-model="tabInMixin">
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

  <v-dialog v-model="dialogs.tempDialog">
    <v-card>
      <v-card-title class="light-green white--text ics-dialog-title">
        Are you sure {{ salesTax + '%' }} Sales tax?
      </v-card-title>
      <v-card-text>
        You've set the sales tax.<br/>
        Do you want to go back to the tab to set it?
      </v-card-text>
      <v-card-actions>
        <v-btn block flat color="grey darken-2" @click="activeDialog = {type: 'tempDialog', bool: false}">
          No
        </v-btn>
        <v-btn block flat color="light-green" @click="goBackToTabToSetSalesTax">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- <v-dialog v-model="dialogs.setSalesTax" lazy persistent scrollable max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
        <v-container fluid class="pa-0">
          <v-layout wrap row class="ics-align-center">
            <v-flex xs10>
              Set Sales Tax Rate<br/>
              Are you sure {{ salesTax + '%'}} Sales tax?              
            </v-flex>
            <v-flex xs2>
              <v-menu
                offset-x
                left
                max-width="230"
                :close-on-content-click="false"
                v-model="isGetSalesTaxMenuActive"
              >
                <v-btn slot="activator" class="elevation-3 ics-button-smaller" color="red lighten-1" small dark fab>C</v-btn>
                <v-card>
                  <v-card-title>
                    <p class="subheading mb-1">Calculate sales tax</p>
                    <div class="caption">
                      This will calculate your sales tax if you can't find it. Input the sub total and tax on your bill into the form.
                      <v-menu>
                          <a href="#" slot="activator">See an example</a>
                          <v-card>
                            <div class="pa-1">
                              <img :src="images.imageExampleSubtotalAndTax" alt="An example of subtotal and tax"/>
                              <div class="caption grey--text text--darken-1">This picture is an example</div>
                            </div>
                          </v-card>
                        </v-menu>
                    </div>
                  </v-card-title>
                  <v-card-text class="pt-0">
                    <v-text-field 
                      label="Sub Total" 
                      type="number" 
                      clearable
                      hide-details
                      v-model="priceOfSubTotal"
                    ></v-text-field>
                    <v-text-field 
                      label="Tax" 
                      type="number" 
                      clearable
                      hide-details
                      v-model="priceOfTax"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn block flat color="grey darken-2" @click="closeMenuGettingSalesTaxAuto">Cancel</v-btn>
                    <v-btn block flat color="light-green" @click="confirmToGetSalesTaxAuto">Confirm</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>
      <v-card-text>
        <div class="pt-1 pb-2 grey--text text--darken-3">
            You can find the sales tax rate on your receipt. 
            <v-menu>
              <a href="#" slot="activator">See an example</a>
              <v-card>
                <div class="pa-1">
                  <img :src="images.imageExampleSalesTax" alt="An example of sales tax rate"/>
                  <div class="caption grey--text text--darken-1">This picture is an example</div>
                </div>
              </v-card>
            </v-menu>
            <br/>If it isn't listed, <span class="red--text text--lighten-1">push the red button</span> above.
        </div>
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
        <v-btn color="grey darken-2" block flat @click.native="closeDialogSettingSalesTax">Cancel</v-btn>
        <v-btn color="light-green" block flat @click.native="confirmToSetSalesTax">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->

  </div>
</template>

<script>
import DefaultSetting from './DefaultSetting'
import PriceEachPerson from './PriceEachPerson'
import PriceSharedMenu from './PriceSharedMenu'
import Result from './Result'
import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
import routingForTab from '@/mixins/routingForTab'

import imageExampleSalesTax from '@/assets/example_salesTax.gif'
import imageExampleSubtotalAndTax from '@/assets/example_subtotalAndTax.gif'

export default {
  mixins: [
    fixingModalBugInIphone,
    routingForTab
  ],
  data () {
    return {
      images: {
        imageExampleSalesTax,
        imageExampleSubtotalAndTax
      },
      // isGetSalesTaxMenuActive: false,
      dialogs: {
        refreshPage: false,
        setSalesTax: false,
        tempDialog: false
      },
      // priceOfTax: '',
      // priceOfSubTotal: '',
      // isSalesTaxCalculatorActive: false,
      // tempSalesTax: '',
      refresh: false,
      refreshMode: 'eachPerson',
      currentTab: {},
      tabs: [
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
          id: 'setting',
          label: 'Settings',
          component: 'DefaultSetting'
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
    salesTax () {
      return this.$store.getters.getSalesTaxRate
    }
  },
  components: {
    DefaultSetting,
    PriceEachPerson,
    PriceSharedMenu,
    Result
  },
  methods: {
    // confirmToGetSalesTaxAuto () {
    //   let value = this.$format.precisionRound((((this.priceOfTax || 0) / (this.priceOfSubTotal || 0)) * 100), 2)
    //   if (typeof value === 'number' && value !== Infinity && !isNaN(value)) {
    //     this.tempSalesTax = value
    //   } else {
    //     this.tempSalesTax = 0
    //   }

    //   this.isGetSalesTaxMenuActive = false
    // },
    // closeMenuGettingSalesTaxAuto () {
    //   this.priceOfTax = ''
    //   this.priceOfSubTotal = ''
    //   this.isGetSalesTaxMenuActive = false
    // },
    closeDialogRefreshingPage () {
      this.activeDialog = {type: 'refreshPage', bool: false}
    },
    // closeDialogSettingSalesTax () {
    //   this.activeDialog = {type: 'setSalesTax', bool: false}
    //   this.priceOfTax = ''
    //   this.priceOfSubTotal = ''
    //   this.isSalesTaxCalculatorActive = false
    // },
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
    // confirmToSetSalesTax () {
    //   this.$store.commit('setSalesTaxRate', this.tempSalesTax)
    //   this.tempSalesTax = ''
    //   this.priceOfTax = ''
    //   this.priceOfSubTotal = ''
    //   this.isSalesTaxCalculatorActive = false
    //   this.activeDialog = {type: 'setSalesTax', bool: false}
    // },
    goBackToTabToSetSalesTax () {
      this.tabInMixin = 'setting'
      this.activeDialog = {type: 'tempDialog', bool: false}
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
          this.activeDialog = {type: 'tempDialog', bool: true}
        }
      }
      // if (tab === 'result') {
      //   if (this.salesTax === 0) {
      //     this.activeDialog = {type: 'setSalesTax', bool: true}

      //     if (this.salesTax) {
      //       this.tempSalesTax = this.salesTax
      //     }
      //   }
      // }
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
}
.ics-tabItems{
  height: 100%;
}
.ics-tabContent{
  padding-top: 48px;
  height: 100%;
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
