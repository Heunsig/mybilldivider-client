<template>
  <v-dialog persistent v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
        Do you want to refresh this page?
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
    props: [
      'activeTab'
    ],
    data () {
      return {
        dialog: false
      }
    },
    methods: {
      openDialog () {
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
      },
      confirm () {
        if (this.activeTab === 'eachPerson') {
          this.$store.commit('calculator/clearPeople')
        } else if (this.activeTab === 'sharedItem') {
          this.$store.commit('calculator/clearMenu')
        }

        this.closeDialog()
      }
    }
  }
</script>