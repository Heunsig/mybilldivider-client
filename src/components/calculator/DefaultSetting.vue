<template>
  <div>
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="ics-cardDecoration">
            <v-card-text>
              <v-container fluid class="pa-0">
                <v-layout wrap>
                  <v-flex xs12>
                    <div class="green--text">
                      Sales Tax(%)
                    </div>
                  </v-flex>
                  <v-flex xs12 class="ics-dashedBorder">
                    <v-text-field
                      placeholder="0"
                      type="number"
                      full-width
                      hide-details
                      clearable
                      suffix="%"
                      v-model="salesTax"
                      class="pa-0 pt-2"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <div class="ics-box-address pa-2 text-xs-center">
                      <div v-if="!error.message">
                        <template v-if="progressCircle">
                           <v-progress-circular indeterminate color="green"></v-progress-circular>
                        </template>
                        <template v-else>
                          {{ currentLocationAddress }}
                        </template>
                      </div>
                      <div v-else>
                        <span class="red--text">{{ error.message }}</span>
                        <a v-if="error.router" @click="$router.push(error.router)">Lean more</a>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn icon color="green" dark small fab absolute bottom right class="ma-0 mt-2" @click="getSalesTaxCurrentLocation">
                <v-icon>location_on</v-icon>
              </v-btn>
              <v-menu
                offset-x
                left
                max-width="230"
                :close-on-content-click="false"
                v-model="isGetSalesTaxMenuActive"
                style="position:absolute;bottom:-20px;right:60px;"
              >
                <v-btn slot="activator" color="light-green" small icon dark fab class="ma-0 mt-2">
                  <v-icon>
                    fa-calculator
                  </v-icon>
                </v-btn>
                <v-card>
                  <v-card-title>
                    <p class="subheading mb-1">Calculate sales tax</p>
                    <div class="caption">
                      This will calculate your sales tax if you can't find it. Input the sub total and tax on your bill into the form.
                      <v-menu>
                        <a slot="activator">See an example</a>
                        <v-card>
                          <div class="pa-1">
                            <img :src="images.imageExampleSubtotalAndTax" alt="An example of subtotal and tax"/>
                            <div class="caption grey--text text--darken-1">This picture is an example</div>
                          </div>
                        </v-card>
                      </v-menu>
                    </div>
                  </v-card-title>
                  <v-card-text class="pt-0">
                    <v-text-field 
                      label="Sub Total" 
                      type="number" 
                      clearable
                      hide-details
                      v-model="priceOfSubTotal"
                    ></v-text-field>
                    <v-text-field 
                      label="Tax" 
                      type="number"
                      clearable
                      hide-details
                      v-model="priceOfTax"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn block flat color="grey darken-2" @click="closeMenuGettingSalesTaxAuto">Cancel</v-btn>
                    <v-btn block flat color="light-green" @click="confirmToGetSalesTaxAuto">Confirm</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'
  import imageExampleSalesTax from '@/assets/example_salesTax.gif'
  import imageExampleSubtotalAndTax from '@/assets/example_subtotalAndTax.gif'

  export default {
    mixins: [
      fixingModalBugInIphone
    ],
    data () {
      return {
        currentLocationAddress: '',
        progressCircle: false,
        isGetSalesTaxMenuActive: false,
        priceOfTax: '',
        priceOfSubTotal: '',
        images: {
          imageExampleSalesTax,
          imageExampleSubtotalAndTax
        },
        error: {
          message: '',
          router: ''
        }
      }
    },
    computed: {
      salesTax: {
        get () {
          return this.$store.getters[this.$route.name + '/' + 'getSalesTax']
        },
        set (value) {
          this.$store.commit(this.$route.name + '/' + 'setSalesTax', value)
        }
      }
    },
    watch: {
      error (value, oldValue) {
        console.log('old', oldValue)
        console.log('new', value)
      }
    },
    methods: {
      getSalesTaxCurrentLocation () {
        this.progressCircle = true
        let googleKey = 'AIzaSyCl7fbULQdlwssMehDR9G0hrmyu11fOdXo'
        let lat = 0
        let lng = 0
        let state = ''
        let zipcode = 0
        let address = ''

        if (!navigator.geolocation) {

        } else {
          navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude
            lng = position.coords.longitude

            this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleKey}&language=en`).then(res => {
              address = res.body.results[0].formatted_address
              state = res.body.results[0].address_components[5].short_name
              zipcode = res.body.results[0].address_components[7].short_name

              this.$http.get(`https://api.mybilldivider.com/api/getSalesTax/${state}/${zipcode}`).then(res => {
                this.currentLocationAddress = address
                this.salesTax = res.body.estimatedCombinedRate * 100
                this.progressCircle = false
              }, () => {
                this.$resetData(this, 'error')
                this.error.message = 'Error: Cannot take lcation data'
              })
            }, () => {
              this.$resetData(this, 'error')
              this.error.message = 'Error: Cannot take lcation data'
            })
          }, err => {
            this.$resetData(this, 'error')
            this.error = {
              message: 'Error: ' + err.message,
              router: {
                name: 'faq.show',
                params: {
                  slug: 'how_to_turn_a_location_service_on'
                }
              }
            }
          })
        }
      },
      confirmToGetSalesTaxAuto () {
        let value = this.$format.precisionRound((((this.priceOfTax || 0) / (this.priceOfSubTotal || 0)) * 100), 2)
        if (typeof value === 'number' && value !== Infinity && !isNaN(value)) {
          this.salesTax = value
        } else {
          this.salesTax = 0
        }

        this.priceOfTax = ''
        this.priceOfSubTotal = ''
        this.isGetSalesTaxMenuActive = false
      },
      closeMenuGettingSalesTaxAuto () {
        this.priceOfTax = ''
        this.priceOfSubTotal = ''
        this.isGetSalesTaxMenuActive = false
      }
    }
  }
</script>
<style scoped>
  .container.ics-grid{
    padding: 3px;
  }
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}

  .ics-customSubheader{
    color: rgba(0,0,0,.54);
    font-size: 14px;
    font-weight: 500;
    padding: 0 16px;
  }
  .ics-box-address {

  }
</style>
