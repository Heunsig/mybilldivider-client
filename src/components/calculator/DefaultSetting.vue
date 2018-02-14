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
                      Sales Tax(%) <a @click="$router.push({name: 'faq.show', params: {slug: 'how_to_know_the_sales_tax'}})">Learn more.</a>
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
                      <div v-if="error.message">
                        <span class="red--text">Error: {{ error.message }}</span>
                        <a v-if="error.link.label" @click="$router.push(error.link.router)">{{ error.link.label }}</a>
                      </div>
                      <div v-else>
                        <template v-if="progressCircle">
                           <v-progress-circular indeterminate color="green"></v-progress-circular>
                        </template>
                        <template v-else-if="currentLocationAddress">
                          {{ currentLocationAddress }}
                        </template>
                        <template v-else>
                          Set the sales tax with tools below. <a @click="$router.push({name: 'faq.show', params: {slug: 'how_to_know_the_sales_tax'}})">Learn more.</a>
                          <div class="mt-3">
                            <ul class="text-xs-left ics-ul-explanation">
                              <li>
                                <div>
                                  <v-btn fab small icon dark color="light-green" class="ics-button-in-content"><v-icon>fa-calculator</v-icon></v-btn>
                                </div>
                                <div>
                                  It tells you the sales tax by calculating a subtotal and sales tax payment.
                                </div>                                  
                              </li>
                              <li>
                                <div>
                                  <v-btn fab small icon dark color="light-green" class="ics-button-in-content"><v-icon>search</v-icon></v-btn>
                                </div>
                                <div>
                                  It tells you the sales tax by searching a state and zip code.
                                </div>
                              </li>
                              <li>
                                <div>
                                  <v-btn fab small icon dark color="green" class="ics-button-in-content"><v-icon>location_on</v-icon></v-btn>
                                </div>
                                <div>
                                  It tells you the sales tax by a location service <span class="green--text">(the easiest way)</span>. 
                                </div>
                              </li>
                            </ul>
                          </div>
                        </template>
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn icon color="green" dark small fab absolute bottom right class="ma-0 mt-2 ics-button-nav" @click="getSalesTaxCurrentLocation">
                <v-icon>location_on</v-icon>
              </v-btn>
              <v-menu
                offset-x
                left
                max-width="230"
                :close-on-content-click="false"
                v-model="activeSearchSalesTax"
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
                            <div class="caption grey--text text--darken-1">This picture is an example</div>
                          </div>
                        </v-card>
                      </v-menu>
                      .
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
              <v-menu
                offset-x
                left
                max-width="230"
                :close-on-content-click="false"
                v-model="isGetSalesTaxMenuActive"
                style="position:absolute;bottom:-20px;right:110px;"
              >
                <v-btn slot="activator" color="light-green" small icon dark fab class="ma-0 mt-2">
                  <v-icon>
                    fa-calculator
                  </v-icon>
                </v-btn>
                <v-card>
                  <v-card-title>
                    <p class="subheading mb-1">Calculate the sales tax</p>
                    <div class="caption">
                      This will calculate your sales tax if you can't find it. Input the sub total and tax on your bill into the form
                      <v-menu>
                        <a slot="activator">See an example</a>
                        <v-card>
                          <div class="pa-1">
                            <img :src="images.imageExampleSubtotalAndTax" alt="An example of subtotal and tax"/>
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
                      v-model="priceOfSubTotal"
                    ></v-text-field>
                    <v-text-field 
                      label="Tax" 
                      type="number"
                      required
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
        activeSearchSalesTax: false,
        priceOfTax: '',
        priceOfSubTotal: '',
        images: {
          imageExampleSalesTax,
          imageExampleSubtotalAndTax
        },
        error: {
          message: '',
          link: {
            label: '',
            router: {}
          }
        },
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
    methods: {
      getSalesTaxCurrentLocation () {
        this.$resetData(this, 'error')
        this.salesTax = 0
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

              this.$http.get(`${this.$PATH_API}getSalesTax/${state}/${zipcode}`).then(res => {
                this.currentLocationAddress = address
                this.salesTax = res.body.estimatedCombinedRate * 100
                this.progressCircle = false
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
            }, () => {
              this.$resetData(this, 'error')
              this.error = {
                message: 'Can not get the location data as a map api problem.',
                link: {
                  label: 'Leave feedback',
                  router: {
                    name: 'feedback'
                  }
                }
              }
            })
          }, err => {
            let errorMessage = ''
            this.$resetData(this, 'error')

            switch (err.code) {
              case 1:
                errorMessage = 'Permission accessing a location service is denied. Please allow a location service.'
                break
              case 2:
                errorMessage = 'The location where you are is unavailable. Please try it again.'
                break
              case 3:
                errorMessage = 'Can not get the location as an unknown reason. Please try it again.'
                break
            }

            this.error = {
              message: errorMessage,
              link: {
                label: 'Learn more.',
                router: {
                  name: 'faq.show',
                  params: {
                    slug: 'how_to_turn_a_location_service_on'
                  }
                }
              }
            }
            // this.error = {
            //   message: errorMessage,
            //   router: {
            //     name: 'faq.show',
            //     params: {
            //       slug: 'how_to_turn_a_location_service_on'
            //     }
            //   }
            // }
          })
        }
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
      },
      closeMenuSearchingSalesTax () {
        this.search.state.value = ''
        this.search.zipcode.value = ''
        this.activeSearchSalesTax = false
        this.$refs.test.reset()
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
  .ics-ul-explanation {
    list-style: none;
    display: inline-block;
  }
</style>
<style>
  .ics-button-nav {
    z-index: 2!important;
  }
</style>
