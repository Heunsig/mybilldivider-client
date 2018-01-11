<template>
  <div>
    <v-btn block color="primary" dark @click="dialogAddingPerson = true">Add person</v-btn>
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <template v-for="(person, i) in people">
          <v-flex xs12>
            <v-card>
              <v-list>
                <v-list-tile avatar class="ics-dashedBorder">
                  <v-list-tile-avatar>
                    <v-icon>person</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ person.name }} 
                    </v-list-tile-title>
                    <v-list-tile-sub-title>Total: $ {{ totalPriceWithoutSalesTax(person).toFixed(2) }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="ics-listActions">
                      <v-btn icon @click="openDialogEditingPerson(person)">
                        <v-icon>edit</v-icon>
                      </v-btn>
                   </v-list-tile-action>
                   <v-list-tile-action class="ics-listActions">
                    <v-btn icon @click="openDialogDeletingPerson(person)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                   </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-list>
                <v-subheader class="ics-subheader">Added items ({{person.menu.length || 0}})</v-subheader>
                <v-list-tile avatar v-for="(item, i) in person.menu" :key="i">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}  </v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    $ {{ parseFloat(item.price).toFixed(2) }}
                  </v-list-tile-action>
                  <v-list-tile-action class="ics-listActions">
                    <v-btn icon ripple @click="openDialogForItem(person, item)">
                      <v-icon color="grey lighten-1">edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action class="ics-listActions">
                    <v-btn icon ripple @click="removeItemInMenu(person, item)">
                      <v-icon color="grey lighten-1">remove</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn icon small absolute bottom right dark fab color="primary" @click="openDialogForItem(person)">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialogAddingPerson" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Add person</v-card-title>
        <v-card-text>
          <v-text-field label="Input name" v-model="person.name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="closeDialogAddingPerson">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="addPersonToPeople">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditingPerson" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Edit person</v-card-title>
        <v-card-text>
          <v-text-field label="Input name" v-model="selectedPerson.name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green darken-1" block flat @click.native="dialogEditingPerson = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          <template v-if="dialogMode == 'add'">Add item</template>
          <template v-else>Edit item</template>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex>
                <v-text-field label="Item name" v-model="item.name"></v-text-field>      
              </v-flex>
              <v-flex>
                <v-text-field label="Item price" type="number" v-model="item.price"></v-text-field>      
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <template v-if="dialogMode == 'add'">
            <v-btn color="green darken-1" flat @click.native="closeDialogForItem">Disagree</v-btn>
            <v-btn color="green darken-1" flat @click.native="addItemToMenu">Agree</v-btn>
          </template>
          <template  v-else> 
            <v-btn color="green darken-1" flat @click.native="editItemInMenu">Agree</v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDeletingPerson">
      <v-card>
        <v-card-title>Do you keep to delete the person?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="dialogDeletingPerson = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click.native="deletePersonFromPeople">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        dialogAddingPerson: false,
        dialogEditingPerson: false,
        dialogDeletingPerson: false,
        dialog: false,
        dialogMode: 'add',
        person: {
          name: '',
          tip: '',
          menu: []
        },
        selectedPerson: {},
        item: {
          name: '',
          price: ''
        }
      }
    },
    computed: {
      people () {
        return this.$store.getters.getPeople
      }
    },
    methods: {
      openDialogForItem (person, item) {
        if (typeof item !== 'undefined') {
          this.dialogMode = 'edit'
          this.item = item
        } else {
          this.dialogMode = 'add'
        }

        this.selectedPerson = person
        this.dialog = true
      },
      closeDialogForItem () {
        this.dialogMode = 'add'
        this.selectedPerson = {}
        this.item = {name: '', price: ''}
        this.dialog = false
      },
      addItemToMenu () {
        this.selectedPerson.menu.push(this.item)
        this.item = {name: '', price: ''}
        this.dialog = false
      },
      editItemInMenu () {
        this.item = {name: '', price: ''}
        this.dialog = false
      },
      removeItemInMenu (person, item) {
        person.menu.forEach((obj, i) => {
          if (obj === item) {
            person.menu.splice(i, 1)
          }
        })
      },
      totalPriceWithoutSalesTax (person) {
        let total = 0

        person.menu.forEach(item => {
          total += parseFloat(item.price) || 0
        })

        return total
      },
      addPersonToPeople () {
        this.$store.commit('addPerson', this.person)

        this.person = { name: '', tip: '', menu: [] }
        this.dialogAddingPerson = false

        console.log(this.people)
      },
      closeDialogAddingPerson () {
        this.person = { name: '', tip: '', menu: [] }
        this.dialogAddingPerson = false
      },
      openDialogEditingPerson (person) {
        this.selectedPerson = person
        this.dialogEditingPerson = true
      },
      openDialogDeletingPerson (person) {
        this.selectedPerson = person
        this.dialogDeletingPerson = true
      },
      deletePersonFromPeople () {
        this.$store.commit('deletePersonFromPeople', this.selectedPerson)
        this.selectedPerson = {}
        this.dialogDeletingPerson = false
      }
    }
  }
</script>
<style scoped>
  .container.ics-grid{padding: 3px;}
  .container.ics-grid > .layout:only-child{margin: -8px;}
  .container.ics-grid > .layout > .flex{padding: 20px 8px 8px 8px;}

  .ics-buttonEditingName{width: auto; height: auto;}
  .ics-buttonEditingName .icon{font-size: 17px;}

  .ics-dashedBorder{border-bottom:1px dashed #d6d6d6;}
  .ics-subheader{height: 22px;}
  .ics-listActions{min-width: 35px;}
</style>