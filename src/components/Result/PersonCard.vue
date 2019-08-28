<template>
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
              Total: {{ total }}
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
                  {{ subTotal }}
                </v-list-tile-action>
              </v-list-tile>
              <li class="ics-subTotalDetail" v-for="item in itemList">
                <div class="ics-subTotalDetail-label">
                  <v-icon style="font-size:20px;">subdirectory_arrow_right</v-icon> {{ item.name }} <span class="caption red--text">{{ item.taxable ? '' : 'No tax' }}</span>
                </div>
                <div class="ics-subTotalDetail-price">
                  {{ formatMoney(item.price) }}
                </div>
              </li>
              <v-list-tile class="mt-2">
                <v-list-tile-content>
                  <v-list-tile-title>Tax</v-list-tile-title>
                  <v-list-tile-sub-title>({{ salesTax }} % on {{ subTotalWithoutNonTaxable }})</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  + {{ salesTaxPayment }}
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile class="mt-2">
                <v-list-tile-content>
                  <v-list-tile-title class="stressedFont">Sub Total + Tax</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  {{ subTotalPlusTax }}
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile class="mt-2">
                <v-list-tile-content>
                  <v-list-tile-title>Tip</v-list-tile-title>
                  <v-list-tile-sub-title>({{ person.tip }} %)</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  + {{ tipPayment }}
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile class="mt-2">
                <v-list-tile-content>
                    <v-list-tile-title class="stressedFont">Total</v-list-tile-title>
                    <v-list-tile-sub-title>(Sub Total + Tax + Tip)</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <div class="stressedFont">
                    {{ total }}
                  </div>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
  </v-expansion-panel>
</v-card>
</template>
<script>
  import CoreFunctions from '@/coreFunctions'

  export default {
    props: [
      'person',
      'menu',
      'salesTax',
      'openDialogSettingTip'
    ],
    data () {
      return {
        core: null
      }
    },
    created () {
      this.core = new CoreFunctions(this.person, this.menu, this.salesTax)
    },
    computed: {
      itemList () {
        return this.core.itemList
      },
      total () {
        return this.formatMoney(this.core.getSubTotal() + this.core.getTipPayment() + this.core.getSalesTaxPayment())
      },
      subTotal () {
        return this.formatMoney(this.core.getSubTotal())
      },
      subTotalWithoutNonTaxable () {
        return this.formatMoney(this.core.getSubTotalWithoutNonTaxable())
      },
      salesTaxPayment () {
        return this.formatMoney(this.core.getSalesTaxPayment())
      },
      subTotalPlusTax () {
        return this.formatMoney(this.core.getSubTotal() + this.core.getSalesTaxPayment(this.core.getSubTotalWithoutNonTaxable()))
      },
      tipPayment () {
        return this.formatMoney(this.core.getTipPayment())
      }
    },
    methods: {
      formatMoney (price) {
        return this.$accounting.formatMoney(price)
      }
    }
  }
</script>
<style scoped>
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
</style>