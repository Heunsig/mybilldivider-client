<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-header>Sales Tax Rate</v-ons-list-header>
      <v-ons-list-item>
        <div class="center">
          <v-ons-input type="number" placeholder="Input sales tax rate" float
              v-model="salesTaxRate"
            >
            </v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="right">
          {{ salesTaxRate }} %
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>
<script>
  export default {
    computed: {
      salesTaxRate: {
        get () {
          return this.$store.getters.getSalesTaxRate
        },
        set (salesTaxRate) {
          this.$store.commit('setSalesTaxRate', salesTaxRate)
        }
      }
    }
  }
</script>