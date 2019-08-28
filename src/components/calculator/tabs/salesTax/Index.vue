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
    props: [
      'isTutorial'
    ],
    components: {
      SalesTaxInput,
      SalesTaxSectionTitle,
      SalesTaxToolsInfo,
      SalesTaxButtonBox
    },
    mixins: [
      fixingModalBugInIphone
    ],
    mounted () {
      if (this.isTutorial()) {
        console.log('hi')
      }
    }
  }
</script>
<style scoped>
  .ics-grid{
    padding: 3px;
  }
  .ics-grid > .layout:only-child{margin: -8px;}
  .ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}

  /*.ics-customSubheader{
    color: rgba(0,0,0,.54);
    font-size: 14px;
    font-weight: 500;
    padding: 0 16px;
  }*/
</style>
