<template>
  <div>
    <v-btn
      color="green" 
      dark
      block
      @click="dialogAddingPerson = true"
    >Add person</v-btn>
    <template v-if="people.length">
    <v-container fluid class="ics-grid">
      <v-layout row wrap>
        <template v-for="(person, i) in people">
          <v-flex xs12>
            <v-card class="ics-cardDecoration">
              <v-list>
                <v-list-tile avatar class="ics-dashedBorder">
                  <v-list-tile-avatar>
                    <v-icon>person</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ person.name || 'Unnamed - ' + i }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>Total: $ {{ $formatNumber(totalPriceWithoutSalesTax(person).toFixed(2)) }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="ics-listActions">
                      <v-btn icon @click="openDialogEditingPerson(person)">
                        <v-icon color="grey">edit</v-icon>
                      </v-btn>
                   </v-list-tile-action>
                   <v-list-tile-action class="ics-listActions">
                    <v-btn icon @click="openDialogDeletingPerson(person)">
                      <v-icon color="grey">delete</v-icon>
                    </v-btn>
                   </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-list>
                <v-subheader class="ics-subheader green--text">Added items ({{person.menu.length || 0}})</v-subheader>
                <v-list-tile avatar v-for="(item, i) in person.menu" :key="i">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name || 'Unnamed' }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    $ {{ $formatNumber(parseFloat(item.price || 0).toFixed(2)) }}
                  </v-list-tile-action>
                  <v-list-tile-action class="ics-listActions">
                    <v-btn icon small @click="openDialogForItem(person, item)">
                      <v-icon small color="grey lighten-2">edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action class="ics-listActions">
                    <v-btn icon small @click="removeItemInMenu(person, item)">
                      <v-icon small color="grey lighten-2">remove</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-btn icon small absolute bottom right dark fab color="green darken-1" @click="openDialogForItem(person)" class="ics-floatingBtn">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
      </v-layout>
    </v-container>
    <v-btn
      color="green" 
      dark
      block
      class="mt-5"
      @click="dialogAddingPerson = true"
    >Add person</v-btn>
    </template>
    <template v-else>
      <v-card flat>
        <v-card-text>
          <p class="text-xs-center body-2">Please add person</p>
        </v-card-text>
      </v-card>
    </template>

    <v-dialog v-model="dialogAddingPerson" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          Add Person
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Input name (Optional)"
            clearable
            hide-details
            prepend-icon="person"
            v-model="person.name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogAddingPerson">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="addPersonToPeople">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditingPerson" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          Edit Person
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Input name (Optional)"
            clearable
            hide-details
            prepend-icon="person"
            v-model="selectedPerson.name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="light-green" flat block @click.native="dialogEditingPerson = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          <template v-if="dialogMode == 'add'">Add Item</template>
          <template v-else>Edit Item</template>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex>
                <v-text-field 
                  label="Input name (Optional)" 
                  clearable
                  hide-details
                  prepend-icon="check"
                  v-model="item.name"
                ></v-text-field>      
              </v-flex>
              <v-flex>
                <v-text-field 
                  label="Input price" 
                  type="number" 
                  clearable
                  hide-details
                  prepend-icon="attach_money"
                  v-model="item.price"
                ></v-text-field>      
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <template v-if="dialogMode == 'add'">
            <v-btn color="grey darken-2" flat block @click.native="closeDialogForItem">Cancel</v-btn>
            <v-btn color="light-green" flat block @click.native="addItemToMenu">Confirm</v-btn>
          </template>
          <template  v-else> 
            <v-btn color="light-green" flat block @click.native="editItemInMenu">Confirm</v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDeletingPerson">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title red darken-1 white--text">
        Do you want to delete the person?
        </v-card-title>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="dialogDeletingPerson = false">Cancel</v-btn>
          <v-btn color="red darken-1" flat block @click.native="deletePersonFromPeople">Confirm</v-btn>
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
        this.item.price = this.item.price || 0

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
          total += parseFloat(item.price)
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

  .ics-floatingBtn{
    z-index: 1!important;
  }
</style>