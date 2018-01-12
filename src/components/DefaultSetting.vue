<template>
  <div>
    <v-list subheader>
      <v-subheader>Sales Tax (%)</v-subheader>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>{{ salesTax || 0 }} %</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple @click="dialog = true">
              <v-icon color="grey lighten-1">mode_edit</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Edit Sales Tax Rate</v-card-title>
        <v-card-text>
          <v-text-field label="Sales Tax Rate" type="number" v-model="salesTax"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="dialog = false">Agree</v-btn>
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