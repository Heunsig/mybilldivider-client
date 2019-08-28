<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title class="light-green white--text ics-dialog-title">
        Are you sure {{ salesTax + '%' }} Sales tax?
      </v-card-title>
      <v-card-text>
        <div class="body-2 grey--text text--darken-2">
          You've not set the sales tax.<br/>
          Do you want to go back to SALES TAX tab to set the sales tax?
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn block flat color="grey darken-2" @click="goBackToSalesTaxTab">
          Go back
        </v-btn>
        <v-btn block flat color="light-green" @click="continueToSeeResult">
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    props: [
      'salesTax',
      'moveTabTo'
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
      goBackToSalesTaxTab () {
        this.moveTabTo('salesTax')
        this.closeDialog()
      },
      continueToSeeResult () {
        this.$router.push({
          name: 'result',
          params: {
            mode: this.$route.name
          }
        })
      }
    }
  }
</script>