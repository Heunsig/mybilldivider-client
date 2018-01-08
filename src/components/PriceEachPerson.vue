<template>
  <v-ons-page>
    <div v-if='people.length'>
      <v-ons-list>
        <div v-for="(person, index) in people" :key="index">
          <v-ons-list-header>A person who eats togehter</v-ons-list-header>
          <v-ons-list-item>
            <div class="left">
              <v-ons-icon icon="ion-ios-person" class="list-item__icon"></v-ons-icon>
            </div>
            <div class="center">
              <span class="list-item__title">{{ person.name }}</span>
              <span class="list-item__subtitle">Total: $ {{ totalPriceWithoutSalesTax(person).toFixed(2) }}</span>
            </div>
            <div class="right">
              <v-ons-button modifier="quiet" @click.native="addItemToMenu(person)">Add price</v-ons-button>  
            </div>
          </v-ons-list-item>
          <div v-for="(item, index) in person.menu" :key="index" style="border:bottom:1px solid red;">
            <v-ons-list-item modifier="nodivider">
              <div class="left">
                <v-ons-icon icon="ion-social-usd"></v-ons-icon>
              </div>
              <div class="center">
                <v-ons-row>
                  <v-ons-col style="margin-right:8px;">
                    <v-ons-input placeholder="Item name" v-model="item.name"></v-ons-input>
                  </v-ons-col>
                  <v-ons-col width="40%">
                    <v-ons-input placeholder="Item price" type="number" v-model="item.price"></v-ons-input>
                  </v-ons-col>
                </v-ons-row>
              </div>
            </v-ons-list-item>
          </div>
        </div>
      </v-ons-list>
    </div>
    <div v-else>
      <p style="text-align:center;">
        Please add people first
      </p>
    </div>
  </v-ons-page>
</template>
<script>
  export default {
    computed: {
      people () {
        return this.$store.getters.getPeople
      }
    },
    methods: {
      addItemToMenu (person) {
        let item = {
          name: '',
          price: ''
        }

        person.menu.push(item)
      },
      totalPriceWithoutSalesTax (person) {
        let total = 0

        person.menu.forEach(item => {
          total += parseFloat(item.price) || 0
        })

        return total
      }
    }
  }
</script>