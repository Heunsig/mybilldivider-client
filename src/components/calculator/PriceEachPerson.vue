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
          <v-flex xs12 class="mb-3">
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
                    <!-- <v-list-tile-sub-title>Total: $ {{ $format.money(totalPriceWithoutSalesTax(person).toFixed(2)) }}</v-list-tile-sub-title> -->
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
                <template v-if="person.menu.length">
                  <v-list-tile v-for="(item, i) in person.menu" :key="i">
                    <v-list-tile-action class="ics-listActions">
                      <v-btn icon small @click="confirmToRemoveItem(person, item)">
                        <v-icon small color="red lighten-3">close</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.name }} <span class="caption">{{ item.taxable ? '':'No tax' }}</span></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <!-- $ {{ $format.money(item.price) }} -->
                      {{ $accounting.formatMoney(item.price) }}
                    </v-list-tile-action>
                    <v-list-tile-action class="ics-listActions">
                      <v-btn icon small @click="openDialogForItem(person, item)">
                        <v-icon small color="grey lighten-2">edit</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
                <template v-else>
                  <li class="ics-msgNoItems text-xs-center pt-3 grey--text text--darken-2 pa-3">
                    No items are listed yet<br/>
                    <span class="orange--text">Push the orange button</span> to add items
                    <!-- Add items you bought. -->
                  </li>
                </template>
              </v-list>
              <v-card flat>
                <v-card-text class="text-xs-right pt-1">
                  <!-- <span class="ics-totalPrice">Total: $ {{ $format.money(totalPriceWithoutSalesTax(person).toFixed(2)) }}</span> -->
                  <span class="ics-totalPrice">Total: {{ $accounting.formatMoney(totalPriceWithoutSalesTax(person)) }}</span>
                </v-card-text>
              </v-card>
              <v-card-actions>
                <v-btn icon small absolute bottom right dark fab color="orange" @click="openDialogForItem(person)" class="ics-floatingBtn">
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
      @click="openDialogAddingPerson"
    >Add person</v-btn>
    </template>
    <template v-else>
      <div class="ics-msgNoItem-main text-xs-center mt-5">
        No people are listed yet<br/>
        Add people by <span class="green--text">pushing the "ADD PERSON" button</span> above
      </div>
    </template>
    
    <!-- Section for dialog -->
    <v-dialog v-model="dialogs.addingPerson" lazy persistent max-width="290" content-class="test-a">
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
            v-model="tempPerson.name"
          ></v-text-field>
          <div class="ics-textField-detail">
            If you don't input a name, it'll go by the number of the person.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogAddingPerson">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="confirmToAddPerson">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogs.editingPerson" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          Edit Person
        </v-card-title>
        <v-card-text>
          <v-text-field 
            ref="personNameFormForEditing"
            label="Input name"
            clearable
            hide-details
            prepend-icon="person"
            v-model="tempPerson.name"
          ></v-text-field>
          <div class="ics-textField-detail">
            If you don't input a name, it'll go by the number of the person.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-2" flat block @click.native="closeDialogEditingPerson">Cancel</v-btn>
          <v-btn color="light-green" flat block @click.native="confirmToEditPerson">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogs.item" persistent max-width="290">
      <v-card>
        <v-card-title class="pb-3 pt-3 ics-dialog-title light-green white--text">
          <template v-if="dialogMode == 'add'">Add an item you bought</template>
          <template v-else>Edit the Item you bought</template>
        </v-card-title>
        <v-card-text>
          <v-text-field 
            label="Input name (Optional)" 
            clearable
            hide-details
            prepend-icon="check"
            v-model="tempItem.name"
          ></v-text-field>
          <div class="ics-textField-detail">
            If you don't input a name, it'll go by the number of the person.
          </div>
          <v-text-field 
            ref="itemPriceForm"
            label="Input price" 
            type="number" 
            clearable
            hide-details
            prepend-icon="attach_money"
            v-model="tempItem.price"
          ></v-text-field>
          <v-container class="pa-0 pt-2">
            <v-layout row warp>
              <v-flex offset-xs5 xs1 class="mr-2">
                <v-menu
                  offset-y
                >
                  <v-btn slot="activator" class="ma-0" small icon><v-icon color="grey">info</v-icon></v-btn>
                  <v-card>
                    <v-card-text>
                      A tip is calculated at a price that doesn't include a tax
                    </v-card-text>
                  </v-card>
                </v-menu>
              </v-flex>
              <v-flex xs6>
                <v-checkbox
                  :label="tempItem.taxable ? 'Taxable':'Non-taxable'"
                  v-model="tempItem.taxable"
                  color="orange"
                  hide-details>
                </v-checkbox>
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

    <v-dialog persistent v-model="dialogs.deletingPerson">
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
  import fixingModalBugInIphone from '@/mixins/fixingModalBugInIphone'

  export default {
    mixins: [fixingModalBugInIphone],
    data () {
      return {
        dialogs: {
          addingPerson: false,
          editingPerson: false,
          deletingPerson: false,
          item: false
        },
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
          price: '',
          taxable: true
        },
        orderForPerson: 0,
        orderForItem: 0
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
          total += item.price
        })

        return this.$format.precisionRound(total, 2)
      },
      openDialogAddingPerson () {
        this.activeDialog = {type: 'addingPerson', bool: true, autofocus: 'personNameFormForAdding'}
      },
      closeDialogAddingPerson () {
        this.person = {}
        this.tempPerson = { name: '', tip: '', menu: [] }
        this.activeDialog = {type: 'addingPerson', bool: false}
      },
      confirmToAddPerson () {
        this.$store.commit('addPerson', {person: this.__modifyPersonData(this.tempPerson)})

        this.person = {}
        this.tempPerson = { name: '', tip: '', menu: [] }
        this.activeDialog = {type: 'addingPerson', bool: false}
      },
      openDialogEditingPerson (person) {
        this.person = person
        this.tempPerson = clone(person)
        this.activeDialog = {type: 'editingPerson', bool: true, autofocus: 'personNameFormForEditing'}
      },
      closeDialogEditingPerson () {
        this.person = {}
        this.tempPerson = {name: '', tip: '', menu: []}
        this.activeDialog = {type: 'editingPerson', bool: false}
      },
      confirmToEditPerson () {
        Object.assign(this.person, this.__modifyPersonData(this.tempPerson))

        this.person = {}
        this.tempPerson = {name: '', tip: '', menu: []}
        this.activeDialog = {type: 'editingPerson', bool: false}
      },
      openDialogDeletingPerson (person) {
        this.person = person
        this.activeDialog = {type: 'deletingPerson', bool: true}
      },
      confirmToDeletePerson () {
        this.$store.commit('deletePersonFromPeople', {person: this.person})

        this.person = {}
        this.tempPerson = {name: '', tip: '', menu: []}
        this.activeDialog = {type: 'deletingPerson', bool: false}
      },
      closeDialogDeletingPerson () {
        this.person = {}
        this.tempPerson = {name: '', tip: '', menu: []}
        this.activeDialog = {type: 'deletingPerson', bool: false}
      },
      openDialogForItem (person, item) {
        if (typeof item !== 'undefined') {
          this.dialogMode = 'edit'
          this.tempItem = clone(item)
          if (!this.tempItem.price) {
            this.tempItem.price = ''
          }
        } else {
          this.dialogMode = 'add'
        }

        this.person = person
        this.item = item
        this.activeDialog = {type: 'item', bool: true, autofocus: 'itemPriceForm'}
      },
      closeDialogForItem () {
        this.dialogMode = 'add'

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: '', taxable: true}
        this.activeDialog = {type: 'item', bool: false}
      },
      confirmToAddItem () {
        this.$store.commit('addItemToPerson', {person: this.person, item: this.__modifyItemData(this.tempItem)})

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: '', taxable: true}
        this.activeDialog = {type: 'item', bool: false}
      },
      confirmToEditItem () {
        Object.assign(this.item, this.__modifyItemData(this.tempItem))

        this.person = {}
        this.item = {}
        this.tempItem = {name: '', price: '', taxable: null}
        this.activeDialog = {type: 'item', bool: false}
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

        modifiedData.name = modifiedData.name || 'Person ' + this.orderForPerson++
        modifiedData.tip = modifiedData.tip || 0
        modifiedData.menu = modifiedData.menu || []

        return modifiedData
      },
      __modifyItemData (pureData) {
        let modifiedData = clone(pureData)

        modifiedData.name = modifiedData.name || 'Item ' + this.orderForItem++
        // modifiedData.price = parseFloat(modifiedData.price) || 0.00
        modifiedData.price = this.$format.precisionRound(modifiedData.price, 2) || 0.00
        modifiedData.taxable = modifiedData.taxable

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
  .ics-totalPrice{
    font-size: 17px;
    font-weight: 500;
  }
  .ics-msgNoItems{
    /*padding: 5px 16px;*/
    /*color: #717171; */
    font-size: 14px;
    /*font-weight: 500;*/
    /*text-align:center;*/
  }

  .ics-textField-detail{
    padding-left:40px;
    padding-top: 5px;
    font-size: 13px;
    color: #717171;
  }
  
  .ics-msgNoItem-main{
    font-size:16px;
    color: #717171;
  }
  .test-a{
    /*position: absolute;*/
    border:1px solid red;
  }
</style>