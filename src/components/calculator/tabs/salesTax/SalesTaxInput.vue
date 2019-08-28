<template>
  <v-text-field
    placeholder="0"
    type="number"
    full-width
    hide-details
    clearable
    suffix="%"
    v-model="salesTax"
    class="pa-0 pt-2"
  />
</template>
<script>
  export default {
    computed: {
      salesTax: {
        get () {
          return this.$store.getters[`${this.$route.name}/getSalesTax`]
        },
        set (value) {
          this.$store.commit(`${this.route.name}/setSalesTax`, value)
        }
      }
    }
  }
</script>