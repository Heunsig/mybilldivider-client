<template>
  <v-dialog v-model="dialog" scrollable persistent max-width="290">
    <v-card>
      <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
        Select People<br/>who shared the item
      </v-card-title>
      <v-card-text>
        <v-container fluid class="pl-0 pr-0 pt-0 pb-0">
          <v-layout row wrap>
            <v-flex xs12>
              <v-list>
                <template v-if="people.length">
                <v-list-tile v-for="(person, i) in people" :key="i">
                  <v-list-tile-content>
                    <v-checkbox 
                      :key="i" 
                      :label="person.name"
                      :value="person.name"
                      v-model="peopleInList"
                      color="light-green"
                    ></v-checkbox>
                  </v-list-tile-content>
                </v-list-tile>
                </template>
                <template v-else>
                  <li class="ics-msgNoItems text-xs-center grey--text text--darken-2">
                    No people are listed yet<br/>
                    Add people first at EACH PERSON tab
                  </li>
                </template>
              </v-list>
            </v-flex>
          </v-layout>
        </v-container>
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
        item: {},
        peopleInList: []
      }
    },
    computed: {
      people () {
        return this.$store.getters['calculator/getPeople']
      }
    },
    methods: {
      openDialog (item) {
        this.item = item
        this.dialog = true
      },
      closeDialog () {
        this.item = {}
        this.peopleInList = []
        this.dialog = false
      },
      confirm () {
        this.item.people = this.peopleInList
        this.closeDialog()
      }
    }
  }
</script>