<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
        Edit Person
      </v-card-title>
      <v-card-text>
        <v-text-field 
          ref="personNameFormForEditing"
          label="Input name (Optional)"
          clearable
          hide-details
          prepend-icon="person"
          v-model="name"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey darken-2" flat block @click.native="closeDialog">Cancel</v-btn>
        <v-btn color="light-green" flat block @click.native="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
        person: {},
        name: ''
      }
    },
    methods: {
      openDialog (person) {
        this.person = person
        this.name = person.name
        this.dialog = true
      },
      closeDialog () {
        this.person = {}
        this.name = ''
        this.dialog = false
      },
      confirm () {
        this.person.name = this.name
        this.closeDialog()
      },
    }
  }
</script>