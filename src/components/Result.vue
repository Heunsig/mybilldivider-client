<template>
  <v-ons-page>
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
          <!-- <v-ons-list-item>
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
          </v-ons-list-item> -->
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
  </v-ons-page>
</template>
<script>
  export default {
    computed: {
      people () {
        return this.$store.getters.getPeople
      },
      menu () {
        return this.$store.getters.getMenu
      },
      salesTaxRate () {
        return this.$store.getters.getSalesTaxRate
      }
    },
    methods: {
      pureTotalPrice (person) {
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
      tip (price, tipRate) {
        return price * (tipRate / 100)
      },
      salesTaxPrice (price) {
        return price * (this.salesTaxRate / 100)
      }
    }
  }
</script>