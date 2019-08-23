<template>
  <!-- Section for dialog -->
  <v-dialog v-model="dialog" lazy persistent scrollable max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
        Add a person who ordered items
      </v-card-title>
      <v-card-text>
        <v-text-field
          ref="personNameFormForAdding"
          label="Input name (Optional)"
          clearable
          hide-details
          prepend-icon="person"
          v-model="name"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          color="grey darken-2" 
          flat 
          block 
          @click.native="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn 
          color="light-green" 
          flat 
          block 
          @click.native="confirm"
        > 
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    // props: [
    //   'modifyPersonData'
    // ],
    data () {
      return {
        dialog: false,
        name: ''
      }
    },
    methods: {
      openDialog () {
        this.dialog = true
      },
      closeDialog () {
        this.name = ''
        this.dialog = false
        // this.person = {}
        // this.tempPerson = { name: '', tip: '', menu: [] }
        // this.activeDialog = {type: 'addingPerson', bool: false}
      },
      confirm () {
        this.$store.commit('calculator/addPerson', {
          name: this.name ? this.name : `Person ${this.$store.getters['calculator/getPeople'].length + 1}`,
          tip: 0,
          menu: []
        })

        this.closeDialog()
        // this.person = {}
        // this.tempPerson = { name: '', tip: '', menu: [] }
        // this.activeDialog = {type: 'addingPerson', bool: false}
      }
      // __modifyPersonData (pureData) {
      //   let modifiedData = clone(pureData)

      //   modifiedData.name = modifiedData.name || 'Person ' + this.orderForPerson++
      //   modifiedData.tip = modifiedData.tip || 0
      //   modifiedData.menu = modifiedData.menu || []

      //   return modifiedData
      // },
    }
  }
</script>