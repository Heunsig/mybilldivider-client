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

                    <SalesTaxSectionTitle />

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
                    />

                  </v-flex>
                  <v-flex xs12>

                    <SalesTaxToolsInfo />

                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>

              <SalesTaxButtonBox />

            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import SalesTaxSectionTitle from './SalesTaxSectionTitle'
  import SalesTaxToolsInfo from './salesTaxToolsInfo/Index'
  import SalesTaxButtonBox from './salesTaxButtonBox/Index'

  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

  export default {
    components: {
      SalesTaxSectionTitle,
      SalesTaxToolsInfo,
      SalesTaxButtonBox
    },
    mixins: [
      fixingModalBugInIphone
    ],
    data () {
      return {
        // currentLocationAddress: '',
        // progressCircle: false,
        // isGetSalesTaxMenuActive: false,
        // activeSearchSalesTax: false,
        // priceOfTax: '',
        // priceOfSubTotal: '',
        // images: {
        //   imageExampleSalesTax,
        //   imageExampleSubtotalAndTax
        // },
        // error: {
        //   message: '',
        //   link: {
        //     label: '',
        //     router: {}
        //   }
        // },
        // valid: true,
        // search: {
        //   state: {
        //     value: '',
        //     rule: [
        //       (v) => !!v || 'State is required'
        //     ]
        //   },
        //   zipcode: {
        //     value: '',
        //     rule: [
        //       (v) => !!v || 'Zipcode is required'
        //     ]
        //   }
        // },
        // loadingForSearch: false
      }
    },
    computed: {
      salesTax () {
        return this.$store.getters[this.$route.name + '/' + 'getSalesTax']
      }
      // salesTax: {
      //   get () {
      //     return this.$store.getters[this.$route.name + '/' + 'getSalesTax']
      //   },
      //   set (value) {
      //     this.$store.commit(this.$route.name + '/' + 'setSalesTax', value)
      //   }
      // }
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
  /*.ics-ul-explanation {
    list-style: none;
    display: inline-block;
  }
  .ics-ul-explanation > li {
    display: flex;
    margin: 6px 0;
  }

  .ics-ul-explanation > li > .ics-ul-explanation-content {
    text-align: left;
    padding-left: 9px;
  }*/
</style>
