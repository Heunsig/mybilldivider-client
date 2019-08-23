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

                    <SalesTaxInput />

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
  import SalesTaxInput from './SalesTaxInput'
  import SalesTaxSectionTitle from './SalesTaxSectionTitle'
  import SalesTaxToolsInfo from './salesTaxToolsInfo'
  import SalesTaxButtonBox from './salesTaxButtonBox'

  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

  export default {
    components: {
      SalesTaxInput,
      SalesTaxSectionTitle,
      SalesTaxToolsInfo,
      SalesTaxButtonBox
    },
    mixins: [
      fixingModalBugInIphone
    ],
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
