<template>
  <div>
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <template v-for="(person, i) in people">
          <v-flex xs12>
            <v-card>
              <!-- <v-card-text> -->
                <v-list>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon>person</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ person.name }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile avatar>
                    <v-spacer></v-spacer>
                    <v-list-tile-action>
                      <v-btn small flat color="warning" @click="openDialogSettingTip(person)">
                        <v-icon left>local_atm</v-icon>Tip ({{ person.tip || 0}} %)
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
              <!-- </v-card-text> -->
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialogSettingTip" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Tip Rate</v-card-title>
        <v-card-text>
          <v-text-field label="Input name" v-model="selectedPerson.tip"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="closeDialog">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="closeDialog">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
 <!--  <v-ons-page>
    <div v-if="people.length">
      <v-ons-list>
        <div v-for="(person, index) in people" :key="index">
          <v-ons-list-header>A person who eats togehter</v-ons-list-header>
          <v-ons-list-item>
            <div class="center">
              <span class="list-item__title">{{ person.name }}</span>
              <span class="list-item__subtitle">
                Total: $ {{ pureTotalPrice(person) }}
              </span>
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-row>
              <v-ons-col width="30%">Tip(%)</v-ons-col>
              <v-ons-col>
                <v-ons-input 
                  placeholder="Input Tip" 
                  type="number" 
                  float 
                  v-model="person.tip"
                ></v-ons-input>
              </v-ons-col>
            </v-ons-row>
            <v-ons-row>
              <v-ons-col>
                $ {{ tip(pureTotalPrice(person), person.tip).toFixed(2) }}
              </v-ons-col>
            </v-ons-row>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">Tip(%)</div>
            <div class="center">
              <v-ons-input placeholder="Input Tip" type="number" float
                v-model="person.tip"
              ></v-ons-input>
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="right">
              $ {{ tip(pureTotalPrice(person), person.tip).toFixed(2) }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">Tax</div>
            <div class="center">
              {{ salesTaxRate }} %
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="right">
              $ {{ salesTaxPrice(pureTotalPrice(person)).toFixed(2) }}
            </div>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">Total</div>
            <div class="right">
              $ {{ (pureTotalPrice(person) + tip(pureTotalPrice(person), person.tip) + salesTaxPrice(pureTotalPrice(person))).toFixed(2) }}
            </div>
          </v-ons-list-item>
        </div>
      </v-ons-list>
    </div>
    <div v-else>
      <p style="text-align:center">
        No result
      </p>
    </div>
  </v-ons-page> -->
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
</style>