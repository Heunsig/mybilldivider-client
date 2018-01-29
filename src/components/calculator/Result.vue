<template>
  <div>
    <template v-if="people.length">
    <v-container fluid class="ics-grid">
      <v-layout row wrap class="mb-5">
        <v-flex xs12>
          <v-alert color="info" icon="info" dismissible v-model="alertInfo">
            If you push the green button on the bottom left of the screen, you can see the sum of everybody's payments.
          </v-alert>
          <v-alert color="orange darken-1" icon="priority_high" dismissible v-model="alertWarning">
            These prices has been rounded, so It could be a little different.
          </v-alert>
        </v-flex>
        <template v-for="(person, i) in people">
          <v-flex xs12 class="mb-3">
            <v-card class="ics-cardDecoration">
                <v-list>
                  <v-list-tile avatar class="ics-dashedBorder">
                    <v-list-tile-avatar>
                      <v-icon>person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ person.name }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile avatar class="ics-dashedBorder">
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                      <v-btn small flat color="warning" class="mr-2" @click="openDialogSettingTip(person)">
                        <v-icon left class="mr-0">local_atm</v-icon>Tip ({{ person.tip }} %)
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <div class="stressedFont">
                        <div>
                          Total: {{ $accounting.formatMoney(totalPayment(subTotal(getItemList(person)), tipPayment(subTotal(getItemList(person)), person.tip), salesTaxPayment(subTotalWithoutNonTaxable(getItemList(person))))) }}
                        </div>
                        <div class="caption grey--text text--darken-1">
                          (Sub total + Tax + Tip)
                        </div>
                      </div>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-expansion-panel>
                  <v-expansion-panel-content class="ics-expansion-panel-content">
                    <div slot="header" class="green--text">Details</div>
                    <v-card flat>
                      <v-card-text class="grey lighten-3">
                        <v-list>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>Sub Total</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              {{ $accounting.formatMoney(subTotal(getItemList(person))) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <li class="ics-subTotalDetail" v-for="item in getItemList(person)">
                            <div class="ics-subTotalDetail-label">
                              <v-icon style="font-size:20px;">subdirectory_arrow_right</v-icon> {{ item.name }} <span class="caption red--text">{{ item.taxable ? '' : 'No tax' }}</span>
                            </div>
                            <div class="ics-subTotalDetail-price">
                              {{ $accounting.formatMoney(item.price) }}
                            </div>
                          </li>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title>Tax</v-list-tile-title>
                              <v-list-tile-sub-title>({{ salesTax }} % on {{ $accounting.formatMoney(subTotalWithoutNonTaxable(getItemList(person))) }})</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              + {{ $accounting.formatMoney(salesTaxPayment(subTotalWithoutNonTaxable(getItemList(person)))) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title class="stressedFont">Sub Total + Tax</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              {{ $accounting.formatMoney(subTotal(getItemList(person)) + salesTaxPayment(subTotalWithoutNonTaxable(getItemList(person)))) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title>Tip</v-list-tile-title>
                              <v-list-tile-sub-title>({{ person.tip }} %)</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              + {{ $accounting.formatMoney(tipPayment(subTotal(getItemList(person)), person.tip)) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                                <v-list-tile-title class="stressedFont">Total</v-list-tile-title>
                                <v-list-tile-sub-title>(Sub Total + Tax + Tip)</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <div class="stressedFont">
                                {{ $accounting.formatMoney(totalPayment(subTotal(getItemList(person)), tipPayment(subTotal(getItemList(person)), person.tip), salesTaxPayment(subTotalWithoutNonTaxable(getItemList(person))))) }}
                              </div>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
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
          {{ $accounting.formatMoney(sumSubTotal() + sumSalesTaxPayments() + sumTipPayments()) }}
        </div>
      </div>
      <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title caption">Tip : </div>
        <div class="ics-box-combinedTotal-content pl-2 caption">
          {{ $accounting.formatMoney(sumTipPayments()) }}
        </div>
      </div>
      <div class="ics-box-combinedTotal blue pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title">Sub Total + Tax : </div>
        <div class="ics-box-combinedTotal-content pl-2">
          {{ $accounting.formatMoney(sumSubTotal() + sumSalesTaxPayments()) }}
        </div>
      </div>
      <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title caption">Tax : </div>
        <div class="ics-box-combinedTotal-content pl-2 caption">
          {{ $accounting.formatMoney(sumSalesTaxPayments()) }}
        </div>
      </div>
      <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title caption">Sub Total : </div>
        <div class="ics-box-combinedTotal-content pl-2 caption">
          {{ $accounting.formatMoney(sumSubTotal()) }}
        </div>
      </div>
    </v-speed-dial>
    </template>
    <template v-else>
      <div class="ics-msgNoItem-main text-xs-center mt-5">
        No result are listed yet<br/>
        Add people first at "EACH PERSON" tab
      </div>
    </template>
    <v-dialog v-model="dialogs.settingTip" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title orange white--text">
          Tip Rate 
          <v-menu
            offset-y
          >
            <v-btn slot="activator" class="ma-0 ml-1" dark small icon><v-icon>info</v-icon></v-btn>
            <v-card>
              <v-card-text>
                A tip is calculated at a price that doesn't include a tax
              </v-card-text>
            </v-card>
          </v-menu>
        </v-card-title>
        <v-card-text>
          <v-text-field 
            ref="tipRateForm"
            label="Input Tip Rate"
            type="number"
            clearable
            hide-details
            prepend-icon="local_atm"
            suffix="%"
            v-model="tempTipRate"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="orange" flat block @click.native="confirmTipRate">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
  import result from '@/mixins/calculator/result'

  export default {
    mixins: [
      fixingModalBugInIphone,
      result
    ],
    data () {
      return {
        alertWarning: true,
        alertInfo: true
      }
    },
    computed: {
      people () {
        return this.$store.getters.getPeople
      },
      menu () {
        return this.$store.getters.getMenu
      },
      salesTax () {
        return this.$store.getters.getSalesTaxRate
      }
    }
  }
</script>
<style scoped>
  .container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 8px;}

  .expansion-panel{box-shadow: none;}

  .stressedFont{font-size: 15; font-weight:bold;}
  
  .ics-tipButton{margin-right: 8px;}
  .ics-tipIcon{margin-right: 5px;}

  .ics-dashedBorder{border-bottom:1px dashed #d6d6d6;}

  .ics-subTotalDetail{
    display:flex;
    align-items: center;
    padding-left: 20px;
    padding-right: 16px; 
    margin:3px 0;
  }
  .ics-subTotalDetail-label{
    display: flex;
    align-items: center;
    flex:3 1 auto;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
    font-size: 13px;
  }
  .ics-subTotalDetail-price{
    flex:1 1 auto;
    text-align: right;
    min-width: 56px;
    font-size: 12px;
  }
  .ics-expansion-panel-content {
    max-width: 100%;
  }

  .ics-msgNoItem-main{
    font-size:16px;
    color: #717171;
  }

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
    align-items: left;
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