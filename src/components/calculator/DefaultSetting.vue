<template>
  <div>
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="ics-cardDecoration">
            <v-list subheader>
              <!-- <v-subheader class="green--text">Sales Tax (%)</v-subheader> -->
              <li class="ics-customSubheader">
                <div class="green--text">Sales Tax</div>
                <div>
                  <span class="orange--text">Push the orange button</span> on right bottom to set the sales tax.
                </div>
              </li>
              <v-list-tile @click.native="openDialog">
                <v-list-tile-content>
                  <v-list-tile-title>{{ salesTax }} %</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon dark small fab color="orange" @click="openDialog">
                      <v-icon>mode_edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>      
          </v-card>
        </v-flex>
        <!-- <v-flex xs12>
          <v-card class="ics-cardDecoration">
            <v-list subheader>
              <li class="ics-customSubheader">
                <div class="green--text">Refresh All</div>
                <div>It refreshes whole page</div>
              </li>
              <v-subheader class="green--text">
              Refresh All
              </v-subheader>
              <v-list-tile>
                <v-list-tile-content>
                  <v-btn block dark color="red darken-2" @click="openDialogRefreshingAll">
                    Refresh All
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex> -->
      </v-layout>
    </v-container>
    
    <v-dialog v-model="dialogs.setSalesTax" lazy persistent scrollable max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          <v-container fluid class="pa-0">
            <v-layout row wrap class="ics-align-center">
              <v-flex xs10>
                Set Sales Tax Rate
              </v-flex>
              <v-flex xs2>
                <v-menu
                  offset-x
                  left
                  max-width="230"
                  :close-on-content-click="false"
                  v-model="isGetSalesTaxMenuActive"
                >
                  <v-btn slot="activator" class="elevation-3 ics-button-smaller" color="red lighten-1" small dark fab></v-btn>
                  <v-card>
                    <v-card-title>
                      <p class="subheading mb-1">Get sales tax automatically</p>
                      <div class="caption">This is function of calculating sales tax when you can't find sales tax. Input your bill's sub total and tax. 
                        <v-menu>
                          <a href="#" slot="activator">See an example</a>
                          <v-card>
                            <div class="pa-1">
                              <img src="http://icansplit.catchasoft.com/new/example_subtotalAndTax.gif" alt="An example of subtotal and tax"/>
                              <!-- <img :src="images.imageExampleSubtotalAndTax" alt="An example of subtotal and tax"/> -->
                              <div class="caption">This picture is an example</div>
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
            <!-- <div> -->
              You can find the sales tax rate on your receipt. 
              <v-menu>
                <a href="#" slot="activator">See an example</a>
                <v-card>
                  <div class="pa-1">
                    <!-- <img :src="images.imageExampleSalesTax" alt="An example of sales tax rate"/> -->
                    <img src="http://icansplit.catchasoft.com/new/example_salesTax.gif" alt="An example of sales tax rate"/>
                    <!-- <img :src="img" alt=""> -->
                    <div class="caption">This picture is an example</div>
                  </div>
                  <!-- <v-card-media src="http://icansplit.catchasoft.com/new/example_test.gif" height="106px"></v-card-media> -->
                </v-card>
              </v-menu>
              <br/>
              If it isn't listed, <span class="red--text text--lighten-1">push the red button</span> above.
              <!-- <div class="text-xs-right"> -->
                
              <!-- </div> -->
              <!-- Set the sales tax written on your receipt. If it isn't listed, push the button. -->
              <!-- Set the sales tax that you can find it on your receipt. Otherwise, click the button -->
              <!-- </div> -->
            <!-- <div>
              <div class="text-xs-right">
                <v-btn small outline color="primary" @click="openSalesTaxCalculator" v-if="!isSalesTaxCalculatorActive">
                  sales tax calculator
                </v-btn>
                <v-btn small outline color="red" @click="closeSalesTaxCalculator" v-else>
                  close calculator
                </v-btn>
              </div>
            </div> -->
          </div>
          <!-- <template v-if="isSalesTaxCalculatorActive">
            <v-card color="blue" flat dark>
              <v-card-title>
                <p class="subheading mb-1">Sales Tax Calculator</p>
                <span class="caption">If you can't find sales tax rate on your receipt, put the price of tax and price of sub total into the form below. It automatically calculates sales tax rate.</span>
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
          </template> -->
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
          <v-btn color="grey darken-2" block flat @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="light-green" block flat @click.native="confirmSalesTax">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-dialog persistent v-model="dialogs.refreshAll">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
        Do you want to refresh all?<br/>
        It makes the app first state.
      </v-card-title>
      <v-card-actions>
        <v-btn color="grey darken-2" flat block @click.native="closeDialogRefreshingAll">Cancel</v-btn>
        <v-btn color="red darken-1" flat block @click.native="confirmToRefreshAll">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog> -->
  <!-- <button @click="test">test</button> -->
  </div>
