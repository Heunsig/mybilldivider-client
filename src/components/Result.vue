<template>
  <div>
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <template v-for="(person, i) in people">
          <v-flex xs12>
            <v-card>
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
                        <v-icon left class="ics-tipIcon">local_atm</v-icon>Tip ({{ person.tip || 0}} %)
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-action>
                      <div class="stressedFont">Total $ {{ (subTotalPrice(person) + tipPrice(subTotalPrice(person), person.tip) + salesTaxPrice(subTotalPrice(person))).toFixed(2) }}</div>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-expansion-panel expand>
                  <v-expansion-panel-content>
                    <div slot="header">Detail</div>
                    <v-card flat>
                      <v-card-text class="grey lighten-3">
                        <v-list>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon>receipt</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Sub Total</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              $ {{ subTotalPrice(person) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <li class="ics-subTotalDetail" v-for="item in getItemList(person)">
                            <div class="ics-subTotalDetail-label">
                              <v-icon>subdirectory_arrow_right</v-icon>{{item.name}}
                            </div>
                            <div class="ics-subTotalDetail-price">
                              $ {{item.price}}
                            </div>
                          </li>
                          <v-list-tile avatar>
                            <v-list-tile-avatar></v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Sales Tax</v-list-tile-title>
                              <v-list-tile-sub-title>({{ salesTax || 0 }} %)</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              + $ {{ salesTaxPrice(subTotalPrice(person)) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar></v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>Tip</v-list-tile-title>
                              <v-list-tile-sub-title>({{ person.tip || 0 }} %)</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              + $ {{ tipPrice(subTotalPrice(person), person.tip) }}
                            </v-list-tile-action>
                          </v-list-tile>
                          <v-list-tile avatar>
                            <v-list-tile-avatar></v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>
                                <div class="stressedFont">Total</div>
                              </v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <div class="stressedFont">$ {{ (subTotalPrice(person) + tipPrice(subTotalPrice(person), person.tip) + salesTaxPrice(subTotalPrice(person))).toFixed(2)  }}</div>
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

    <v-dialog v-model="dialogSettingTip" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Tip Rate</v-card-title>
        <v-card-text>
          <v-text-field label="Input tip" v-model="selectedPerson.tip"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="closeDialog">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        selectedPerson: {},
        dialogSettingTip: false
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
        this.selectedPerson = person
        this.dialogSettingTip = true
      },
      closeDialog () {
        this.selectedPerson = {}
        this.dialogSettingTip = false
      },
      subTotalPrice (person) {
        let total = 0

        person.menu.forEach(item => {
          total += parseFloat(item.price || 0)
        })

        this.menu.forEach(item => {
          item.people.forEach(name => {
            if (person.name === name) {
              total += parseFloat((item.price) / item.people.length)
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
              list.push({name: item.name + ' ( $ ' + item.price + ' / ' + item.people.length + ' )', price: parseFloat((item.price) / item.people.length)})
            }
          })
        })

        return list
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
    padding-left: 80px;
    padding-right: 16px; 
    margin:3px 0;
  }
  .ics-subTotalDetail-label{
    flex:3 1 auto;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
    font-size: 12px;
  }
  .ics-subTotalDetail-price{
    flex:1 1 auto;
    text-align: right;
    min-width: 56px;
    font-size: 12px;
  }
  

</style>