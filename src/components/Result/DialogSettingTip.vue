<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title orange white--text">
        Tip Rate 
        <v-menu
          offset-y
        >
          <v-btn slot="activator" class="ma-0 ml-1" dark small icon><v-icon>info</v-icon></v-btn>
          <v-card>
            <v-card-text>
              Subtotal x Tip rate = Tip
            </v-card-text>
          </v-card>
        </v-menu>
      </v-card-title>
      <v-card-text>
        <v-text-field 
          ref="tipRateForm"
          label="Input Tip Rate"
          type="number"
          clearable
          hide-details
          prepend-icon="local_atm"
          suffix="%"
          v-model="tipRate"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
        <v-btn color="orange" flat block @click.native="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        tipRate: '',
        person: {}
      }
    },
    methods: {
      openDialog (person) {
        this.person = person
        if (person.tip) {
          this.tipRate = person.tip
        }

        this.dialog = true
      },
      closeDialog () {
        this.person = {}
        this.tipRate = ''
        this.dialog = false
      },
      confirm () {
        this.person.tip = this.__modifyTipRate(this.tipRate)

        this.closeDialog()
      },
      __modifyTipRate (pureData) {
        let modifedData = pureData

        modifedData = parseFloat(modifedData) || 0

        return modifedData
      }
    }
  }
</script>