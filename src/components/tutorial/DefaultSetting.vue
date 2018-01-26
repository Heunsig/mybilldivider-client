<template>
  <div>
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="ics-cardDecoration">
            <v-list subheader>
              <li class="ics-customSubheader">
                <div class="green--text">Sales Tax</div>
                <div>
                  <span class="orange--text">Push the orange button</span> to set the sales tax.
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
      </v-layout>
    </v-container>
    
    <v-dialog v-model="dialogs.setSalesTax" persistent scrollable max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-blue white--text">
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
                      <v-btn block flat color="light-blue" @click="confirmToGetSalesTaxAuto">Confirm</v-btn>
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
              <br/>
              If it isn't listed, <span class="red--text text--lighten-1">push the red button</span> above.
          </div>
          <v-text-field 
            ref="salesTaxForm"
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
          <v-btn color="light-blue" block flat @click.native="confirmSalesTax">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
        return this.$store.getters['tutorial/getSalesTax']
      }
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
      confirmSalesTax () {
        this.$store.commit('tutorial/setSalesTaxRate', this.tempSalesTax)
        this.tempSalesTax = ''
        this.priceOfTax = ''
        this.priceOfSubTotal = ''
        this.isSalesTaxCalculatorActive = false
        this.activeDialog = {type: 'setSalesTax', bool: false}
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
