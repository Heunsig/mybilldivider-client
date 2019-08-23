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
      <v-icon>
        search
      </v-icon>
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
                <img :src="$PATH_IMAGE + 'example_address.gif'" alt="An example of address on a receipt."/>
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
            v-model="search.state.value"
            :rules="search.state.rule"
            required
            clearable
            bottom
          ></v-select>
          <v-text-field
            label="Zipcode"
            type="number"
            v-model="search.zipcode.value"
            :rules="search.zipcode.rule"
            required
            clearable
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block flat color="grey darken-2" @click="closeMenuSearchingSalesTax">Cancel</v-btn>
        <v-btn block flat color="light-green" :loading="loadingForSearch" @click="getSearchedLocationSalesTax">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
  // import imageExampleSalesTax from '@/assets/example_salesTax.gif'

  export default {
    data () {
      return {
        menu: false,
        valid: true,
        search: {
          state: {
            value: '',
            rule: [
              (v) => !!v || 'State is required'
            ]
          },
          zipcode: {
            value: '',
            rule: [
              (v) => !!v || 'Zipcode is required'
            ]
          }
        },
        loadingForSearch: false
      }
    },
    methods: {
      closeMenuSearchingSalesTax () {
        this.search.state.value = ''
        this.search.zipcode.value = ''
        this.activeSearchSalesTax = false
        this.$refs.test.reset()
      },
      getSearchedLocationSalesTax () {
        if (this.$refs.test.validate()) {
          this.salesTax = 0
          this.loadingForSearch = true

          let state = this.search.state.value
          let zipcode = this.search.zipcode.value
          this.$http.get(`${this.$PATH_API}getSalesTax/${state}/${zipcode}`).then(res => {
            this.currentLocationAddress = ''
            this.salesTax = res.body.estimatedCombinedRate * 100
            this.search.state.value = ''
            this.search.zipcode.value = ''
            this.$refs.test.reset()
            this.activeSearchSalesTax = false
            this.loadingForSearch = false
          }, () => {
            this.$resetData(this, 'error')
            this.error = {
              message: 'Can not get the location data as an api problem.',
              link: {
                label: 'Leave feedback',
                router: {
                  name: 'feedback'
                }
              }
            }
          })
        }
      }
    }
  }
</script>