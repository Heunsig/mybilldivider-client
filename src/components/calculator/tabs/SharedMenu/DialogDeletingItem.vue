<template>
  <v-dialog persistent v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
        Do you want to delete the item?
      </v-card-title>
      <v-card-actions>
        <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
        <v-btn color="red darken-1" flat block @click.native="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        item: {}
      }
    },
    methods: {
      openDialog (item) {
        this.item = item
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
        this.item = {}
      },
      confirm () {
        this.$store.commit('calculator/deleteItemFromMenu', this.item)

        this.closeDialog()
      }
    }
  }
</script>