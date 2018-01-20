<template>
  <div>
    <template v-if="people.length">
    <v-container fluid class="ics-grid">
      <v-layout row wrap class="mb-5">
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
                      <v-btn small flat color="warning" class="ics-tipButton" @click="openDialogSettingTip(person)">
                        <v-icon left class="ics-tipIcon">local_atm</v-icon>Tip ({{ person.tip }} %)
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <!-- <div class="stressedFont">Total $ {{ $format.money((subTotalPrice(person) + tipPrice(subTotalPrice(person), person.tip) + salesTaxPrice(subTotalPrice(person))).toFixed(2)) }}</div> -->
                      <div class="stressedFont">
                      <!-- Total $ {{ $format.money((subTotalPrice(person) + tipPrice(subTotalPrice(person), person.tip) + salesTaxPrice(subTotalPrice(person)))) }} -->
                      Total: $ {{ $format.money(total(subTotalPrice(person), tipPrice(subTotalPrice(person), person.tip), salesTaxPrice(subTotalPrice(person)))) }}
                      </div>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-expansion-panel>
                  <v-expansion-panel-content class="ics-expansion-panel-content">
                    <div slot="header" class="green--text">Detail</div>
                    <v-card flat>
                      <v-card-text class="grey lighten-3">
                        <v-list>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>Sub Total</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              $ {{ $format.money(subTotalPrice(person)) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <li class="ics-subTotalDetail" v-for="item in getItemList(person)">
                            <div class="ics-subTotalDetail-label">
                              <v-icon>subdirectory_arrow_right</v-icon> {{ item.name }}
                            </div>
                            <div class="ics-subTotalDetail-price">
                              <!-- $ {{ $format.money(item.price.toFixed(2)) }} -->
                              $ {{ $format.money(item.price) }}
                            </div>
                          </li>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title>Sales Tax</v-list-tile-title>
                              <v-list-tile-sub-title>({{ salesTax }} %)</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <!-- + $ {{ $format.money(salesTaxPrice(subTotalPrice(person)).toFixed(2)) }} -->
                              + $ {{ $format.money(salesTaxPrice(subTotalPrice(person))) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title class="stressedFont">Sub Total + Tax</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              $ {{ $format.money(subTotalPrice(person) + salesTaxPrice(subTotalPrice(person))) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title>Tip</v-list-tile-title>
                              <v-list-tile-sub-title>({{ person.tip }} %)</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <!-- + $ {{ $format.money(tipPrice(subTotalPrice(person), person.tip).toFixed(2)) }} -->
                              + $ {{ $format.money(tipPrice(subTotalPrice(person), person.tip)) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                                <v-list-tile-title class="stressedFont">Total</v-list-tile-title>
                                <v-list-tile-sub-title>(Sub Total + Tax + Tip)</v-list-tile-sub-title>
                                <!-- <div class="stressedFont">
                                  Total<br/>
                                  <span class="caption">(Sub Total + Tax + Tip)</span>
                                </div> -->
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <div class="stressedFont">
                                <!-- $ {{ $format.money((subTotalPrice(person) + tipPrice(subTotalPrice(person), person.tip) + salesTaxPrice(subTotalPrice(person))).toFixed(2)) }} -->
                                <!-- {{ subTotalPrice(person) }}<br/>
                                {{ tipPrice(subTotalPrice(person), person.tip) }} <br/>
                                {{ salesTaxPrice(subTotalPrice(person)) }} <br/>
                                {{ subTotalPrice(person) + salesTaxPrice(subTotalPrice(person)) }} -->
                                <!-- $ {{ $format.money(subTotalPrice(person) + tipPrice(subTotalPrice(person), person.tip) + salesTaxPrice(subTotalPrice(person))) }} -->
                                $ {{ $format.money(total(subTotalPrice(person), tipPrice(subTotalPrice(person), person.tip), salesTaxPrice(subTotalPrice(person)))) }}
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
        color="orange"
        dark
        fab
        v-model="fab"
        class="elevation-4"
      >
        <v-icon>attach_money</v-icon>
        <v-icon>close</v-icon>
      </v-btn>      
      <v-tooltip v-model="fab" right content-class="ics-combinedTotal-tooltip">
        <span>This is combined price of all people</span>
      </v-tooltip>
      
      <div class="text-xs-left ics-box-combinedTotal blue pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title">Sub Total + Tax + Tip :</div> 
        <div class="ics-box-combinedTotal-content pl-2">$ {{ $format.money(allSubTotalPrice() + allSalesTaxPrice() + allTipPrice()) }}</div>
      </div>
      <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title caption">Tip : </div>
        <div class="ics-box-combinedTotal-content pl-2 caption">$ {{ $format.money(allTipPrice()) }}</div>
      </div>
      <div class="ics-box-combinedTotal blue pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title">Sub Total + Tax : </div>
        <div class="ics-box-combinedTotal-content pl-2">$ {{ $format.money(allSubTotalPrice() + allSalesTaxPrice()) }}</div>
      </div>
      <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title caption">Tax : </div>
        <div class="ics-box-combinedTotal-content pl-2 caption">$ {{ $format.money(allSalesTaxPrice()) }}</div>
      </div>
      <div class="ics-box-combinedTotal light-green pa-2 ma-1 white--text">
        <div class="ics-box-combinedTotal-title caption">Sub Total : </div>
        <div class="ics-box-combinedTotal-content pl-2 caption">$ {{ $format.money(allSubTotalPrice()) }}</div>
      </div>
      <!-- <v-btn
        dark
        <small></small>
        color="indigo"
      >
        Hello World hahahahahahahsadfasdfaf
      </v-btn> -->
    </v-speed-dial>
    </template>
    <template v-else>
      <div class="ics-msgNoItem-main text-xs-center mt-5">
        No result<br/>
        Add people first at "Each Person" Tab
      </div>
    </template>
    <v-dialog v-model="dialogs.settingTip" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title orange white--text">
          Tip Rate
        </v-card-title>
        <v-card-text>
          <v-text-field 
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

  export default {
    mixins: [fixingModalBugInIphone],
    data () {
      return {
        tooltip: true,
        fab: false,
        person: {},
        tempTipRate: '',
        selectedPerson: {},
        dialogs: {
          settingTip: false
        }
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
    },
    methods: {
      openDialogSettingTip (person) {
        this.person = person
        this.tempTipRate = person.tip
        this.activeDialog = {type: 'settingTip', bool: true}
      },
      confirmTipRate () {
        this.person.tip = this.__modifyTipRate(this.tempTipRate)

        this.person = {}
        this.tempTipRate = ''
        this.activeDialog = {type: 'settingTip', bool: false}
      },
      closeDialog () {
        this.person = {}
        this.tempTipRate = ''
        this.activeDialog = {type: 'settingTip', bool: false}
      },
      subTotalPrice (person) {
        let total = 0

        person.menu.forEach(item => {
          total += item.price
        })

        this.menu.forEach(item => {
          item.people.forEach(name => {
            if (person.name === name) {
              // total += parseFloat((item.price / item.people.length).toFixed(3))
              total += this.$format.precisionRound((item.price / item.people.length), 2)
            }
          })
        })

        return total
      },
      tipPrice (price, tipRate) {
        // return parseFloat((price * (tipRate / 100)).toFixed(2))
        return this.$format.precisionRound((price * (tipRate / 100)), 2)
      },
      salesTaxPrice (price) {
        // return parseFloat((price * (this.salesTax / 100)).toFixed(2))
        return this.$format.precisionRound((price * (this.salesTax / 100)), 2)
      },
      total (subTotal, tax, tip) {
        return subTotal + tax + tip
      },
      allSalesTaxPrice () {
        let total = 0

        this.people.forEach(person => {
          total += this.salesTaxPrice(this.subTotalPrice(person))
        })

        return total
      },
      allSubTotalPrice () {
        let total = 0

        this.people.forEach(person => {
          total += this.subTotalPrice(person)
        })

        return total
      },
      allTipPrice () {
        let total = 0

        this.people.forEach(person => {
          total += this.tipPrice(this.subTotalPrice(person), person.tip)
        })

        return total
      },
      getItemList (person) {
        let list = []

        person.menu.forEach(item => {
          list.push({name: item.name, price: item.price})
        })

        this.menu.forEach(item => {
          item.people.forEach(name => {
            if (person.name === name) {
              // list.push({name: item.name + ' ($' + item.price + '/' + item.people.length + ')', price: parseFloat((item.price / item.people.length).toFixed(2))})
              list.push({name: item.name + ' ($' + item.price + '/' + item.people.length + ')', price: this.$format.precisionRound((item.price / item.people.length), 2)})
            }
          })
        })

        return list
      },
      __modifyTipRate (pureData) {
        let modifedData = pureData

        modifedData = parseFloat(modifedData) || 0

        return modifedData
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