</template>
<script>
  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
  import imageExampleSalesTax from '@/assets/example_salesTax.gif'
  import imageExampleSubtotalAndTax from '@/assets/example_subtotalAndTax.gif'

  export default {
    mixins: [fixingModalBugInIphone],
    data () {
      return {
        isGetSalesTaxMenuActive: false,
        dialogs: {
          setSalesTax: false
          // refreshAll: false
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
    computed: {
      salesTax () {
        return this.$store.getters.getSalesTaxRate
      },
      calculatedSalesTax () {
        // return parseFloat(((this.priceOfTax / this.priceOfSubTotal) * 100).toFixed(2))
        // console.log('hi', this.$formant.precisionRound(((this.priceOfTax / this.priceOfSubTotal) * 100), 2))
        // return this.$format.precisionRound(((this.priceOfTax / this.priceOfSubTotal) * 100), 2)
        // console.log(typeof this.priceOfTax)
        // console.log(typeof this.priceOfSubTotal)
        // console.log(this.priceOfTax / this.priceOfSubTotal)
        // return this.$format.precisionRound(123124, 2)
      }
    },
    watch: {
      // calculatedSalesTax (value) {
      //   if (typeof value === 'number' && value !== Infinity && !isNaN(value)) {
      //     this.tempSalesTax = value
      //   } else {
      //     this.tempSalesTax = 0
      //   }
      // }
    },
    methods: {
      confirmToGetSalesTaxAuto () {
        let value = this.$format.precisionRound((((this.priceOfTax || 0) / (this.priceOfSubTotal || 0)) * 100), 2)
        if (typeof value === 'number' && value !== Infinity && !isNaN(value)) {
          this.tempSalesTax = value
        } else {
          this.tempSalesTax = 0
        }

        this.isGetSalesTaxMenuActive = false
      },
      closeMenuGettingSalesTaxAuto () {
        this.priceOfTax = ''
        this.priceOfSubTotal = ''
        this.isGetSalesTaxMenuActive = false
      },
      confirmSalesTax () {
        this.$store.commit('setSalesTaxRate', this.tempSalesTax)
        this.tempSalesTax = ''
        this.priceOfTax = ''
        this.priceOfSubTotal = ''
        this.isSalesTaxCalculatorActive = false
        this.activeDialog = {type: 'setSalesTax', bool: false}
      },
      openDialog () {
        if (this.salesTax) {
          this.tempSalesTax = this.salesTax
        }
        this.activeDialog = {type: 'setSalesTax', bool: true}
      },
      closeDialog () {
        this.tempSalesTax = ''
        this.priceOfTax = ''
        this.priceOfSubTotal = ''
        this.isSalesTaxCalculatorActive = false
        this.activeDialog = {type: 'setSalesTax', bool: false}
      },
      // openDialogRefreshingAll () {
      //   this.activeDialog = {type: 'refreshAll', bool: true}
      // },
      // closeDialogRefreshingAll () {
      //   this.activeDialog = {type: 'refreshAll', bool: false}
      // },
      // confirmToRefreshAll () {
      //   this.$store.commit('refreshAll')
      //   this.activeDialog = {type: 'refreshAll', bool: false}
      // },
      openSalesTaxCalculator () {
        this.isSalesTaxCalculatorActive = true
      },
      closeSalesTaxCalculator () {
        this.isSalesTaxCalculatorActive = false
      }
    }
  }
</script>
<style scoped>
  .container.ics-grid{
    padding: 3px;
  }
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}

  .ics-customSubheader{
    margin: 10px 0;
    color: rgba(0,0,0,.54);
    font-size: 14px;
    font-weight: 500;
    padding: 0 16px;
  }
</style>
