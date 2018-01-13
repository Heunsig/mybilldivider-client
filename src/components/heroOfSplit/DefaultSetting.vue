<template>
  <div>
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="ics-cardDecoration">
            <v-list subheader>
              <v-subheader class="green--text">Sales Tax (%)</v-subheader>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{ salesTax || 0 }} %</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click="dialog = true">
                      <v-icon color="green lighten-3">mode_edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>      
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          Edit Sales Tax Rate
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Sales Tax Rate" 
            type="number" 
            clearable
            hide-details
            suffix="%"
            v-model="salesTax"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-2" flat @click.native="dialog = false">Cancel</v-btn>
          <v-btn color="light-green" flat @click.native="dialog = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false
      }
    },
    computed: {
      salesTax: {
        get () {
          return this.$store.getters.getSalesTaxRate
        },
        set (salesTax) {
          this.$store.commit('setSalesTaxRate', salesTax)
        }
      }
    }
  }
</script>
<style scoped>
  .container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}
</style>