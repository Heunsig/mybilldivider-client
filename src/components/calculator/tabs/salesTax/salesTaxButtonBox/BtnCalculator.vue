<template>
  <v-menu
    offset-x
    left
    max-width="230"
    :close-on-content-click="false"
    v-model="menu"
    style="position:absolute;bottom:-20px;right:110px;"
  >
    <v-btn 
      slot="activator" 
      color="light-green" 
      small 
      icon 
      dark 
      fab 
      class="ma-0 mt-2"
    >
      <v-icon>
        attach_money
      </v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <p class="subheading mb-1">Calculate the sales tax</p>
        <div class="caption">
          This will calculate your sales tax if you can't find it. Input the sub total and tax on your bill into the form.
          <v-menu>
            <a slot="activator">See an example</a>
            <v-card>
              <div class="pa-1">
                <img :src="image" alt="An example of subtotal and tax"/>
                <div class="caption grey--text text--darken-1">This picture is an example</div>
              </div>
            </v-card>
          </v-menu>.
        </div>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-text-field 
          label="Sub Total" 
          type="number"
          required
          clearable
          hide-details
          v-model="subTotal"
        ></v-text-field>
        <v-text-field 
          label="Tax" 
          type="number"
          required
          clearable
          hide-details
          v-model="tax"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          block 
          flat 
          color="grey darken-2" 
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn 
          block 
          flat 
          color="light-green" 
          @click="confirm"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
  import image from '@/assets/example_subtotalAndTax.gif'

  export default {
    data () {
      return {
        menu: false,
        subTotal: '',
        tax: '',
        image
      }
    },
    methods: {
      close () {
        this.tax = ''
        this.subTotal = ''
        this.menu = false
      },
      confirm () {
        let value = this.$format.precisionRound((((this.tax || 0) / (this.subTotal || 0)) * 100), 2)

        if (
          typeof value === 'number' &&
          value !== Infinity && !isNaN(value)
        ) {
          this.$store.commit('setSalesTax', value)
          // this.salesTax = value
        } else {
          this.$store.commit('setSalesTax', 0)
          // this.salesTax = 0
        }

        this.close()
      }
    }
  }
</script>