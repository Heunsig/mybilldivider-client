<template>
  <div>
    <template v-if="people.length">
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <template v-for="(person, i) in people">
          <v-flex xs12>
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
                      <div class="stressedFont">Total $ {{ $format.money((subTotalPrice(person) + tipPrice(subTotalPrice(person), person.tip) + salesTaxPrice(subTotalPrice(person))).toFixed(2)) }}</div>
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
                              $ {{ $format.money(item.price.toFixed(2)) }}
                            </div>
                          </li>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title>Sales Tax</v-list-tile-title>
                              <v-list-tile-sub-title>({{ salesTax }} %)</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              + $ {{ $format.money(salesTaxPrice(subTotalPrice(person)).toFixed(2)) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title>Tip</v-list-tile-title>
                              <v-list-tile-sub-title>({{ person.tip }} %)</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              + $ {{ $format.money(tipPrice(subTotalPrice(person), person.tip).toFixed(2)) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile class="mt-2">
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <div class="stressedFont">Total</div>
                              </v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <div class="stressedFont">$ {{ $format.money((subTotalPrice(person) + tipPrice(subTotalPrice(person), person.tip) + salesTaxPrice(subTotalPrice(person))).toFixed(2))  }}</div>
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
              total += item.price / item.people.length
            }
          })
        })

        return total
      },
      tipPrice (price, tipRate) {
        return price * (tipRate / 100)
      },
      salesTaxPrice (price) {
        return price * (this.salesTax / 100)
      },
      getItemList (person) {
        let list = []

        person.menu.forEach(item => {
          list.push({name: item.name, price: item.price})
        })

        this.menu.forEach(item => {
          item.people.forEach(name => {
            if (person.name === name) {
              list.push({name: item.name + ' ($' + item.price + '/' + item.people.length + ')', price: item.price / item.people.length})
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
</style>