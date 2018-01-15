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
                  <v-list-tile-title>{{ salesTax }} %</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon @click="openDialog">
                      <v-icon color="green lighten-3">mode_edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>      
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="ics-cardDecoration">
            <v-list subheader>
              <v-subheader class="green--text">Refresh All</v-subheader>
              <v-list-tile>
                <v-list-tile-content>
                  <v-btn block dark color="green darken-3" @click="openDialogRefreshingAll">
                    Refresh All
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title blue white--text">
          Set Sales Tax Rate
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Sales Tax Rate" 
            type="number" 
            clearable
            hide-details
            suffix="%"
            v-model="tempSalesTax"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-2" flat @click.native="closeDialog">Cancel</v-btn>
          <v-btn color="blue" flat @click.native="confirmSalesTax">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog persistent v-model="dialogRefreshingAll">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
        Do you want to refresh all?<br/>
        It makes the app first state.
      </v-card-title>
      <v-card-actions>
        <v-btn color="grey darken-2" flat block @click.native="dialogRefreshingAll = false">Cancel</v-btn>
        <v-btn color="red darken-1" flat block @click.native="confirmToRefreshAll">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        dialogRefreshingAll: false,
        tempSalesTax: ''
      }
    },
    computed: {
      salesTax () {
        return this.$store.getters.getSalesTaxRate
      }
    },
    methods: {
      confirmSalesTax () {
        this.$store.commit('setSalesTaxRate', this.tempSalesTax)
        this.tempSalesTax = ''
        this.dialog = false
      },
      openDialog () {
        this.tempSalesTax = this.salesTax
        this.dialog = true
      },
      closeDialog () {
        this.tempSalesTax = ''
        this.dialog = false
      },
      openDialogRefreshingAll () {
        this.dialogRefreshingAll = true
      },
      confirmToRefreshAll () {
        this.$store.commit('refreshAll')

        this.dialogRefreshingAll = false
      }
    }
  }
</script>
<style scoped>
  .container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}

  .ics-customSubheader{
    margin: 10px 0;
    color: rgba(0,0,0,.54);
    font-size: 14px;
    font-weight: 500;
    padding: 0 16px;
  }

</style>