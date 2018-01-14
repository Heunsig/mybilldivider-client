<template>
  <div>
    <v-btn
      color="green" 
      dark
      block
      @click="openDialogAddingPerson"
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
                      {{ person.name }}
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
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    $ {{ $formatNumber(parseFloat(item.price).toFixed(2)) }}
                  </v-list-tile-action>
                  <v-list-tile-action class="ics-listActions">
                    <v-btn icon small @click="openDialogForItem(person, item)">
                      <v-icon small color="grey lighten-2">edit</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action class="ics-listActions">
                    <v-btn icon small @click="confirmToRemoveItem(person, item)">
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
    
    <!-- Section for dialog -->
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
            v-model="tempPerson.name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogAddingPerson">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="confirmToAddPerson">Confirm</v-btn>
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
            label="Input name"
            clearable
            hide-details
            prepend-icon="person"
            v-model="tempPerson.name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogEditingPerson">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="confirmToEditPerson">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogForItem" persistent max-width="290">
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
                  v-model="tempItem.name"
                ></v-text-field>      
              </v-flex>
              <v-flex>
                <v-text-field 
                  label="Input price" 
                  type="number" 
                  clearable
                  hide-details
                  prepend-icon="attach_money"
                  v-model="tempItem.price"
                ></v-text-field>      
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <template v-if="dialogMode == 'add'">
            <v-btn color="grey darken-2" flat block @click.native="closeDialogForItem">Cancel</v-btn>
            <v-btn color="light-green" flat block @click.native="confirmToAddItem">Confirm</v-btn>
          </template>
          <template  v-else> 
            <v-btn color="grey darken-2" flat block @click.native="closeDialogForItem">Cancel</v-btn>
            <v-btn color="light-green" flat block @click.native="confirmToEditItem">Confirm</v-btn>
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
          <v-btn color="grey darken-2" flat block @click.native="closeDialogDeletingPerson">Cancel</v-btn>
          <v-btn color="red darken-1" flat block @click.native="confirmToDeletePerson">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- /Section for dialog -->
</template>
<script>
  import clone from 'lodash.clone'

  export default {
    data () {
      return {
        dialogAddingPerson: false,
        dialogEditingPerson: false,
        dialogDeletingPerson: false,
        dialogForItem: false,
        dialogMode: 'add',
        person: {},
        tempPerson: {
          name: '',
          tip: '',
          menu: []
        },
        item: {},
        tempItem: {
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
      totalPriceWithoutSalesTax (person) {
        let total = 0

        person.menu.forEach(item => {
          total += parseFloat(item.price)
        })

        return total
      },
      openDialogAddingPerson () {
        this.dialogAddingPerson = true
      },
      closeDialogAddingPerson () {
        this.person = {}
        this.tempPerson = { name: '', tip: '', menu: [] }
        this.dialogAddingPerson = false
      },
      confirmToAddPerson () {
        this.$store.commit('addPerson', {person: this.__modifyPersonData(this.tempPerson)})

        this.person = {}
        this.tempPerson = { name: '', tip: '', menu: [] }
        this.dialogAddingPerson = false
      },
      openDialogEditingPerson (person) {
        this.person = person
        this.tempPerson = clone(person)
        this.dialogEditingPerson = true
      },
      closeDialogEditingPerson () {
        this.person = {}
        this.tempPerson = {name: '', tip: '', menu: []}
        this.dialogEditingPerson = false
      },
      confirmToEditPerson () {
        Object.assign(this.person, this.__modifyPersonData(this.tempPerson))

        this.person = {}
        this.tempPerson = {name: '', tip: '', menu: []}
        this.dialogEditingPerson = false
      },
      openDialogDeletingPerson (person) {
        this.person = person
        this.dialogDeletingPerson = true
      },
      confirmToDeletePerson () {
        this.$store.commit('deletePersonFromPeople', this.person)

        this.person = {}
        this.tempPerson = {name: '', tip: '', menu: []}
        this.dialogDeletingPerson = false
      },
      closeDialogDeletingPerson () {
        this.person = {}
        this.tempPerson = {name: '', tip: '', menu: []}
        this.dialogDeletingPerson = false
      },
      openDialogForItem (person, item) {
        if (typeof item !== 'undefined') {
          this.dialogMode = 'edit'
          this.tempItem = clone(item)
        } else {
          this.dialogMode = 'add'
        }

        this.person = person
        this.item = item
        this.dialogForItem = true
      },
      closeDialogForItem () {
        this.dialogMode = 'add'

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: ''}
        this.dialogForItem = false
      },
      confirmToAddItem () {
        this.$store.commit('addItemToPerson', {person: this.person, item: this.__modifyItemData(this.tempItem)})

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: ''}
        this.dialogForItem = false
      },
      confirmToEditItem () {
        Object.assign(this.item, this.__modifyItemData(this.tempItem))

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: ''}
        this.dialogForItem = false
      },
      confirmToRemoveItem (person, item) {
        person.menu.forEach((obj, i) => {
          if (obj === item) {
            person.menu.splice(i, 1)
          }
        })
      },
      __modifyPersonData (pureData) {
        let modifiedData = clone(pureData)

        modifiedData.name = modifiedData.name || 'Person - ' + Math.floor(Math.random() * 100)
        modifiedData.tip = modifiedData.tip || 0
        modifiedData.menu = modifiedData.menu || []

        return modifiedData
      },
      __modifyItemData (pureData) {
        let modifiedData = clone(pureData)

        modifiedData.name = modifiedData.name || 'Item - ' + Math.floor(Math.random() * 100)
        modifiedData.price = modifiedData.price || 0.00

        return modifiedData
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