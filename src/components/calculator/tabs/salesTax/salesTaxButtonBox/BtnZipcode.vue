<template>
  <v-menu
    offset-x
    left
    max-width="230"
    :close-on-content-click="false"
    v-model="menu"
    style="position:absolute;bottom:-20px;right:60px;"
  >
    <v-btn slot="activator" color="light-green" small icon dark fab class="ma-0 mt-2">
      <v-icon>search</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <p class="subheading mb-1">Search the sales tax</p>
        <div class="caption">
          Put an address on your receipt into the form below
          <v-menu>
            <a slot="activator">See an example</a>
            <v-card>
              <div class="pa-1">
                <img :src="imageExampleSalesTax" alt="An example of address on a receipt."/>
                <div class="caption grey--text text--darken-1">
                  This picture is an example
                </div>
              </div>
            </v-card>
          </v-menu>
        </div>
      </v-card-title>
      <v-card-text class="pt-0">
        <v-form v-model="valid" ref="test">
          <v-select
            label="State" 
            v-bind:items="$states"
            v-model="state"
            :rules="stateRule"
            required
            clearable
            bottom
          ></v-select>
          <v-text-field
            label="Zipcode"
            type="number"
            v-model="zipcode"
            :rules="zipcodeRule"
            required
            clearable
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          block 
          flat 
          color="grey darken-2" 
          @click="closeMenu"
        >
          Cancel
        </v-btn>
        <v-btn 
          block 
          flat 
          color="light-green" 
          :loading="loading" 
          @click="getSalexTax"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
  import imageExampleSalesTax from '@/assets/example_salesTax.gif'
  import EventBus from '@/event-bus'

  export default {
    data () {
      return {
        menu: false,
        valid: true,
        loading: false,
        state: '',
        stateRule: [
          (v) => !!v || 'State is required'
        ],
        zipcode: '',
        zipcodeRule: [
          (v) => !!v || 'Zipcode is required'
        ],
        imageExampleSalesTax
      }
    },
    methods: {
      closeMenu () {
        this.state = ''
        this.zipcode = ''
        this.menu = false
        this.$refs.test.reset()
      },
      getSalexTax () {
        if (this.$refs.test.validate()) {
          this.$store.commit('calculator/setSalesTax', 0)
          this.loading = true

          const state = this.state
          const zipcode = this.zipcode
          const apiURL = `${this.$PATH_API}getSalesTax/${state}/${zipcode}`

          this.$http.get(apiURL).then(res => {
            EventBus.$emit('CURRENT_ADDRESS', '')
            this.$store.commit('calculator/setSalesTax', res.body.estimatedCombinedRate * 100)
            this.loading = false
            this.closeMenu()
          }, () => {
            // To components/calculator/tabs/salesTax/salesTaxToolsInfo/StatusBar.vue
            EventBus.$emit('ERROR_ON_SALESTAX', {
              message: 'Can not get the location data as an api problem.',
              link: {
                label: 'Leave feedback',
                router: {
                  name: 'feedback'
                }
              }
            })
          })
        }
      }
    }
  }
</script>